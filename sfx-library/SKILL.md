---
name: sfx-library
description: A bundled library of 234 royalty-free sound effects (whooshes, impacts, risers, pops and clicks, dings, money, tech and glitch, camera and paper, funny, time) plus a script that places them on a timeline and renders a sfx.wav for the mix. Use when a video needs sound effects on cuts, text, graphics or reveals - in long forms, shorts, or any edit made with the other skills.
---

# SFX library

234 WAVs (48 kHz, 16-bit stereo, peak-normalised to -1 dB) in `sounds/`, in 10 category folders. Every sound is original or CC0, free for any video on any platform with no credit (see `LICENSE-SFX.txt`). `CATALOG.md` lists every file with its length.

| Folder | Use it for |
|---|---|
| `01-whooshes-transitions` | jump cuts, zoom-ins, scene and graphic changes (33) |
| `02-impacts-booms` | the hook line, reveals, a title slamming in (49) |
| `03-risers-tension` | the 1-3 s before a reveal (20) |
| `04-pops-clicks` | captions appearing, list items, emojis, screen recordings (38) |
| `05-dings-notifications` | a right answer, a DM, a win, a mistake (22) |
| `06-money` | revenue, sales, client wins (13) |
| `07-tech-glitch` | AI and tech content, pattern breaks (28) |
| `08-camera-paper` | freeze frames, notes, page turns (11) |
| `09-funny-reactions` | comedic moments only (13) |
| `10-time` | urgency, deadlines, a countdown (7) |

## How to use

Run from `sfx-library/scripts/` (or copy `sfx.py` next to `music.py`; it finds `../sounds`). Needs Python 3 + `numpy`, nothing else.

1. **Pick sounds.** `py sfx.py list` shows categories; `py sfx.py list money` lists one; `py sfx.py find whoosh swipe` searches by name.
2. **Write the cue list** (`cues.json`). Times are on the **output timeline**, the same clock as `g/words.js` and `plan.json`, so cue to a word or a graphic's start time rather than guessing.
   ```json
   {"length": 93.4, "cues": [
     {"t": 0.0,  "sound": "Impact_Cinematic_Boom_01"},
     {"t": 14.2, "sound": "Whoosh_Swish_03", "pan": -0.3},
     {"t": 31.8, "sound": "Riser_Power_Up_01"},
     {"t": 32.0, "sound": "Money_Cha_Ching_01", "gain_db": -12}
   ]}
   ```
   - `gain_db` has a sensible default per category (effects sit well under the voice). Only set it to correct a specific sound.
   - `pan` -1..1. Pan whooshes toward the side the graphic enters from.
   - `align` says which part of the sound lands on `t`: `start`, `peak` or `end`. Defaults: impacts, clicks, dings, money, camera → `peak` (the hit lands on the beat); risers → `end` (it resolves on `t`, so a riser cued at a reveal builds up *before* it); everything else → `start`.
3. **Render:** `py sfx.py render cues.json sfx.wav`. Set `length` to the video length.
   - In the long-form pipeline, `music.py` already writes its own synthesized `sfx.wav`. To keep those and add pack sounds on top: `py sfx.py render cues.json sfx.wav --add sfx.wav` (run after `music.py`, before `mix.py`). To use only pack sounds, render to `sfx.wav` after `music.py` without `--add`.
   - `mix.py` reads `sfx.wav` as is. For shorts, render the same way and mix it under the voice.
4. **Listen.** Render a section, play it with the voice, fix the one cue that's wrong. It is a number in a json file, not a re-edit.

If the sum clips, the script warns. Lower gains instead of stacking more sounds.

## Taste rules
- **Less is more.** An effect should be felt, not noticed. If you can hear it over the voice, it's too loud or there are too many.
- **One sound per moment.** A whoosh into a boom into a ding is three effects on one beat. Pick one.
- **Match the beat.** Cue to the word or the first frame of the graphic. A whoosh 100 ms late sounds like a mistake.
- **Vary repeats.** Same whoosh on every cut gets stale; there are many `Whoosh_Swish_NN` and `Pop_Text_NN` variants. Rotate them.
- **Reserve the big ones.** Booms and cinematic hits for the hook and 1-2 reveals, not every chapter card.
- **Funny sounds only when the moment is funny.** Don't use `09-funny-reactions` as filler.
- Risers need silence or a held note after them. Don't put a riser into a busy line of speech.

## Adding sounds
Drop a `.wav` into the matching `sounds/<category>/` folder (non-48 kHz files are resampled on load). Then `py sfx.py catalog > ../CATALOG.md` to refresh the list.
