# voice.wav + music.wav (ducked under speech) + sfx.wav -> mix.wav
# Voice stays on top: music sits ~20 dB under the voice while he talks and comes up in gaps.
import json, re, subprocess, numpy as np, soundfile as sf
from scipy.ndimage import maximum_filter1d

SR = 48000
v, _ = sf.read('voice.wav'); m, _ = sf.read('music.wav'); s, _ = sf.read('sfx.wav')
n = min(len(v), len(m), len(s)); v, m, s = v[:n], m[:n], s[:n]
marks = json.load(open('music_marks.json'))

def lufs(x):
    sf.write('qa/_l.wav', x.astype(np.float32), SR, subtype='FLOAT')
    e = subprocess.run(['ffmpeg', '-hide_banner', '-i', 'qa/_l.wav', '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS', e)[-1])

MUSIC_BASE, DUCK = -24.0, -14.0      # music integrated loudness before ducking; extra dip under speech
m *= 10 ** ((MUSIC_BASE - lufs(m)) / 20)

# speech gate from the voice (10 ms hops), held across short pauses, smoothed (attack 60 ms / release 450 ms)
h = SR // 100; k = n // h
r = 20 * np.log10(np.sqrt((v[:k * h, 0].reshape(k, h) ** 2).mean(1)) + 1e-9)
act = maximum_filter1d((r > -42).astype(float), size=35)           # bridge gaps under ~350 ms
g = np.zeros(k); cur = 0.0
for i in range(k):
    a = 1 - np.exp(-1 / (6 if act[i] > cur else 45)); cur += a * (act[i] - cur); g[i] = cur
gain_db = DUCK * g
# open up for the title drop and the outro card even if he is still finishing a word
t = np.arange(k) / 100
for a, b in [(marks['DROP'] - 0.05, marks['DROP'] + 0.5)] + [(c[0] - 0.05, c[1] - 0.1) for c in marks['CARDS']] + [(marks['ENDCARD'][0] - 0.05, marks['END'])]:
    w = np.clip(np.minimum((t - a) / 0.15, (b - t) / 0.3), 0, 1); gain_db = gain_db * (1 - w) + 2.0 * w
env = np.interp(np.arange(n), np.arange(k) * h + h / 2, 10 ** (gain_db / 20))
mix = v + m * env[:, None] + s

# end: fade the last 1.2 s of the tail
fl = int(1.2 * SR); mix[-fl:] *= np.linspace(1, 0, fl)[:, None] ** 2
sf.write('mix_pre.wav', mix.astype(np.float32), SR, subtype='FLOAT')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', 'mix_pre.wav', '-af', 'aresample=192000,alimiter=limit=0.84:attack=3:release=80:level=disabled:latency=1,aresample=48000',
                '-c:a', 'pcm_s24le', 'mix.wav'], check=True)

# report levels: voice vs music during speech and in gaps
sp = np.interp(np.arange(n), np.arange(k) * h, act) > 0.5
def db(x): return 10 * np.log10((x ** 2).mean() + 1e-12)
mm = m * env[:, None]
print(f"music under speech {db(mm[sp]) - db(v[sp]):.1f} dB rel. voice; music in gaps {db(mm[~sp]):.1f} dBFS rms")
print('mix', lufs(mix), 'LUFS')
