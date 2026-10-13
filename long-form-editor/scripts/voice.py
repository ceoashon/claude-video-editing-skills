# plan.json -> voice.wav (48 kHz stereo, dual mono). Sample-exact: every piece starts at
# round(t0 * 48000). Joins use a 20 ms equal-power crossfade centred on the cut, so room
# tone never drops to silence. Then a gentle chain and two-pass loudnorm (linear).
import json, subprocess, numpy as np, soundfile as sf, re

SR = 48000; FPS = 30000 / 1001; X = int(0.010 * SR)      # half crossfade
TAIL = 0.0   # end card is a plan slot now
plan = json.load(open('plan.json'))
total = sum(p['frames'] for p in plan) / FPS
N = int(round((total + TAIL) * SR))
out = np.zeros(N, np.float64)
src = {}
for i, p in enumerate(plan):
    if p.get('mute'): continue
    if p['take'] not in src:
        a, _ = sf.read(f"a48/IMG_{p['take']}.wav", dtype='float64'); src[p['take']] = a.mean(1)
    a = src[p['take']]
    s0 = int(round(p['t0'] * SR)); n = int(round(p['frames'] / FPS * SR))
    i0 = int(round(p['in'] * SR))
    lo_s = i0 - X; seg = a[max(0, lo_s):i0 + n + X].copy()
    if lo_s < 0: seg = np.concatenate([np.zeros(-lo_s), seg])          # piece starts at 0 s in its take
    L = len(seg); r = np.linspace(0, np.pi / 2, 2 * X)
    seg[:2 * X] *= np.sin(r); seg[L - 2 * X:] *= np.cos(r)
    lo = s0 - X; out[max(0, lo):lo + L] += seg[max(0, -lo):]
sf.write('voice_raw.wav', out.astype(np.float32), SR, subtype='FLOAT')

chain = ("highpass=f=75:poles=2,equalizer=f=250:t=q:w=1.2:g=-2,equalizer=f=3600:t=q:w=1.0:g=1.8,"
         "equalizer=f=11000:t=q:w=0.8:g=1.0,deesser=i=0.35:m=0.5:f=0.5,"
         "acompressor=threshold=-32dB:ratio=2.5:attack=10:release=220:knee=4")
def lufs(af):
    m = subprocess.run(['ffmpeg', '-hide_banner', '-i', 'voice_raw.wav', '-af', af + ',ebur128=peak=true', '-f', 'null', '-'],
                       capture_output=True, text=True).stderr
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', m)[-1])
TARGET = -17.3                                         # pre-limiter loudness; limiter only shaves rare peaks
g = TARGET - lufs(chain)
lim = 'alimiter=limit=0.89:attack=5:release=80:level=disabled:latency=1'
af = f'{chain},volume={g:.2f}dB,{lim}'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'voice_raw.wav', '-af', af + ',pan=stereo|c0=c0|c1=c0', '-c:a', 'pcm_f32le', 'voice.wav'], check=True)
print(f'gain {g:.1f} dB -> voice.wav', round(N / SR, 3), 's')
