---
name: code-review
description: Audits recent git changes for Astro blog architecture, Markdown frontmatter, typography, and styling using the code-reviewer subagent or checklists.
---

# Code & Content Review (블로그 코드 및 콘텐츠 리뷰)

**트리거:** `/review` 또는 `/code-review` (블로그 포스팅, Astro 컴포넌트, 스타일 변경 시)

이 스킬은 idenrai.github.io의 콘텐츠와 소스코드를 객관적으로 감사하기 위한 런북입니다.

---

## 1. 대상 자동 식별 (Target Identification)
1. `git status` 및 `git diff --name-only` (또는 `git diff --cached --name-only`)를 확인하여 대상 마크다운 파일 및 컴포넌트를 확정합니다.

---

## 2. 서브에이전트 위임 또는 직접 리뷰 실행
- **서브에이전트 위임 (권장)**:
  - `code-reviewer` 서브에이전트를 호출합니다:
    `invoke_subagent(TypeName: "code-reviewer", Role: "Code Reviewer", Prompt: "Review the recent markdown and Astro changes...")`
- **직접 리뷰 수행 시**:
  - [상세 체크리스트](./references/review-checklists.md)를 기준으로 프론트매터, 마크다운 린트, 가독성, 반응형 스타일을 점검합니다.

---

## 3. 출력 형식
1. **Executive Summary**: 변경 범위 요약 및 전반적 품질 등급 (A/B/C/F)
2. 🔴 **Critical Blockers**: 빌드 에러, 잘못된 프론트매터, 깨진 링크
3. 🟡 **Suggestions**: 가독성, SEO, 마크다운 포맷 개선안
4. 🟢 **Good Patterns**: 모범 사례

