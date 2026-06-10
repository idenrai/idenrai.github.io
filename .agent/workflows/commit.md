---
description: 커밋 메시지 생성 (영어)
---

# Commit Message Generator (영어)

**트리거:** `/commit`

**설명:**
스테이징된 변경사항으로부터 Conventional Commits 형식의 커밋 메시지를 **영어**로 생성합니다.

> **참고:** 이 워크플로우는 git 상태를 읽지만 파일을 수정하지는 않습니다.
> 모든 커밋 규칙은 `.agent/rules/git-commit-rules.md`에 정의되어 있습니다.

---

## 1. 스테이징된 변경사항 분석 (Analyze Staged Changes)
- **목적:** 무엇이 변경되었는지 파악합니다.
- **액션:**
  - `git diff --cached`를 실행하여 스테이징된 변경사항을 검사합니다.
  - **스테이징된 변경사항이 없는 경우:** "스테이징된 변경사항이 없습니다. 먼저 파일을 스테이징해 주세요."라고 답하고 중지합니다.
  - 논리적인 변경 단위(수정된 파일, 추가, 삭제)를 식별합니다.

## 2. 변경 유형 분류 (Classify Change Type)
- **목적:** 적절한 Conventional Commits 유형을 결정합니다.
- **액션:**
  - 가장 정확한 유형을 선택합니다: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert`.
  - **변경사항이 여러 유형에 걸쳐 있는 경우:** 생성하기 전에 별도의 커밋으로 분할할 것을 제안합니다.

## 3. 커밋 메시지 생성 (Generate Commit Message)
- **목적:** 바로 사용할 수 있는 커밋 메시지를 생성합니다.
- **액션:**
  - `.agent/rules/git-commit-rules.md`의 모든 규칙을 따릅니다.
  - **언어:** 영어.
  - **Description (제목):** 명령문(Imperative mood), 현재 시제 사용, 첫 글자 대문자, 최대 50자, 끝에 마침표 없음.
  - **Body (본문, 선택 사항):** 빈 줄 이후에 이유와 영향을 설명합니다. 72자에서 줄 바꿈합니다.

---

**출력 규칙:**
- 커밋 메시지 텍스트(복사 준비 완료 상태)만 출력합니다.
- 메타 설명, 도입부, 부연 설명, 사고 과정은 일절 금지됩니다.
- 예시:
  ```
  feat(auth): add OAuth2 login endpoint

  Implement secure authentication flow with refresh tokens.
  Includes validation middleware and error responses.
  ```
