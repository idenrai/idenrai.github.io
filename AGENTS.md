# Project Guidelines (SSoT)

이 파일은 AI 에이전트가 상황에 맞게 적절한 규칙과 워크플로우를 참조할 수 있도록 라우팅하는 마스터 파일입니다.

## 📌 Core Rules (항상 준수)
코딩 전반에 적용되는 필수 규칙입니다. 코드 작성 전 반드시 다음 파일들을 확인하세요.
- 프로젝트 전체 아키텍처 및 스택: `.agents/rules/project-context.md` 읽기
- 프로젝트 보안 및 데이터 취급 원칙: `.agents/rules/security.md` 읽기
- React/TypeScript/스타일링/Zustand 코딩 표준: `.agents/rules/react-typescript.md` 읽기
- GitHub 커밋 규칙: `.agents/rules/git-commit-rules.md` 읽기
- **오픈소스 스킬 탐색 (필수):** 새로운 지시를 받으면, 코딩이나 계획 수립에 앞서 `npx skills find [키워드]` 명령어로 필요한 도구나 가이드라인(Skill)이 있는지 검색하세요. 적합한 스킬이 발견되면 `npx skills add <package> -y`를 통해 프로젝트에 설치 및 적용한 후 작업을 진행하세요.

## 🔄 Workflows (상황별 참조 트리거)
특정 작업이나 상황이 발생했을 때, 해당하는 워크플로우나 에이전트 지침을 로드하세요.

- **프론트엔드(UI/UX) 컴포넌트 신규 생성, 수정 및 리팩토링 시 (/frontend):** `.agents/workflows/frontend.md` 읽기
- **백엔드(Node.js/API) 아키텍처 설계, API 개발 및 리팩토링 시 (/backend):** `.agents/workflows/backend.md` 읽기
- **번역 키 추가 및 다국어(i18n) 작업 시:** `.agents/workflows/i18n-sync.md` 및 `.agents/workflows/i18n-audit.md` 읽기
- **빌드 검토 및 오류 해결 시:** `.agents/workflows/build-guard.md` 및 `.agents/workflows/build-check.md` 읽기
- **단위 테스트 작성 및 검증 시:** `.agents/workflows/test-writer.md` 읽기
- **Yahoo Finance API 연동 및 수정 시:** `.agents/skills/yahoo-finance/SKILL.md` 읽기
- **코드 리뷰 요청 시:** `.agents/workflows/review.md` 읽기
- **한국어 커밋 메시지 작성 시:** `.agents/workflows/commit-kr.md` 읽기
- **영어 커밋 메시지 작성 시:** `.agents/workflows/commit.md` 읽기
- **기능 구현 전 계획 수립 및 복잡한 문제의 심층 분석 시 (/plan):** `.agents/workflows/plan.md` 읽기
- **기존 코드 파악 및 종속성 분석 시:** `.agents/workflows/grasp.md` 읽기
- **코드 및 개념 설명 요청 시:** `.agents/workflows/explain.md` 읽기
- **코드 수정 없이 순수 상담 및 질문 요청 시 (/ask):** `.agents/workflows/ask.md` 읽기
- **GitHub 이슈 기반 버그 수정 및 자동 PR 시 (/solve-issue):** `.agents/workflows/solve-issue.md` 읽기
- **작업 완료 후 PR 자동 생성 시 (/pr):** `.agents/workflows/pr.md` 읽기
- **현재 세션을 요약하고 파기할 시 (/discard):** `.agents/workflows/discard.md` 읽기
- **원격에서 삭제된 로컬 브랜치 일괄 정리 시 (/prune):** `.agents/workflows/prune.md` 읽기

## 🛠 Skills (도구 및 스킬)
AI가 특정 도구나 기능이 필요할 때 로드하세요.
- 프로젝트 인덱싱 및 컨텍스트 파악 필요 시: `.agents/skills/indexing-awareness/SKILL.md` 읽기
- 현재 날짜 및 시간 파악 필요 시 (지식 컷오프 회피): `.agents/skills/knowledge-cutoff-awareness/SKILL.md` 읽기
- **UI/UX 설계 및 프론트엔드 디자인 기획 시:** `.agents/skills/ui-ux-pro-max/SKILL.md` 및 `.agents/skills/frontend-design/SKILL.md` 읽기
- **디자인 가이드라인 준수 여부 및 시각적 버그 감사 시:** `.agents/skills/web-design-guidelines/SKILL.md`, `.agents/skills/agent-browser/SKILL.md`, `.agents/skills/before-and-after/SKILL.md` 적극 활용