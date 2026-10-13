# Cut list for the first ~75 s of an example long form -> plan.json
# Each line: (label, take, start_word_time, end_word_end). Boundaries get refined
# against the audio envelope, long internal pauses get shortened, and every cut
# snaps to the 29.97 fps frame grid of the source.
import json, numpy as np, soundfile as sf

FPS = 30000 / 1001
from segs import SEGS
PRE, POST = 0.20, 0.28        # room kept around the first/last word
MAX_GAP, KEEP_GAP = 0.60, 0.30  # internal pauses longer than MAX_GAP shrink to KEEP_GAP

def env(take):
    a, sr = sf.read(f'a48/IMG_{take}.wav', dtype='float32')
    m = a.mean(1) if a.ndim > 1 else a
    hop = sr // 100
    n = len(m) // hop
    r = np.sqrt((m[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
    return 20 * np.log10(r)

def words(take):
    out = []
    for s in json.load(open(f'tr/IMG_{take}.json')):
        out += [(w[0], w[1], w[2].strip()) for w in s['w']]
    return out

snap = lambda t: round(t * FPS) / FPS
cache = {}
plan = []
past_first = True
for seg in SEGS:
    if seg[1] is None:
        past_first = True   # card / end slot: footage keeps rolling under an opaque card, no voice
        prev = plan[-1]
        plan.append({'label': seg[0], 'take': prev['take'], 'in': snap(prev['out']), 'out': snap(prev['out'] + seg[2]), 'text': '', 'mute': True})
        continue
    label, take, a, b = seg[:4]; hard_out = seg[4] if len(seg) > 4 else None; hard_in = seg[5] if len(seg) > 5 else None
    if take not in cache:
        e = env(take); cache[take] = (e, words(take), np.percentile(e, 10))
    e, ws, floor = cache[take]
    thr = floor + 8
    # after the first minute, b is the START of the last word: cut after that word
    if past_first:
        st = [w for w in ws if abs(w[0] - b) < 0.011]
        if not st: raise SystemExit(f'no word starts at {b} in {take}')
        b = st[0][1]
    ww = [w for w in ws if a - 0.01 <= w[0] <= b - 0.01]
    # quietest 10 ms frame inside the padding window -> cut point
    def quiet(lo, hi, prefer):
        lo_i, hi_i = max(0, int(lo * 100)), min(len(e) - 1, int(hi * 100))
        if hi_i <= lo_i: return prefer
        i = lo_i + int(np.argmin(e[lo_i:hi_i])); return i / 100
    # extend the end while the voice is still above the gate (word tails)
    end = b
    while int(end * 100) < len(e) and e[int(end * 100)] > thr and end < b + 0.5: end += 0.01
    # real voice onset (Whisper often starts the first word early)
    on = max(0, int((a - 0.1) * 100))
    while on < len(e) and e[on] <= thr: on += 1
    a = min(max(a, on / 100 - 0.02), a + 0.25)   # trust the envelope, but never skip more than 0.25 s of a word
    t_in = max(0.0, quiet(a - PRE - 0.1, a - 0.06, a - PRE))
    t_out = quiet(end + 0.08, end + POST + 0.1, end + POST)
    # never run into the neighbouring words that aren't part of this line
    nxt = [w for w in ws if w[0] >= b - 0.01 and w[2] not in [x[2] for x in ww[-1:]]]
    prv = [w for w in ws if w[1] <= a + 0.05 and w[0] < a - 0.01]
    if nxt and nxt[0][0] < t_out + 0.05:
        end = min(end, nxt[0][0])
        t_out = quiet(b - 0.06, nxt[0][0] + 0.06, b)
    if prv and prv[-1][1] > t_in - 0.05:
        t_in = max(t_in, quiet(prv[-1][1] - 0.06, a + 0.04, a - 0.02))
    if hard_in: t_in = hard_in
    # split long internal pauses (speech gate on the envelope)
    pieces, cur = [], t_in
    i, n = int(a * 100), int(end * 100)
    while i < n:
        if e[i] <= thr:
            j = i
            while j < n and e[j] <= thr: j += 1
            if (j - i) / 100 > MAX_GAP:
                half = KEEP_GAP / 2
                pieces.append((cur, i / 100 + half)); cur = j / 100 - half
            i = j
        else:
            i += 1
    if hard_out: t_out = hard_out; pieces = [pc for pc in pieces if pc[1] < hard_out]
    pieces.append((cur, t_out))
    for k, (x, y) in enumerate(pieces):
        if (e[int(x * 100):int(y * 100)] > thr + 6).sum() < 5: continue   # no speech in it
        x, y = snap(x), snap(y)
        txt = ' '.join(w[2] for w in ww if x - 0.05 <= w[0] < y)
        plan.append({'label': label, 'take': take, 'in': x, 'out': y, 'text': txt})

t = 0
for p in plan:
    p['t0'] = t; d = round((p['out'] - p['in']) * FPS); p['frames'] = d; t += d / FPS
    print(f"{p['t0']:6.2f} {p['label']:5} {p['take']} {p['in']:7.3f}-{p['out']:7.3f} ({d/FPS:4.2f}s) {p['text']}")
print('total', round(t, 2), 's', sum(p['frames'] for p in plan), 'frames')
json.dump(plan, open('plan.json', 'w'), indent=1)
