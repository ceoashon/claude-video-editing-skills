# Edit YouTube videos with Claude Code: free skills

These are the skills I use to make my videos with Claude Code (Opus 5.5) on the $20 Claude Pro plan. Every long form on my channel is cut, graphic'd, scored and mixed this way.

| Skill | What it does |
|---|---|
| `interview-shot-sheet` | Claude interviews you about the video until it finds the story, then writes a bullet-point shot sheet for your second phone |
| `long-form-editor` | Raw takes → cut list → graded A-roll → word-synced motion graphics → original music + sound effects → mixed, rendered video |
| `shorts-cutter` | Finds the 5–8 best standalone moments in a long form and cuts them as vertical shorts |
| `video-quality-check` | Catches the stuff that made my first video look flat and grey (HDR footage, stacked compression, loudness) |
| `youtube-metadata` | Titles, description with chapters, tags and a pinned comment |

## Install

1. Install [Claude Code](https://claude.com/claude-code).
2. Copy the folders you want into `~/.claude/skills/` (or `.claude/skills/` inside your video project).
3. Open Claude Code in the folder with your footage and say what you want, e.g. "interview me for my next video", "edit these takes into a long form", "cut shorts from this video".

The editor needs `ffmpeg`, Python 3 (`numpy`, `scipy`, `soundfile`, `pillow`, `faster-whisper`) and Node with `playwright`. Claude can install them for you.

## My workflow in one line

Interview → record 1–2 minute takes off the shot sheet (1080p, HDR off) → upload to Google Drive → "edit this" → review, give notes → post.

## Notes

- You still direct. Tell it when something looks off, sounds off or has too much going on.
- Keep one focal point on screen at a time.
- Use your own music or let it generate some. Don't drop in songs you don't own.

Made by @eliftforlife. Subscribe for a lemon 🍋
