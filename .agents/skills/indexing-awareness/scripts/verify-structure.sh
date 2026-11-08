#!/bin/bash
# Indexing Awareness verification script for idenrai.github.io
# Checks the consistency between AGENTS.md and actual files in .agents/

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
cd "$PROJECT_ROOT" || exit 1

echo "🔍 Verifying consistency between AGENTS.md and .agents/ customizations..."
echo "   Project root: $PROJECT_ROOT"
echo "============================================================"

AGENTS_FILE="AGENTS.md"
RULES_DIR=".agents/rules"
SKILLS_DIR=".agents/skills"
AGENTS_DIR=".agents/agents"

EXIT_CODE=0

if [ ! -f "$AGENTS_FILE" ]; then
    echo "❌ AGENTS.md not found at project root."
    exit 1
fi

shopt -s nullglob

# 1. Rules Check
echo "Checking Rules..."
rules_files=("$RULES_DIR"/*.md)
for file in "${rules_files[@]}"; do
    filename=$(basename "$file")
    if ! grep -q "$filename" "$AGENTS_FILE"; then
        echo "❌ Rule missing in AGENTS.md: $filename"
        EXIT_CODE=1
    else
        echo "✅ Rule registered: $filename"
    fi
done

# 2. Declarative Subagents Check
echo "Checking Declarative Subagents..."
if [ -d "$AGENTS_DIR" ]; then
    agent_files=("$AGENTS_DIR"/*.md)
    for file in "${agent_files[@]}"; do
        filename=$(basename "$file")
        if ! grep -q "$filename" "$AGENTS_FILE"; then
            echo "❌ Subagent missing in AGENTS.md: $filename"
            EXIT_CODE=1
        else
            echo "✅ Subagent registered: $filename"
        fi
    done
fi

# 3. Skills Check
echo "Checking Skills..."
for dir in "$SKILLS_DIR"/*; do
    if [ -d "$dir" ]; then
        skill_name=$(basename "$dir")
        if [ ! -f "$dir/SKILL.md" ]; then
            echo "❌ Missing SKILL.md in: $skill_name"
            EXIT_CODE=1
        elif ! grep -q "$skill_name" "$AGENTS_FILE"; then
            echo "⚠️  Skill not explicitly mentioned in AGENTS.md: $skill_name"
        else
            echo "✅ Skill registered & valid: $skill_name"
        fi
    fi
done

# 4. Hooks Check
echo "Checking Lifecycle Hooks..."
if [ -f ".agents/hooks.json" ]; then
    echo "✅ Antigravity 2.0 hooks.json found."
else
    echo "❌ .agents/hooks.json missing!"
    EXIT_CODE=1
fi

shopt -u nullglob

echo "============================================================"
if [ $EXIT_CODE -eq 0 ]; then
    echo "🎉 All checks passed! Agent harness is fully modern and valid."
else
    echo "⚠️  Some inconsistencies found. Please review above."
fi

exit $EXIT_CODE
