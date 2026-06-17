---
description: GitHub 이슈 기반 버그 수정 및 자동 PR 생성
---

# GitHub Issue Solver Workflow

**Activation:** User typed `/solve-issue` or `/solve-issue <number>`, or requested to resolve an open GitHub issue.

## Objective
GitHub에 등록된 이슈를 읽고 분석한 뒤, 에이전트가 코드를 수정하고 해당 이슈를 해결하는 Pull Request를 자동으로 생성합니다.

## Workflow Steps

### 1. Fetch Issue Information
- 사용자가 이슈 번호를 제공한 경우: `github-mcp-server`의 `get_issue` 도구를 사용하여 해당 이슈의 제목, 본문(설명), 상태 등을 가져옵니다.
- 이슈 번호가 제공되지 않은 경우: `list_issues` 도구를 사용하여 현재 열려있는(Open) 이슈 목록을 조회하고, 사용자에게 어떤 이슈를 해결할지 묻습니다.

### 2. Create a Working Branch
- 현재 `main` 브랜치에서 새로운 작업 브랜치를 생성하고 이동합니다.
- 브랜치 이름 규칙: `fix/issue-<이슈번호>` 또는 `feat/issue-<이슈번호>` (예: `git checkout -b fix/issue-12`)

### 3. Analyze & Implementation Plan (선택적 /plan 연계)
- 이슈 내용을 바탕으로 기존 코드를 파악합니다. (`/grasp` 워크플로우 활용)
- 변경해야 할 사항이 복잡하거나 설계가 필요한 경우, `implementation_plan.md`를 생성하여 사용자에게 승인을 요청합니다.
- 단순 버그 수정이나 명확한 기능 추가라면 바로 코드를 수정합니다.

### 4. Code Implementation
- 에이전트가 코드를 수정합니다. (`/lint-fix` 연계 가능)
- 수정이 완료되면 직접 커밋하거나 푸시하지 않습니다.

### 5. Verification and Create PR
- 작업의 마무리는 반드시 **`/pr` 워크플로우를 호출**하여 위임합니다.
- `/pr` 워크플로우 내부의 Pre-PR Checklist에 따라 빌드 검증, 문서 업데이트, 커밋 및 PR 생성이 자동으로 진행됩니다.
- 이슈 해결을 위해, PR 생성 시 `body`나 커밋 메시지 본문에 `Fixes #<이슈번호>` 또는 `Resolves #<이슈번호>`를 반드시 포함하도록 `/pr` 워크플로우에 지시하세요.

### 6. Report Success
- 성공적으로 생성된 Pull Request 링크를 사용자에게 보고하고, 리뷰를 요청합니다.
