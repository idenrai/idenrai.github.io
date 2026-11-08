---
name: refactor
description: Applies Martin Fowler refactoring patterns from folder structure down to micro-functions, maintaining behavior preservation and green test baselines.
---

# Refactoring & Code Quality (안전한 무중단 점진적 리팩토링)

**트리거:** `/refactor` (컴포넌트 리팩토링, 마크다운 구조 개선, 스타일 정리 시)

이 스킬은 기존 렌더링 동작을 100% 보존하면서 코드베이스의 구조와 가독성을 개선하는 런북입니다.

---

## 1. 4대 철칙
1. **기능 보존 (Behavior Preservation)**: 레이아웃 및 렌더링 결과는 완전히 유지하고 코드 구조만 개선합니다.
2. **그린 베이스라인 (No Refactor on Red)**: 착수 전 `verify-all.sh` 통과 상태를 먼저 확인합니다.
3. **이동/수정 커밋 분리**: 파일 이동 시 `git mv`를 사용하여 커밋 히스토리를 보존합니다.
4. **점진적 실행**: 단계별 검증 및 원자적 커밋을 진행합니다.

---

## 2. 6단계 파이프라인
1. **Baseline Check**: 마크다운 린트 및 Astro 빌드 통과 확인.
2. **Smell Diagnostic**: [리팩토링 카탈로그](./references/refactoring-catalog.md) 참조.
3. **Plan & Mapping**: 변경 영향 범위 파악.
4. **Staged Execution**: Astro 컴포넌트 추출 및 스타일 모듈화.
5. **Verification Proof**: 빌드 검증으로 렌더링 이상 유무 확인.
6. **SSoT Sync**: 문서 및 내보내기 동기화.

