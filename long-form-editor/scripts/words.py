# plan.json -> words.json + g/words.js (word timestamps on the output timeline)
import json
plan = json.load(open('plan.json'))
words = []
for p in plan:
    if p.get('mute'): continue
    for s in json.load(open(f"tr/IMG_{p['take']}.json")):
        for w in s['w']:
            if p['in'] - 0.05 <= w[0] < p['out']:
                words.append({'w': w[2].strip(), 's': round(p['t0'] + max(w[0], p['in']) - p['in'], 3),
                              'e': round(p['t0'] + min(w[1], p['out']) - p['in'], 3), 'sec': p['label']})
json.dump(words, open('words.json', 'w'), indent=0)
open('g/words.js', 'w').write('const WORDS=' + json.dumps(words) + ';\nconst PLAN=' + json.dumps(plan) + ';\n')
print(len(words), 'words')
