# Original score + sound design for an example first-minute edit.
# -> music.wav (stereo bed, before voice ducking) and sfx.wav (stereo hits/ui sounds)
# Key D minor, 100 BPM, grid locked so the beat drops exactly on the key word.
import json, numpy as np, soundfile as sf
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000; FPS = 30000 / 1001
rng = np.random.default_rng(7)
plan = json.load(open('plan.json')); WORDS = json.load(open('words.json'))
END = sum(p['frames'] for p in plan) / FPS; TAIL = 0.0
N = int(round(END * SR))
def span(label):
    t = 0; a = b = None
    for p in plan:
        d = p['frames'] / FPS
        if p['label'] == label:
            a = t if a is None else a; b = t + d
        t += d
    return a, b

norm = lambda s: ''.join(c for c in s.lower() if c.isalnum() or c == "'")
def W(word, n=1, sec=None):
    k = 0
    for x in WORDS:
        if sec and x['sec'] != sec: continue
        if norm(x['w']) == norm(word):
            k += 1
            if k == n: return x['s']
    raise KeyError(word)

def PH(sec, phrase, n=1):
    q = [norm(x) for x in phrase.split()]; L = [x for x in WORDS if x['sec'] == sec]; k = 0
    for i in range(len(L) - len(q) + 1):
        if all(norm(L[i + j]['w']) == q[j] for j in range(len(q))):
            k += 1
            if k == n: return L[i]['s']
    raise KeyError(phrase)

BEAT = 0.6; BAR = 4 * BEAT
DROP = PH('HOOK', 'if i were') - 0.12          # title line + beat drop
beats = lambda a, b: [DROP + k * BEAT for k in range(int(np.floor((a - DROP) / BEAT)), int(np.ceil((b - DROP) / BEAT)) + 1) if a - 1e-6 <= DROP + k * BEAT < b]

music = np.zeros((N, 2)); sfx = np.zeros((N, 2)); rev_send = np.zeros((N, 2)); sfx_rev = np.zeros((N, 2))
def add(buf, t, sig, gain=1.0, pan=0.0):
    i = int(round(t * SR))
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        sig = np.stack([sig * l * 1.414, sig * r * 1.414], 1)
    a, b = max(0, i), min(N, i + len(sig))
    if b > a: buf[a:b] += gain * sig[a - i:b - i]

midi = lambda m: 440 * 2 ** ((m - 69) / 12)
def lp(x, f, order=2): return sosfilt(butter(order, f, 'low', fs=SR, output='sos'), x, axis=0)
def hp(x, f, order=2): return sosfilt(butter(order, f, 'high', fs=SR, output='sos'), x, axis=0)
def bp(x, lo, hi, order=2): return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x, axis=0)

def blep_saw(f, n, ph0=0.0):
    t = np.arange(n); dt = f / SR; ph = (ph0 + t * dt) % 1.0
    s = 2 * ph - 1
    m = ph < dt; x = ph[m] / dt; s[m] -= x + x - x * x - 1
    m = ph > 1 - dt; x = (ph[m] - 1) / dt; s[m] -= x * x + x + x + 1
    return s

def pad(notes, dur, cutoff=1600, att=1.0, rel=1.5, det=10):
    n = int((dur + rel) * SR); out = np.zeros((n, 2))
    for m in notes:
        for ch in range(2):
            for c in np.linspace(-det, det, 5) + (3 if ch else -3):
                out[:, ch] += blep_saw(midi(m) * 2 ** (c / 1200), n, rng.random())
    out = lp(out, cutoff, 2) / (len(notes) * 5)
    t = np.arange(n) / SR
    e = np.minimum(1, t / att) * np.where(t < dur, 1, np.exp(-(t - dur) / (rel / 4)))
    return out * e[:, None]

def pluck(m, dur=0.9, bright=1.0):
    n = int(dur * SR); t = np.arange(n) / SR; f = midi(m); s = np.zeros(n)
    for k in range(1, 8):
        if f * k > 12000: break
        s += np.sin(2 * np.pi * f * k * t + rng.random()) * np.exp(-t * (4 + 3.5 * k / bright)) / k ** 1.2
    return s * np.minimum(1, t / 0.002)

def kick(g=1.0):
    n = int(0.5 * SR); t = np.arange(n) / SR
    f = 46 + 110 * np.exp(-t * 32); ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.sin(ph) * np.exp(-t * 6.5) + 0.25 * lp(rng.standard_normal(n), 3000) * np.exp(-t * 300)
    return np.tanh(1.4 * s) * g

def clap():
    n = int(0.35 * SR); t = np.arange(n) / SR; nz = bp(rng.standard_normal(n), 1100, 4200)
    e = sum(np.exp(-np.maximum(0, t - d) * 60) * (t >= d) for d in (0, .011, .022)) / 3 + 0.6 * np.exp(-np.maximum(0, t - .03) * 14) * (t >= .03)
    return nz * e

