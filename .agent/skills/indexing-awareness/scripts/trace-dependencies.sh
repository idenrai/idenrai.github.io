#!/bin/bash

# Dependency Tracer
# Bi-directional search for file or symbol dependencies.
# Simulates RAG "related context search".
#
# Modes:
#   File mode: Argument is a file path
#     -> Forward (what this file imports)
#     -> Reverse (who imports this file)
#
#   Symbol mode: Argument is a symbol name
#     -> Definition (search for definitions)
#     -> Usage (search for usage)

# --- Auto-resolve project root ---
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
cd "$PROJECT_ROOT" || exit 1

TARGET="$1"
SEARCH_DIR="${2:-.}"

if [ -z "$TARGET" ] || [ "$TARGET" = "--help" ] || [ "$TARGET" = "-h" ]; then
    echo "Usage: trace-dependencies.sh <file-or-symbol> [search-directory]"
    echo ""
    echo "Modes:"
    echo "  File mode:   If the argument is an existing file path, trace its dependencies bi-directionally"
    echo "  Symbol mode: If the argument is a symbol name, search for definition and usage"
    echo ""
    echo "Examples:"
    echo "  trace-dependencies.sh src/utils/auth.ts        # File dependencies"
    echo "  trace-dependencies.sh handleLogin              # Symbol search"
    echo "  trace-dependencies.sh UserService src/         # Search within a specific scope"
    exit 0
fi

# --- Exclude patterns (for grep) ---
EXCLUDE_DIRS=(
    --exclude-dir=node_modules
    --exclude-dir=.git
    --exclude-dir=dist
    --exclude-dir=build
    --exclude-dir=__pycache__
    --exclude-dir=.next
    --exclude-dir=.venv
    --exclude-dir=target
)

# --- Source code extensions ---
SOURCE_INCLUDES=(
    --include="*.ts" --include="*.tsx"
    --include="*.js" --include="*.jsx"
    --include="*.mjs" --include="*.cjs"
    --include="*.py"
    --include="*.java"
    --include="*.go"
    --include="*.rb"
    --include="*.rs"
    --include="*.vue" --include="*.svelte"
    --include="*.php"
    --include="*.cs"
    --include="*.swift"
    --include="*.kt" --include="*.kts"
)

# --- Config file extensions ---
CONFIG_INCLUDES=(
    --include="*.md"
    --include="*.json"
    --include="*.yaml" --include="*.yml"
    --include="*.toml"
    --include="*.xml"
    --include="*.cfg" --include="*.conf" --include="*.ini"
    --include="*.env"
)

# --- Import/Require patterns (cross-language) ---
IMPORT_PATTERN='(import |require\(|from ["\x27]|include |#include |use |using )'

echo "🔗 Dependency Trace: $TARGET"
echo "   Search scope: $SEARCH_DIR"
echo "============================================================"

if [ -f "$TARGET" ]; then
    # =========================================================
    # FILE MODE
    # =========================================================
    filename=$(basename "$TARGET")
    filename_no_ext="${filename%.*}"

    echo ""
    echo "📥 Forward Dependencies (What this file references):"
    echo "---"
    results=$(grep -nE "$IMPORT_PATTERN" "$TARGET" 2>/dev/null)
    if [ -n "$results" ]; then
        echo "$results"
    else
        echo "   (none found)"
    fi

    echo ""
    echo "📤 Reverse Dependencies (What references this file):"
    echo "---"
    results=$(grep -rnI "${EXCLUDE_DIRS[@]}" "${SOURCE_INCLUDES[@]}" \
        -E "(${filename_no_ext}|${filename})" \
        "$SEARCH_DIR" 2>/dev/null | grep -v "^${TARGET}:" | head -30)
    if [ -n "$results" ]; then
        echo "$results"
    else
        echo "   (none found)"
    fi

    echo ""
    echo "🔍 Config/Doc References (References from config or doc files):"
    echo "---"
    results=$(grep -rnI "${EXCLUDE_DIRS[@]}" "${CONFIG_INCLUDES[@]}" \
        "$filename" "$SEARCH_DIR" 2>/dev/null | grep -v "^${TARGET}:" | head -20)
    if [ -n "$results" ]; then
        echo "$results"
    else
        echo "   (none found)"
    fi

else
    # =========================================================
    # SYMBOL MODE
    # =========================================================

    echo ""
    echo "📌 Definitions (Definition source):"
    echo "---"
    # General definition patterns (cross-language)
    results=$(grep -rnI "${EXCLUDE_DIRS[@]}" "${SOURCE_INCLUDES[@]}" \
        -E "(function\s+${TARGET}|const\s+${TARGET}|let\s+${TARGET}|var\s+${TARGET}|class\s+${TARGET}|interface\s+${TARGET}|type\s+${TARGET}|enum\s+${TARGET}|def\s+${TARGET}|fn\s+${TARGET}|func\s+${TARGET}|struct\s+${TARGET}|trait\s+${TARGET}|export\s+(default\s+)?(function|class|const|let|var)\s+${TARGET})" \
        "$SEARCH_DIR" 2>/dev/null | head -20)
    if [ -n "$results" ]; then
        echo "$results"
    else
        echo "   (none found)"
    fi

    echo ""
    echo "📎 Usages (Where it is used):"
    echo "---"
    results=$(grep -rnI "${EXCLUDE_DIRS[@]}" "${SOURCE_INCLUDES[@]}" \
        -w "$TARGET" "$SEARCH_DIR" 2>/dev/null | head -30)
    if [ -n "$results" ]; then
        echo "$results"
    else
        echo "   (none found)"
    fi

    echo ""
    echo "📦 Import/Require References:"
    echo "---"
    results=$(grep -rnI "${EXCLUDE_DIRS[@]}" "${SOURCE_INCLUDES[@]}" \
        -E "(import.*${TARGET}|require.*${TARGET}|from.*${TARGET})" \
        "$SEARCH_DIR" 2>/dev/null | head -20)
    if [ -n "$results" ]; then
        echo "$results"
    else
        echo "   (none found)"
    fi
fi

echo ""
echo "============================================================"
echo "✅ Trace complete."
