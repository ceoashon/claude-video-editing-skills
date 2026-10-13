# plan.json -> pcs/NNN.mkv (graded 4K, 10-bit, near-lossless) -> aroll.mkv + words.json
# HLG HDR is tone-mapped to SDR BT.709 once, here. Punch-ins zoom around the face so
# the face stays put on screen. One piece can switch zoom mid-way (zoom cut, audio
# untouched).
import json, subprocess, os, sys
from concurrent.futures import ThreadPoolExecutor

FPS = 30000 / 1001
W, H = 1920, 1080
# iPhone SDR, HDR off: full-range BT.709 8-bit -> limited-range 10-bit, once. No tone-map needed.
TM = "scale=in_range=pc:out_range=tv:in_color_matrix=bt709:out_color_matrix=bt709,format=yuv420p10le"
# gentle grade: open the shadows a touch (the room is dim), keep the purple, light vignette
GR = "eq=contrast=1.03:saturation=1.04:gamma=1.07,vignette=angle=PI/5:mode=forward"
FACE = {8119: (0.47, 0.47), 8123: (0.49, 0.50), 8124: (0.51, 0.45), 8126: (0.50, 0.42), 8127: (0.50, 0.48),
        8128: (0.51, 0.45), 8129: (0.50, 0.45), 8130: (0.50, 0.45), 8131: (0.50, 0.45), 8132: (0.50, 0.46),
        8133: (0.50, 0.45), 8134: (0.54, 0.45), 8135: (0.50, 0.46), 8136: (0.50, 0.45), 8137: (0.49, 0.47), 8138: (0.45, 0.48)}
ZOOM = {}
def make_jobs(plan):
    jobs = []
    CYCLE = [1.0, 1.08, 1.0, 1.15]   # 1080p source: keep punch-ins modest
    src_words = {}
    def word_starts(take):
        if take not in src_words:
            src_words[take] = [w[0] for s_ in json.load(open(f'tr/IMG_{take}.json')) for w in s_['w']]
        return src_words[take]
    k_run = 0
    for i, p in enumerate(plan):
        if i in ZOOM: z = ZOOM[i]
        elif p.get('mute'): z = 1.0; k_run = 0
        else:
            dur = p['out'] - p['in']; n = max(1, int(dur // 8))          # a zoom cut every ~8 s on long lines
            cuts = []
            for j in range(1, n):
                target = p['in'] + dur * j / n
                ws = [t for t in word_starts(p['take']) if p['in'] + 1.5 < t < p['out'] - 1.5]
                if ws: cuts.append(min(ws, key=lambda t: abs(t - target)))
            zs = [(None, CYCLE[k_run % 4])]; k_run += 1
            for c in sorted(set(cuts)): zs.append((c - 0.04, CYCLE[k_run % 4])); k_run += 1
            z = zs if len(zs) > 1 else zs[0][1]
        zs = z if isinstance(z, list) else [(None, z)]
        bounds = [p['in']] + [round(t * FPS) / FPS for t, _ in zs[1:]] + [p['out']]
        for k, (_, zz) in enumerate(zs):
            a, b = bounds[k], bounds[k + 1]
            face = FACE[p['take']]
            jobs.append((i, k, p['take'], a, round((b - a) * FPS), zz, face))
    # frame totals must match plan exactly
    for i, p in enumerate(plan):
        tot = sum(j[4] for j in jobs if j[0] == i)
        if tot != p['frames']:
            last = max((j for j in jobs if j[0] == i), key=lambda j: j[1])
            jobs[jobs.index(last)] = last[:4] + (last[4] + p['frames'] - tot,) + last[5:]

    return jobs

def name(job):
    i, k, take, a, n, z, (fx, fy) = job
    return f'pcs/{take}_{round(a * 1000)}_{n}_{round(z * 100)}_{round(fx * 100)}_{round(fy * 100)}.mkv'

plan = json.load(open(os.environ.get('PLAN', 'plan.json')))
os.makedirs('pcs', exist_ok=True)
jobs = make_jobs(plan)
if os.environ.get('JOBS_ONLY'): raise SystemExit

def enc(job):
    i, k, take, a, n, z, (fx, fy) = job
    out = name(job)
    if os.path.exists(out) and '--force' not in sys.argv: return out
    if z == 1.0:
        crop = ''
    else:
        cw, ch = round(W / z / 2) * 2, round(H / z / 2) * 2
        x0 = min(max(0, round(fx * W - fx * cw)), W - cw)
        y0 = min(max(0, round(fy * H - fy * ch)), H - ch)
        crop = f',crop={cw}:{ch}:{x0}:{y0},scale={W}:{H}:flags=lanczos'
    vf = f'{TM},{GR}{crop},setsar=1' + (',tpad=stop_mode=clone:stop=300' if plan[i].get('mute') else '')   # card slots: hold the last frame if the take runs out
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{a:.6f}', '-i', f'../raw/IMG_{take}.MOV',
                    '-frames:v', str(n), '-vf', vf, '-r', '30000/1001', '-an',
                    '-c:v', 'libx264', '-preset', 'fast', '-crf', '10', '-pix_fmt', 'yuv420p10le',
                    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
                    out], check=True)
    got = int(subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v:0', '-show_entries',
                              'stream=nb_read_frames', '-of', 'csv=p=0', out], capture_output=True, text=True).stdout)
    print(out, n, got, flush=True)
    if got != n: raise SystemExit(f'frame mismatch {out}: {got} != {n}')
    return out

print(len(jobs), 'jobs', flush=True)
with ThreadPoolExecutor(6) as ex:
    outs = list(ex.map(enc, jobs))
with open('pcs/list.txt', 'w') as f:
    for o in outs: f.write(f"file '{os.path.basename(o)}'\n")
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'pcs/list.txt', '-c', 'copy', 'aroll.mkv'], check=True)

# word timestamps on the output timeline
words = []
for p in plan:
    for s in json.load(open(f"tr/IMG_{p['take']}.json")):
        for w in s['w']:
            if not p.get('mute') and p['in'] - 0.05 <= w[0] < p['out']:
                words.append({'w': w[2].strip(), 's': round(p['t0'] + max(w[0], p['in']) - p['in'], 3),
                              'e': round(p['t0'] + min(w[1], p['out']) - p['in'], 3), 'sec': p['label']})
json.dump(words, open('words.json', 'w'), indent=0)
print('total frames', sum(p['frames'] for p in plan))
