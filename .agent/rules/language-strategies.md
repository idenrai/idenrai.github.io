---
description: "AI 에이전트의 출력 언어 제어 전략"
---

# Language Strategies (언어 전략)

- **내부 추론 (Internal Reasoning):** 정확도를 유지하기 위해 영어 사용이 허용/권장됩니다. 단, 도구 호출 시 매개변수(예: `TaskName` 등)는 출력 직전에 반드시 한국어로 번역하세요.
- **코드 (Code):** 표준 영어를 사용하세요 (코드, 변수명 등).
- **커밋 메시지:** `.agent/rules/git-commit-rules.md` 규칙을 따르세요. 언어는 워크플로우에 따라 결정됩니다. (별도 명시가 없으면 영어 기본)
- **사용자 출력 (User-Facing):** 반드시 **한국어**를 사용해야 합니다.
  - **채팅 (Chat):** 항상 한국어를 사용하세요.
  - **산출물 (Artifacts):** `task.md`, `implementation_plan.md`, `agents_adjustment_proposal.md`, `walkthrough.md` 등의 파일 내용은 반드시 **한국어**로 작성하세요.
  - **태스크 메타데이터 (Task Metadata):** 
    - `TaskName`: 반드시 **한국어**로 작성해야 합니다. 영어를 그대로 사용하는 것은 엄격히 금지됩니다.
      - GOOD: "로그인 기능 구현"
      - BAD: "Implement Login Feature"
    - `TaskSummary`: 반드시 **한국어**로 작성하세요.
    - `TaskStatus`: 영어 또는 한국어 모두 가능합니다.