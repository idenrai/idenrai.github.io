---
name: pr
description: Automates pull request creation with staged logical commits and GitHub MCP server integration (create_pull_request, issue closing).
---

# Pull Request Automation (PR 자동화 및 이슈 연동)

**트리거:** `/pr` (포스팅 또는 코드 수정 완료 후 PR 생성 및 이슈 연동 시)

이 스킬은 작업 완료 후 변경사항 검증, 단계적 커밋 분할, 그리고 **GitHub MCP 서버(`github-mcp-server`)** 또는 `gh` CLI를 통한 고품질 PR 생성 프로토콜입니다.

---

## 1. 사전 검증
1. **품질 게이트 검증**:
   - `./.agents/skills/quality-gate/scripts/verify-all.sh` (마크다운 린트 및 Astro 빌드) 100% 통과 확인.
2. **논리적 커밋 분할**:
   - Conventional Commits 형식으로 단계를 나누어 커밋합니다.

---

## 2. GitHub MCP 도구 기반 PR 생성
1. **원격 푸시**:
   - 작업 브랜치를 푸시합니다 (`git push -u origin <branch-name>`).
2. **Pull Request 생성**:
   - `create_pull_request` MCP 도구를 호출하거나 `gh pr create`를 실행합니다:
     - **제목**: `type(scope): 한국어 설명`
     - **본문**: 100% 한국어로 개요, 세부 변경사항, 검증 결과를 마크다운으로 상세 작성.

