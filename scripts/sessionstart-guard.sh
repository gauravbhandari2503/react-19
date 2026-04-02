#!/usr/bin/env bash
set -euo pipefail

# SessionStart guard — uses gitleaks to detect hardcoded secrets before
# allowing a Copilot agent session to proceed.

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$REPO_ROOT"

# Locate gitleaks: system PATH first, then user-local install
GITLEAKS=$(command -v gitleaks 2>/dev/null || echo "$HOME/.local/bin/gitleaks")

if [[ ! -x "$GITLEAKS" ]]; then
  echo "WARNING: gitleaks not found — secret scan skipped."
  echo "Install it from: https://github.com/gitleaks/gitleaks#installing"
  echo "  curl -sSL https://github.com/gitleaks/gitleaks/releases/latest/download/gitleaks_linux_x64.tar.gz | tar -xz -C ~/.local/bin gitleaks"
  exit 0
fi

CONFIG_FLAG=""
if [[ -f ".gitleaks.toml" ]]; then
  CONFIG_FLAG="--config .gitleaks.toml"
fi

echo "gitleaks $("$GITLEAKS" version): scanning working tree for secrets..."

# --no-git  → scan filesystem directly (fast, no git history traversal)
# --redact  → mask secret values in output
# exits 1 if leaks found, 0 if clean
if "$GITLEAKS" detect --source . --no-git $CONFIG_FLAG --redact; then
  echo "SessionStart hook: no secrets detected. Session allowed."
  exit 0
else
  echo "SessionStart hook: secrets detected — blocking session."
  exit 1
fi