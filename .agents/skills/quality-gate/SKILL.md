---
name: quality-gate
description: 마크다운 린트(markdownlint) 및 Astro 정적 사이트 빌드를 일괄 검증하는 품질 게이트 스킬
---

# Quality Gate (Astro 블로그 통합 품질 게이트)

**트리거:** `/quality-gate` (포스팅 커밋 전 마크다운 린트 및 Astro 빌드 검증 시)

이 스킬은 idenrai.github.io의 마크다운 콘텐츠 린트와 Astro 정적 사이트 빌드를 일괄 검증하는 런북입니다.

---

## 1. 품질 검증 파이프라인 실행
```bash
./.agents/skills/quality-gate/scripts/verify-all.sh
```

- **1단계**: 마크다운 린트 (`npm run lint:md`)
- **2단계**: Astro 프로덕션 정적 빌드 (`npm run build`)

---

## 2. 서브에이전트 위임 (옵션)
`invoke_subagent(TypeName: "quality-guard", Role: "Quality Guard", Prompt: "Run verify-all.sh and analyze any markdown/build failures")`

