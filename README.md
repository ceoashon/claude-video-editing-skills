# Edit YouTube videos with Claude Code: free skills

These are the skills I use to make my videos with Claude Code (Opus 5.5) on the $20 Claude Pro plan. Every long form on my channel is cut, graphic'd, scored and mixed this way.

| Skill | What it does |
|---|---|
| `interview-shot-sheet` | Claude interviews you about the video until it finds the story, then writes a bullet-point shot sheet for your second phone |
| `long-form-editor` | Raw takes → cut list → graded A-roll → word-synced motion graphics → original music + sound effects → mixed, rendered video |
| `sfx-library` | 234 royalty-free sound effects (whooshes, impacts, risers, clicks, dings, money, glitch…) plus a script that cues them to your timeline and renders the `sfx.wav` for the mix |
| `shorts-cutter` | Finds the 5–8 best standalone moments in a long form and cuts them as vertical shorts |
| `video-quality-check` | Catches the stuff that made my first video look flat and grey (HDR footage, stacked compression, loudness) |
| `youtube-metadata` | Titles, description with chapters, tags and a pinned comment |

## Quick start (do this once per computer)

1. Install [Claude Code](https://claude.com/claude-code).
2. `git clone` this repo, then run `./install.sh` inside it (macOS / Linux; on Windows use WSL or Git Bash). It copies every skill into `~/.claude/skills/` and links the editing playbook (`CLAUDE.md`) so every Claude Code session on that computer reads it.
3. Open `~/.claude/video-editing/brand.md` and fill in your channel details once, so Claude never has to ask again.

## Every edit after that

1. Copy your footage off the camera or card into a folder on your computer. Copy, don't move.
2. Open Claude Code in that folder and say what you want, for example:
   - "Cut shorts from the clips in this folder."
   - "Edit these takes into a long form, with whooshes on the graphics and a boom on the hook."
   - "Check this footage before we edit."

Claude checks the footage, installs what's missing, and starts. Originals are never touched; results go to `final/`.

Manual install instead: copy the skill folders into `~/.claude/skills/` (or `.claude/skills/` inside your video project).

The editor needs `ffmpeg`, Python 3 (`numpy`, `scipy`, `soundfile`, `pillow`, `faster-whisper`) and Node with `playwright`. Claude can install them for you.

## My workflow in one line

Interview → record 1–2 minute takes off the shot sheet (1080p, HDR off) → upload to Google Drive → "edit this" → review, give notes → post.

## Notes

- You still direct. Tell it when something looks off, sounds off or has too much going on.
- Keep one focal point on screen at a time.
- Use your own music or let it generate some. Don't drop in songs you don't own.
- The sounds in `sfx-library` are original or CC0 (see `sfx-library/LICENSE-SFX.txt`), free to use in any video with no credit.

Made by @eliftforlife. Subscribe for a lemon 🍋
