---
trigger: always_on
description: "Git 커밋 컨벤션 강제 및 일관된 버전 관리 행동 지침"
---

# Git Commit Rules (커밋 메시지 규약)

**Activation:** This rule is **ALWAYS ON** for all git-related operations.

## Scope

- **대상**: staged 변경사항(`git diff --cached`)만 포함. unstaged 및 미추적 파일은 무시.
- **적용 범위**: Git 사이드바의 Generate 버튼, `/commit` `/commit-ja` 워크플로우 등 모든 git commit 관련 작업.
- staged 변경사항이 없을 경우 커밋 메시지 생성을 중단하고 스테이징을 권유하는 메시지만 반환할 것.

## Format: Conventional Commits

모든 커밋 메시지는 **Conventional Commits** 형식을 엄격히 준수합니다.

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type (항상 영어 사용)

`feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert`

### Description (제목)

- 50자 이내
- 끝에 마침표(`.`)를 붙이지 않음
- 언어는 워크플로우의 지정에 따름 (`/commit` → 영어, `/commit-kr` → 한국어로 변경 필요하지만 기존 워크플로우 명 유지)
- 워크플로우 외(Git 사이드바 Generate 등)의 경우 **영어**를 기본으로 함

### Body (본문, 선택 사항)

- 제목과 본문 사이에 빈 줄 추가
- 변경 이유, 배경, 영향을 간결하게 서술
- 영어의 경우 72자에서 줄 바꿈

## Guardrails (금지 사항)

- ❌ 이모지 사용 금지
- ❌ 슬랭 및 구어체 금지
- ❌ 모호한 표현 금지: `update`, `fix`, `change`, `modify`, `업데이트`, `수정`, `변경`, `대응`, `wip`
- ❌ 메타적인 설명, 도입부, 맺음말 금지 (커밋 메시지 본문만 출력할 것)

## Principles (원칙)

- **1커밋 1변경**: 논리적으로 독립된 변경사항은 분할할 것. 여러 type에 걸칠 경우 분할을 제안할 것.
- **파괴적 변경 (Breaking Change)**: type 뒤에 `!`를 붙일 것 (예: `feat!:`, `fix!:`). footer에 `BREAKING CHANGE:` 기술 가능.
- **출력 형식**: 커밋 메시지 본문만 직접 출력할 것. 사고 과정이나 설명은 일절 포함하지 않음.