def hat(open_=False):
    n = int((0.25 if open_ else 0.06) * SR); t = np.arange(n) / SR
    return hp(rng.standard_normal(n), 7500, 4) * np.exp(-t * (14 if open_ else 70))

def tick(f=3100):
    n = int(0.06 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) * np.exp(-t * 220) + 0.6 * np.sin(2 * np.pi * f * 0.61 * t) * np.exp(-t * 300)
            + 0.3 * hp(rng.standard_normal(n), 4000) * np.exp(-t * 600))

def boom(dur=2.6, f0=75, f1=38):
    n = int(dur * SR); t = np.arange(n) / SR
    f = f1 + (f0 - f1) * np.exp(-t * 5); s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 1.6)
    s += 0.5 * lp(rng.standard_normal(n), 400) * np.exp(-t * 9)
    s += 0.12 * bp(rng.standard_normal(n), 2000, 9000) * np.exp(-t * 30)
    return np.tanh(1.2 * s)

def riser(dur, f0=250, f1=7000):
    n = int(dur * SR); t = np.arange(n) / SR; x = rng.standard_normal(n); out = np.zeros(n)
    blk = int(0.02 * SR); zi = None
    for i in range(0, n, blk):
        fc = f0 * (f1 / f0) ** (i / n); sos = butter(2, [fc * 0.6, min(fc * 1.6, 20000)], 'band', fs=SR, output='sos')
        if zi is None: zi = np.zeros((sos.shape[0], 2))
        out[i:i + blk], zi = sosfilt(sos, x[i:i + blk], zi=zi)
    sw = np.sin(2 * np.pi * np.cumsum(180 * (4 ** (t / dur))) / SR) * 0.25
    return (out + sw) * (t / dur) ** 2.2

def whooshy(dur=0.45, f0=500, f1=3500, rev=False):
    s = riser(dur, f0, f1); n = len(s); t = np.arange(n) / SR
    s = s / ((t / dur) ** 2.2 + 1e-9) * np.sin(np.pi * t / dur) ** 1.5
    return s[::-1] if rev else s

def pop(f=900, up=1.6, dur=0.09):
    n = int(dur * SR); t = np.arange(n) / SR; f_t = f * (1 + (up - 1) * (1 - np.exp(-t * 60)))
    return np.sin(2 * np.pi * np.cumsum(f_t) / SR) * np.exp(-t * 45) * np.minimum(1, t / 0.001)

def thud():
    n = int(0.18 * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * np.cumsum(120 + 140 * np.exp(-t * 40)) / SR) * np.exp(-t * 26)
    tk = tick(1800); s[:len(tk)] += 0.3 * tk
    return s

def keyclick():
    n = int(0.025 * SR); t = np.arange(n) / SR
    return bp(rng.standard_normal(n), 1800, 6000) * np.exp(-t * 400)

# ---------------- score ----------------
PROG = [[62, 65, 69, 76], [58, 62, 65, 74], [53, 57, 60, 69], [60, 64, 67, 72]]   # Dm(9) Bb F C, voiced around D4
ROOT = [38, 34, 41, 36]
def chord_at(t): return int(np.floor((t - DROP) / BAR)) % 4

# HOOK: dark drone + ticking clock, riser into the title line ("If I were to start editing with AI in 2026")
add(music, 0.0, pad([38, 50, 57, 64, 65], DROP - 0.35, cutoff=700, att=1.2, rel=0.6), 0.55)
for i, b in enumerate(beats(0.2, DROP - 0.3)):
    add(music, b, tick(3200 if i % 2 == 0 else 2500), 0.05 + 0.04 * (b / DROP), pan=0.35 if i % 2 else -0.35)
for b in beats(0.2, DROP - 1.0)[::4]:
    add(music, b, kick(0.5)[:int(0.4 * SR)] * 0.6, 0.6)
add(music, DROP - 2.0, riser(2.0, 200, 9000), 0.22)

