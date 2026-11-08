---
name: commit
description: 스테이징된 변경사항(git diff --cached)을 분석하여 Conventional Commits 표준 형식의 고품질 커밋 메시지를 생성하는 스킬
---

# Git Commit Message Generator

**트리거:** `/commit` (영어 커밋 메시지 생성) 또는 `/commit-kr` (한국어 커밋 메시지 생성)

이 스킬은 스테이징된 변경사항(`git diff --cached`)을 분석하여 프로젝트 규약에 부합하는 Conventional Commits 메시지를 생성합니다.

---

## 1. 사전 확인
1. `git diff --cached`를 실행하여 스테이징된 변경사항이 있는지 확인합니다.
2. 스테이징된 파일이 없다면 `git status`를 확인하고 사용자에게 커밋할 파일 스테이징을 권유합니다.

---

## 2. 메시지 생성 원칙
- **형식:** `<type>[optional scope]: <description>`
- **Type (영어 고정):** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert`
- **Description:** 50자 이내, 마침표(`.`) 미사용.
- **본문:** 변경 배경 및 영향을 간결하게 서술.
- **출력:** 잡담이나 인사말 없이 커밋 메시지 본문만 단독 출력.

