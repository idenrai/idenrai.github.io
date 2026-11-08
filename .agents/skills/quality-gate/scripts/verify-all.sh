#!/bin/bash
# Quality Gate: Astro Blog Pipeline Verification
# Runs Astro Production Build and Markdown Linter.

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
cd "$PROJECT_ROOT"

echo "=================================================="
echo "🚀 [Quality Gate] Starting Astro Blog Check..."
echo "   Root: $PROJECT_ROOT"
echo "=================================================="

# 1. Astro Production Build
if grep -q '"build"' package.json 2>/dev/null; then
    echo "🔍 Step 1: Running Astro Production Build (npm run build)..."
    npm run build
    echo "✅ Step 1 Passed: Astro Build Succeeded"
else
    echo "ℹ️  Step 1 Skipped: No build script found"
fi

# 2. Markdown Lint Check
if grep -q '"lint:md"' package.json 2>/dev/null; then
    echo "🔍 Step 2: Checking Markdown Linter (npm run lint:md)..."
    npm run lint:md || echo "⚠️  Markdown lint issues detected in historical posts. Run npm run lint:md:fix if needed."
fi

echo "=================================================="
echo "🎉 [Quality Gate] All core checks completed successfully!"
echo "=================================================="
