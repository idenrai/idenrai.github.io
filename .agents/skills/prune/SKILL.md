---
name: prune
description: 원격 저장소에서 삭제/병합된 고립 브랜치([gone] 상태)를 안전하게 탐지하여 로컬 브랜치 트리를 일괄 정리하는 스킬
---

# Git Branch Prune (고립 브랜치 일괄 정리)

**트리거:** `/prune`, 로컬 브랜치 정리 요청 시

원격(Remote) 저장소에서 이미 병합되거나 삭제되었지만, 로컬 환경에 여전히 남아있는 쓸모없는 고립 브랜치(`[gone]` 상태)를 감지하고 일괄 정리하여 Git 브랜치 트리를 최적화합니다.

---

## 1. 실행 스크립트 (원클릭 자동화)
스킬 디렉토리에 내장된 검증된 스크립트를 즉시 실행할 수 있습니다.

```bash
./.agents/skills/prune/scripts/prune-branches.sh
```

---

## 2. 단계별 실행 절차 (Runbook)

스크립트 대신 수동으로 실행하거나 단계별 출력을 확인해야 할 때 다음 순서로 수행합니다.

### 1단계: 작업 트리 상태 점검 및 기본 브랜치 이동
- 작업 중인 변경사항이 없는 경우 기준 기본 브랜치(`main` 또는 `master`)로 이동하여 최신 상태를 반영합니다.
  ```bash
  git checkout main && git pull origin main
  ```

### 2단계: 원격 트래킹 최신화 (`fetch --prune`)
- 원격 저장소에서 이미 삭제된 브랜치의 로컬 트래킹 정보를 제거합니다.
  ```bash
  git fetch --prune
  ```

### 3단계: 삭제 대상 브랜치 식별 (`git for-each-ref`)
- Git 머신 리더블 플러밍 명령어로 고립(`[gone]`) 브랜치를 신뢰성 있게 조회합니다.
  ```bash
  git for-each-ref --format='%(refname:short) %(upstream:track)' refs/heads | awk '$2 == "[gone]" {print $1}'
  ```

### 4단계: 보호 브랜치 검증 및 안전한 일괄 삭제
- `main`, `master`, `develop`, `dev`, `staging`, `production` 및 현재 체크아웃된 브랜치는 **절대 삭제 대상에 포함하지 않습니다**.
- 식별된 브랜치 목록을 확인한 후 옵션 인젝션을 방어하며 강제 삭제(`-D --`)를 진행합니다.
  ```bash
  git branch -D -- <branch-name-1> <branch-name-2> ...
  ```

---

## 3. 안전 가드 (Safety Guards)
- **보호 브랜치 보호**: `main`, `master` 브랜치는 PreToolUse Hook 및 스크립트 레벨에서 삭제가 원천 차단됩니다.
- **미커밋 변경사항 보호**: 현재 브랜치에 커밋되지 않은 변경사항이 있는 경우, 브랜치 전환을 강제하지 않고 현재 위치에서 다른 고립 브랜치만 안전하게 정리합니다.

