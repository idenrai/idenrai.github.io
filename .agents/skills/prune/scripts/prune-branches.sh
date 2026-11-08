#!/usr/bin/env bash
set -eo pipefail

# Default branch detection (main or master)
DEFAULT_BRANCH=""
if git show-ref --verify --quiet refs/heads/main; then
  DEFAULT_BRANCH="main"
elif git show-ref --verify --quiet refs/heads/master; then
  DEFAULT_BRANCH="master"
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "🔍 Git 브랜치 트리 정리 (Prune) 시작..."
echo "  - 현재 브랜치: $CURRENT_BRANCH"

# Check working tree status
HAS_UNCOMMITTED=0
if [ -n "$(git status --porcelain)" ]; then
  HAS_UNCOMMITTED=1
  echo "⚠️ 현재 작업 트리에 커밋되지 않은 변경사항이 있습니다. 현재 브랜치를 유지하며 정리합니다."
fi

# Switch to default branch if clean and not already on it
if [ $HAS_UNCOMMITTED -eq 0 ] && [ -n "$DEFAULT_BRANCH" ] && [ "$CURRENT_BRANCH" != "$DEFAULT_BRANCH" ]; then
  echo "🔄 $DEFAULT_BRANCH 브랜치로 이동 및 최신화..."
  git checkout "$DEFAULT_BRANCH"
  git pull origin "$DEFAULT_BRANCH" || true
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi

# 1. Fetch & Prune remote tracking (network resilience)
echo "📡 원격 저장소 동기화 (git fetch --prune)..."
git fetch --prune || echo "⚠️ 원격 저장소 동기화 실패 (오프라인 상태 등). 기존 트래킹 정보를 기준으로 계속 진행합니다."

# 2. Identify gone branches using plumbing command
GONE_BRANCHES=$(git for-each-ref --format='%(refname:short) %(upstream:track)' refs/heads | awk '$2 == "[gone]" {print $1}')

if [ -z "$GONE_BRANCHES" ]; then
  echo "✨ 정리할 고립된([gone]) 브랜치가 없습니다. 로컬 브랜치 트리가 깨끗합니다!"
  exit 0
fi

echo "📋 원격에서 삭제/머지된 [gone] 브랜치 발견:"
while IFS= read -r b; do
  [ -z "$b" ] && continue
  echo "  - $b"
done <<< "$GONE_BRANCHES"

# 3. Filter protected branches and current branch
DELETABLE_BRANCHES=()
while IFS= read -r b; do
  [ -z "$b" ] && continue
  if [ "$b" = "main" ] || [ "$b" = "master" ] || [ "$b" = "develop" ] || [ "$b" = "dev" ] || [ "$b" = "staging" ] || [ "$b" = "production" ]; then
    echo "🛡️ 보호 브랜치 ($b) 제외"
  elif [ "$b" = "$CURRENT_BRANCH" ]; then
    echo "🛡️ 현재 체크아웃된 브랜치 ($b) 제외 (삭제하려면 다른 브랜치로 전환 후 실행하세요)"
  else
    DELETABLE_BRANCHES+=("$b")
  fi
done <<< "$GONE_BRANCHES"

if [ ${#DELETABLE_BRANCHES[@]} -eq 0 ]; then
  echo "ℹ️ 삭제 가능한 고립 브랜치가 없습니다."
  exit 0
fi

# 4. Batch delete with fault isolation & option injection protection
echo "🗑️ 고립 브랜치 일괄 삭제 실행:"
DELETED_COUNT=0
FAILED_COUNT=0
for b in "${DELETABLE_BRANCHES[@]}"; do
  if git branch -D -- "$b"; then
    DELETED_COUNT=$((DELETED_COUNT + 1))
  else
    echo "⚠️ 브랜치 삭제 실패: $b"
    FAILED_COUNT=$((FAILED_COUNT + 1))
  fi
done

if [ $FAILED_COUNT -gt 0 ]; then
  echo "⚠️ 정리 완료: $DELETED_COUNT개 삭제 성공, $FAILED_COUNT개 실패"
else
  echo "✅ 총 $DELETED_COUNT개 고립 브랜치 정리 완료!"
fi
