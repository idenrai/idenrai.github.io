# Project Guidelines (SSoT)

이 파일은 AI 에이전트가 상황에 맞게 최신 규칙(Rules), 서브에이전트(Subagents), 스킬(Skills), 라이프사이클 훅(Hooks), MCP 도구를 탐색하고 오케스트레이션할 수 있도록 안내하는 Antigravity 2.0 단일 진실 공급원(SSoT) 마스터 라우팅 파일입니다.

---

## 📌 1. Core Rules (항상 준수)
코딩 및 콘텐츠 작성 전반에 적용되는 필수 규칙입니다.
- **프로젝트 아키텍처 & 스택 (Astro Blog):** `.agents/rules/project-context.md`
- **GitHub 커밋 규약 (Conventional Commits):** `.agents/rules/git-commit-rules.md`
- **언어 제어 전략 (100% 한국어 출력):** `.agents/rules/language-strategies.md`
- **시니어 엔지니어 행동 규범 & 인덱싱 의식:** `.agents/rules/senior-engineer-conduct.md`, `.agents/rules/indexing-codebase.md`

---

## 🤖 2. Declarative Subagents (선언형 서브에이전트)
메인 컨텍스트를 오염시키지 않고 독립된 관점과 전용 도구 세트로 백그라운드 작업을 수행하는 서브에이전트입니다.

- **전문 코드 & 콘텐츠 리뷰어 (`code-reviewer`):** `.agents/agents/code-reviewer.md` (Astro 아키텍처, 마크다운 프론트매터, 타이포그래피, 가독성 다각도 감사)
- **품질 게이트 검증자 (`quality-guard`):** `.agents/agents/quality-guard.md` (격리된 환경에서 마크다운 린트 및 Astro 프로덕션 빌드 일괄 검증)

---

## 🛠️ 3. Specialized Modern Skills (모던 스킬 및 슬래시 커맨드)
Antigravity 2.0 사양에 따라 모든 절차는 점진적 공개(Progressive Disclosure)를 준수하는 모듈형 스킬(`.agents/skills/<name>/SKILL.md`)로 구성됩니다.

- **심층 기술 조사 및 원인 규명 (`/deep-dive`):** `.agents/skills/deep-dive/SKILL.md` (Astro 설정 결함 및 패키지 분석)
- **품질 게이트 & 빌드 검증 (`/quality-gate`):** `.agents/skills/quality-gate/SKILL.md` (마크다운 린트 및 Astro 정적 사이트 빌드 일괄 검증)
- **블로그 코드 & 콘텐츠 리뷰 (`/review`, `/code-review`):** `.agents/skills/code-review/SKILL.md` (`code-reviewer` 서브에이전트 위임 및 체크리스트 감사)
- **커밋 메시지 자동 생성 (`/commit`, `/commit-kr`):** `.agents/skills/commit/SKILL.md` (Conventional Commits 한영 규격)
- **문서 동기화 및 PR 자동 생성 (`/pr`):** `.agents/skills/pr/SKILL.md` (`github-mcp-server` 연동)
- **원격 정리된 로컬 브랜치 일괄 정리 (`/prune`):** `.agents/skills/prune/SKILL.md` (`[gone]` 상태 고립 브랜치 감지, 보호 브랜치 보존 및 일괄 안전 삭제)
- **점진적 무중단 리팩토링 (`/refactor`):** `.agents/skills/refactor/SKILL.md` (컴포넌트 및 스타일 모듈화)
- **UI/UX 디자인 및 웹 가이드라인:** `.agents/skills/ui-ux-pro-max/SKILL.md`, `.agents/skills/frontend-design/SKILL.md`, `.agents/skills/web-design-guidelines/SKILL.md`
- **프로젝트 인덱싱 및 지식 컷오프 회피:** `.agents/skills/indexing-awareness/SKILL.md`, `.agents/skills/knowledge-cutoff-awareness/SKILL.md`

---

## 🛡️ 4. Lifecycle Hooks (생명주기 안전 가드)
- **PreToolUse 안전 가드 (`.agents/hooks.json`):**
  - 파괴적 셸 명령(`git push --force`, `git reset --hard`, `rm -rf`, `main` 브랜치 삭제, `--no-verify`)을 사전 차단하는 Node.js 고속 가드 (`.agents/hooks/scripts/block-dangerous-commands.cjs`).

---

## 🔌 5. Model Context Protocol (MCP 서버 연동)
- **GitHub MCP (`github-mcp-server`):** PR 생성, 이슈 조회, 커밋 히스토리 추적.
- **Context7 (`context7`):** Astro, Tailwind CSS, Vite 최신 공식 문서 실시간 교차검증.
- **Sequential Thinking (`sequential-thinking`):** 복잡한 기술적 문제의 다단계 논리 분석 및 가설 검증.
