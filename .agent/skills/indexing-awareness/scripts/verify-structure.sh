#!/bin/bash

# Indexing Awareness verification script
# Checks the consistency between the document (README.md) and actual files (.agent/**/*).

# Move to project root so the script works from anywhere
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
cd "$PROJECT_ROOT" || exit 1

echo "🔍 Verifying consistency between README.md and .agent files..."
echo "   Project root: $PROJECT_ROOT"
echo "============================================================"

README_FILE="README.md"
RULES_DIR=".agent/rules"
WORKFLOWS_DIR=".agent/workflows"
SKILLS_DIR=".agent/skills"

EXIT_CODE=0

# Check if README.md exists
if [ ! -f "$README_FILE" ]; then
    echo "❌ README.md not found at project root."
    exit 1
fi

# nullglob: If no files match the glob pattern, return an empty list
# (By default, it returns the literal string "*.md")
shopt -s nullglob

# 1. Rules Check
echo "Checking Rules..."
rules_files=("$RULES_DIR"/*.md)
if [ ${#rules_files[@]} -eq 0 ]; then
    echo "⏭️  No rule files found in $RULES_DIR"
else
    for file in "${rules_files[@]}"; do
        filename=$(basename "$file")
        # NOTE: grep -q is a partial match. This is fine with the current naming scheme,
        #       but if names like "foo.md" and "foobar.md" coexist in the future,
        #       consider more strict matching (e.g., grep -w).
        if ! grep -q "$filename" "$README_FILE"; then
            echo "❌ Missing in README: $filename"
            EXIT_CODE=1
        else
            echo "✅ Found: $filename"
        fi
    done
fi

# 2. Workflows Check
echo "Checking Workflows..."
workflow_files=("$WORKFLOWS_DIR"/*.md)
if [ ${#workflow_files[@]} -eq 0 ]; then
    echo "⏭️  No workflow files found in $WORKFLOWS_DIR"
else
    for file in "${workflow_files[@]}"; do
        filename=$(basename "$file")
        command_name="/${filename%.md}"
        if ! grep -q "$command_name" "$README_FILE"; then
            echo "❌ Missing in README: $command_name"
            EXIT_CODE=1
        else
            echo "✅ Found: $command_name"
        fi
    done
fi

# 3. Skills Check
echo "Checking Skills..."
found_skills=0
for dir in "$SKILLS_DIR"/*; do
    if [ -d "$dir" ]; then
        found_skills=1
        skill_name=$(basename "$dir")
        if ! grep -q "$skill_name" "$README_FILE"; then
            echo "❌ Missing in README: $skill_name"
            EXIT_CODE=1
        else
            echo "✅ Found: $skill_name"
        fi
    fi
done
if [ $found_skills -eq 0 ]; then
    echo "⏭️  No skill directories found in $SKILLS_DIR"
fi

shopt -u nullglob

echo "============================================================"
if [ $EXIT_CODE -eq 0 ]; then
    echo "🎉 All checks passed! Project is well-indexed."
else
    echo "⚠️  Some inconsistencies found. Please update README.md."
fi

exit $EXIT_CODE
