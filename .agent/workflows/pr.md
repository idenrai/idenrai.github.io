---
description: 작업 완료 후 PR 자동 생성
---

# Pull Request Automation Workflow

**Activation:** User typed `/pr` or requested to create a PR after finishing a task.

## Objective
자동으로 현재 작업 내역을 브랜치에 커밋하고 GitHub에 푸시한 뒤, Pull Request를 생성합니다.

## Pre-PR Checklist

Before creating a PR, strictly follow these verification steps:

### 1. Update Design Documentation
1. Open `.github/doc-map.yml`
2. For **each file you modified**, find all matching entries in `mappings`
3. Open the corresponding `doc` file(s) and update to reflect your changes:
   - New field / component / behavior → add to the relevant section
   - Changed behavior → update the existing description
   - Removed feature → remove or mark deprecated
4. If no pattern in `doc-map.yml` matches the modified file, update `doc/overview.md`

> Pure bug fixes with no user-visible behavioral change: update the doc only if the fix reveals that a spec was incorrect.

#### Bilingual Requirement / 이중 언어 필수
Every doc file must be written in **both English and Korean**.
Use the following inline bilingual convention throughout:

```markdown
Section body in English.

한국어 설명을 바로 이어서 작성합니다.
```

- Section headings: English only (for anchor consistency with code references).
- Each descriptive paragraph: English first, Korean immediately after (same section, no extra heading).
- Tables: header row in English; add a brief Korean caption line above the table if the purpose is not obvious.
- Code blocks and file/symbol names: always English only.

### 2. Verify Build
- `run_command` 도구를 사용하여 `npm run build`를 실행합니다.
- **에러가 발생할 경우:** 즉시 `.agents/workflows/build-guard.md`를 참고하여 에러의 원인을 파악하고 코드를 수정한 뒤 다시 확인하여 0 에러 상태를 만듭니다.

---

## PR Creation Steps

### 1. Check Git Status
- `git status`를 실행하여 커밋되지 않은 변경사항이 있는지 확인합니다.

### 2. Branch Check & Creation
- 현재 브랜치를 확인합니다 (`git branch --show-current`).
- 만약 현재 브랜치가 `main` 또는 기존 기능과 무관한 브랜치라면, 사용자에게 새 브랜치를 생성할지 물어보거나(예: `feature/xxx`) 작업 맥락에 맞는 새 브랜치를 생성합니다.

### 3. Commit Changes (If any)
- `git add .` (또는 필요한 파일만) 명령을 실행하여 변경사항을 스테이징합니다.
- `git-commit-rules.md`를 참고하여 Conventional Commit 메시지를 작성하고 `git commit`을 실행합니다.

### 4. Push to Remote
- `git push -u origin <current-branch>`를 사용하여 원격 저장소에 푸시합니다.

### 5. Check Existing Pull Request & Create/Update
- `github-mcp-server`의 `list_pull_requests` 도구를 호출하여 현재 브랜치(`head`)로 이미 열려있는(Open 상태) PR이 있는지 확인합니다.
- **이미 열려있는 PR이 있는 경우:**
  - 새로운 커밋은 `git push` 단계에서 기존 PR에 자동으로 반영되므로, PR을 새로 생성하지 않습니다.
  - 사용자에게 기존 PR에 추가 변경사항이 성공적으로 반영되었음을 알립니다.
- **열려있는 PR이 없는 경우:**
  - `github-mcp-server`의 `create_pull_request` 도구를 호출하여 새 PR을 생성합니다.
  - **Parameters:**
    - `owner`: (저장소 소유자)
    - `repo`: (저장소 이름)
    - `title`: PR 제목 (커밋 제목과 유사하게 작성)
    - `body`: 변경사항 요약, 구현한 기능 등을 작성합니다. 이때, 반드시 **`.agents/workflows/build-check.md`** 의 템플릿(마크다운 표 형식)을 참고하여 빌드/린트 검증 통과 내역을 본문에 포함하십시오.
    - `head`: 작업한 브랜치 이름
    - `base`: 병합할 타겟 브랜치 (기본값: `main`)
  - PR이 생성된 직후, 터미널에서 GitHub CLI(`gh`)를 사용하여 해당 PR에 작업자 본인을 Assignee로 할당합니다.
    - 실행 명령어: `gh pr edit <생성된_PR_번호> --add-assignee "@me"`
    - *(참고: GitHub 정책상 PR 작성자 본인을 Reviewer로 지정할 수는 없으므로 Reviewer 할당은 생략합니다.)*

### 6. Report Success
- 성공적으로 PR이 생성되면, 생성된 PR 링크와 함께 사용자에게 완료를 보고합니다.
