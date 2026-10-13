import json, sys, os
from faster_whisper import WhisperModel
try:
    m = WhisperModel('medium.en', device='cuda', compute_type='float16'); print('cuda medium.en')
except Exception as e:
    print('cuda failed:', e); m = WhisperModel('small.en', device='cpu', compute_type='int8')
for n in sys.argv[1:]:
    wav = f'tr/{n}.wav'
    try:
        segs, _ = m.transcribe(wav, word_timestamps=True, vad_filter=False, beam_size=5)
        out = [{'s': round(s.start, 2), 'e': round(s.end, 2), 't': s.text, 'w': [[round(w.start, 2), round(w.end, 2), w.word] for w in s.words]} for s in segs]
    except Exception as e:
        print('fail', n, e); raise
    json.dump(out, open(f'tr/{n}.json', 'w'))
    with open(f'tr/{n}.txt', 'w', encoding='utf-8') as f:
        for s in out: f.write(f"{s['s']:7.2f}-{s['e']:7.2f} {s['t']}\n")
    print('done', n, flush=True)
