#!/usr/bin/env bash
set -euo pipefail

title="${1:-ai-session}"
slug="$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')"
date_str="$(date +%F)"
dir="company-memory/work-logs"
file="$dir/${date_str}-${slug:-ai-session}.md"

mkdir -p "$dir"

if [ -e "$file" ]; then
  echo "$file"
  exit 0
fi

cat > "$file" <<EOF
# ${title}

Date: ${date_str}

## Goal

-

## Context Read

- AGENTS.md
- agent.md
- company-memory/README.md
- company-memory/session-log.md

## Work Done

-

## Decisions

-

## Follow-Ups

-

## Secret Handling

- No plaintext secrets stored in git.
EOF

echo "$file"
