#!/usr/bin/env bash
# One-time setup on the computer you edit on (macOS / Linux; on Windows run it in WSL or Git Bash).
#   git clone <this repo> && cd claude-video-editing-skills && ./install.sh
# Safe to re-run: it updates skills and the playbook, and never overwrites your brand.md or your own CLAUDE.md.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE_HOME="${CLAUDE_HOME:-$HOME/.claude}"
SKILLS="$CLAUDE_HOME/skills"
KIT="$CLAUDE_HOME/video-editing"
IMPORT='@video-editing/CLAUDE.md'

mkdir -p "$SKILLS" "$KIT"

# 1. Skills: every folder here with a SKILL.md. Merge (don't delete), so sounds you add yourself survive.
n=0
for d in "$HERE"/*/; do
  [ -f "$d/SKILL.md" ] || continue
  name="$(basename "$d")"
  mkdir -p "$SKILLS/$name"
  cp -R "$d". "$SKILLS/$name/"
  n=$((n + 1))
done
echo "skills:   $n installed to $SKILLS"

# 2. Playbook (always refreshed) and brand file (only if you don't have one yet).
cp "$HERE/CLAUDE.md" "$KIT/CLAUDE.md"
if [ -f "$KIT/brand.md" ]; then
  echo "brand:    kept your existing $KIT/brand.md"
else
  cp "$HERE/brand.md" "$KIT/brand.md"
  echo "brand:    created $KIT/brand.md  <- fill this in once"
fi

# 3. Make every Claude Code session on this computer read the playbook.
TOP="$CLAUDE_HOME/CLAUDE.md"
if [ -f "$TOP" ] && grep -qxF "$IMPORT" "$TOP"; then
  echo "playbook: already linked from $TOP"
else
  { [ -s "$TOP" ] && echo; echo "# Video editing"; echo "$IMPORT"; } >> "$TOP"
  echo "playbook: linked from $TOP"
fi

cat <<EOF

Done. Next:
  1. Open $KIT/brand.md and fill in your channel details (once).
  2. Copy your footage into a folder, open Claude Code in that folder, and ask,
     e.g. "cut shorts from the clips in this folder."
EOF
