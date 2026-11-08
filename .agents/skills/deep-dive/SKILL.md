---
name: deep-dive
description: 복잡한 버그, 아키텍처 결함, 라이브러리 선정, 트레이드오프 분석 시 Context7 공식 문서 교차검증과 Sequential Thinking 논리 전개를 결합하여 심층 원인을 규명하고 기술 조사를 수행하는 스킬
---

# Deep Dive (심층 기술 조사 및 원인 분석)

**트리거:** `/deep-dive` (Astro 설정 결함, 빌드 실패 근본 원인 규명, 블로그 아키텍처 개선 시)

이 스킬은 단순한 태스크 계획 수립을 넘어, **복잡한 기술적 문제의 근본 원인을 규명하고 공식 문서를 교차검증하며 시스템적 영향을 분석**하는 심층 조사 프로토콜입니다.

---

## 1. 다각도 심층 조사
- **근본 원인 추적**: Astro 빌드 오류, MDX 파서 에러, 폰트/스타일 로딩 이슈의 데이터 흐름 역추적.
- **Context7 공식 문서 검증**: Astro 4, Tailwind CSS, Vite 등 연관 패키지 최신 공식 명세를 Context7 MCP 도구(`resolve-library-id`, `query-docs`)로 교차 검증.

---

## 2. 순차적 논리 전개 (Sequential Thinking)
- Sequential Thinking MCP 도구로 4단계 다단계 분석 진행: 문제 정의 -> 가설 수립 -> 트레이드오프 평가 -> 해결책 도출.