def groove(a, b, drums=True, hats=True, arps=8, level=1.0, padcut=2200, prog=None, root=None, claps=True):
    PR = prog or PROG; RT = root or ROOT
    bar0 = DROP + np.floor((a - DROP) / BAR) * BAR
    t = bar0
    while t < b:
        c = chord_at(t + 0.01); s = max(a, t); d = min(BAR, b - s)
        if d > 0.05:
            add(music, s, pad(PR[c], d, cutoff=padcut, att=0.25, rel=0.6), 0.38 * level)
            bs = np.sin(2 * np.pi * midi(RT[c]) * np.arange(int(d * SR)) / SR); e = np.minimum(1, np.arange(len(bs)) / (0.02 * SR))
            add(music, s, lp(bs * e, 200) * np.exp(-np.arange(len(bs)) / SR * 0.4), 0.30 * level)
        t += BAR
    for k, bt in enumerate(beats(a, b)):
        pos = int(round((bt - DROP) / BEAT)) % 4
        if drums:
            add(music, bt, kick(), 0.42 * level)
            if claps and pos in (1, 3): add(music, bt, clap(), 0.10 * level, pan=0.05); add(rev_send, bt, clap(), 0.06 * level)
        if hats:
            add(music, bt + BEAT / 2, hat(), 0.05 * level, pan=0.3); add(music, bt, hat(), 0.025 * level, pan=-0.3)
        if arps:
            notes = PR[chord_at(bt + 0.01)]; seq = [notes[0] + 12, notes[2] + 12, notes[1] + 12, notes[3] + 12]
            for j in range(arps // 4):
                tj = bt + j * BEAT / (arps // 4)
                if tj >= b: break
                n_ = seq[(k * (arps // 4) + j) % 4]
                p = pluck(n_, 0.7); add(music, tj, p, 0.07 * level, pan=-0.25 if j % 2 else 0.25)
                add(rev_send, tj, p, 0.06 * level); add(music, tj + 0.45, p, 0.025 * level, pan=0.6 if j % 2 else -0.6)

PROG_TENSE = [[62, 65, 69, 74], [58, 62, 65, 70], [55, 58, 62, 67], [57, 61, 64, 69]]; ROOT_TENSE = [38, 34, 43, 45]
PROG_BRIGHT = [[53, 57, 60, 65], [60, 64, 67, 72], [62, 65, 69, 74], [58, 62, 65, 70]]; ROOT_BRIGHT = [41, 36, 38, 34]
PROG_LIFT = [[58, 62, 65, 70], [53, 57, 60, 69], [60, 64, 67, 72], [62, 65, 69, 76]]; ROOT_LIFT = [34, 41, 36, 38]
CARDS = [span(f'CARD{i}') for i in range(1, 9)]
S = {k: span(k) for k in ['HOOK', 'INTRO', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'WHY', 'COST', 'CTA', 'OUT', 'SHOW', 'END']}
ENa, ENb = S['END']; SHa, SHb = S['SHOW']
# title drop -> end of intro: full groove, then it settles under the flow
groove(DROP, S['INTRO'][0], drums=True, hats=True, arps=8, level=0.9)
groove(S['INTRO'][0], S['INTRO'][1], drums=True, hats=True, arps=4, level=0.75, padcut=1800, claps=False)
def card(a, b, chord=(38, 50, 57, 62, 65, 69)):
    add(music, a - 0.25 - 1.6, riser(1.6, 200, 9000), 0.16)
    add(music, a, pad(list(chord), b - a, cutoff=1400, att=0.05, rel=1.4), 0.6)
    add(rev_send, a, pad([c for c in chord if c >= 60] or [62, 65, 69], 0.6, cutoff=3000, att=0.02, rel=0.4), 0.4)
for a, b in CARDS: card(a, b)
# steps: each gets its own colour, nothing too busy under the voice
groove(*S['S1'], drums=False, hats=True, arps=4, level=0.7, padcut=1600, prog=PROG_BRIGHT, root=ROOT_BRIGHT)
for bt in beats(*S['S1'])[::2]: add(music, bt, kick(0.5), 0.2)
groove(*S['S2'], drums=True, hats=True, arps=4, level=0.75, padcut=1800, claps=False)
groove(*S['S3'], drums=True, hats=True, arps=8, level=0.8, prog=PROG_BRIGHT, root=ROOT_BRIGHT)
groove(*S['S4'], drums=False, hats=False, arps=4, level=0.7, padcut=1400, prog=PROG_LIFT, root=ROOT_LIFT)
for bt in beats(*S['S4'])[::2]: add(music, bt, kick(0.5), 0.2)
groove(*S['S5'], drums=True, hats=True, arps=4, level=0.75, padcut=1700, prog=PROG_LIFT, root=ROOT_LIFT, claps=False)
groove(S['S6'][0], SHa - 0.05, drums=True, hats=True, arps=8, level=0.85, padcut=2000)
add(music, SHa - 1.8, riser(1.8, 200, 9000), 0.24)
groove(SHa, SHb, drums=True, hats=True, arps=8, level=1.15, padcut=3000, prog=PROG_LIFT, root=ROOT_LIFT)     # the showcase opens up
groove(*S['S7'], drums=False, hats=True, arps=4, level=0.7, padcut=1500)
for bt in beats(*S['S7'])[::2]: add(music, bt, kick(0.5), 0.2)
groove(*S['S8'], drums=False, hats=False, arps=4, level=0.7, padcut=1000, prog=PROG_TENSE, root=ROOT_TENSE)
for bt in beats(*S['S8'])[::2]: add(music, bt, kick(0.45)[:int(0.35 * SR)], 0.26)
add(music, S['WHY'][0] - 1.6, riser(1.6, 300, 8000), 0.14)
groove(*S['WHY'], drums=True, hats=True, arps=8, level=0.85, prog=PROG_LIFT, root=ROOT_LIFT)
groove(*S['COST'], drums=True, hats=True, arps=8, level=0.85, prog=PROG_BRIGHT, root=ROOT_BRIGHT)
groove(S['CTA'][0], ENa, drums=True, hats=True, arps=8, level=0.8, padcut=2000, prog=PROG_BRIGHT, root=ROOT_BRIGHT)
add(music, ENa - 1.6, riser(1.6, 200, 9000), 0.18)
add(music, ENa, pad([41, 53, 60, 65, 69, 72], ENb - ENa, cutoff=1600, att=0.05, rel=1.5), 0.6)
add(rev_send, ENa, pad([65, 69, 72, 77], 0.8, cutoff=3200, att=0.02, rel=0.5), 0.45)

# ---------------- sound design ----------------
S_ = lambda t, sig, g, pan=0.0, r=0.0: (add(sfx, t, sig, g, pan), add(sfx_rev, t, sig, r, pan) if r else None)
S_(0.05, pop(700, 1.5), 0.10)
S_(DROP, boom(), 0.42, r=0.25); S_(DROP + 0.25, whooshy(0.5, 300, 2500), 0.08)
for a, b in CARDS:
    S_(a - 0.05, boom(2.0, 70, 36), 0.35, r=0.3); S_(a + 0.05, whooshy(0.6, 300, 2500), 0.08, pan=-0.3)
    S_(b - 0.35, whooshy(0.4, 400, 2500, rev=True), 0.05, pan=0.3)
S_(SHa - 0.05, boom(2.4, 70, 36), 0.4, r=0.3); S_(SHa + 0.2, whooshy(0.7, 200, 4000), 0.1)
for i in range(15): S_(SHa - 0.2 + 0.9 + i * 0.05, tick(2400 + 90 * i), 0.04, pan=-0.5 + i / 14)
S_(SHb - 0.35, whooshy(0.4, 400, 2500, rev=True), 0.06)
S_(ENa, boom(2.4, 70, 36), 0.3, r=0.25); S_(ENa + 0.5, pop(420, 1.8, 0.16), 0.10)
cj = json.load(open('qa/cues.json'))
starts = []
for sec, t0, t1, side in cj['blocks']:
    if t0 < 0.3: continue
    S_(t0 + 0.05, whooshy(0.32, 700, 3200), 0.06, pan=-0.35 if side == 'L' else 0.35); starts.append(t0)
for t, fx, sec in cj['kids']:
    if any(abs(t - s_) < 0.15 for s_ in starts): continue
    if fx == 'stamp': S_(t + 0.05, boom(1.2, 110, 50), 0.22, r=0.1); S_(t + 0.05, thud(), 0.12)
    elif fx == 'pop': S_(t, pop(520 + 60 * (int(t * 7) % 5), 1.6, 0.11), 0.08)
    elif fx == 'wipe': S_(t, whooshy(0.3, 400, 2400), 0.05)
    else: S_(t, pop(800 + 90 * (int(t * 11) % 4), 1.35, 0.07), 0.05)

# ---------------- reverb + export ----------------
def ir(rt=2.2, n=None):
    n = n or int(rt * SR); t = np.arange(n) / SR
    x = rng.standard_normal((n, 2)) * np.exp(-6.9 * t / rt)[:, None]
    return lp(x, 6000) / np.sqrt((x ** 2).sum() / 2)
R = ir()
music += 0.5 * np.stack([fftconvolve(rev_send[:, c] + 0.15 * music[:, c], R[:, c])[:N] for c in range(2)], 1)
sfx += np.stack([fftconvolve(sfx_rev[:, c], R[:, c])[:N] for c in range(2)], 1)
music = hp(music, 30)
for name, buf in (('music.wav', music), ('sfx.wav', sfx)):
    pk = np.abs(buf).max(); print(name, 'peak', round(20 * np.log10(pk + 1e-9), 1), 'dBFS')
    sf.write(name, buf.astype(np.float32), SR, subtype='FLOAT')
json.dump({'DROP': DROP, 'END': END, 'CARDS': CARDS + [S['SHOW']], 'ENDCARD': [ENa, ENb]}, open('music_marks.json', 'w'))
print({'DROP': round(DROP, 2), 'END': round(END, 2)})
