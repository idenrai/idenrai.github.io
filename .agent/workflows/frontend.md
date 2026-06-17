---
description: 프론트엔드 UI/UX 컴포넌트 신규 생성, 수정 및 리팩토링
---

# Frontend Engineering Workflow

**Activation:** `/frontend` (또는 UI/UX 컴포넌트, 페이지, 훅, 스토어 등의 신규 생성 및 수정을 진행할 때)

이 워크플로우는 프론트엔드와 관련된 생성, 수정, 리팩토링, 디자인 개선의 모든 라이프사이클에 적용되는 마스터 가이드라인입니다.

## 1. Visual Design & UI/UX (필수 준수)
- **컴포넌트 수정 및 생성 시:** 기존 프로젝트의 톤앤매너(Zinc/Black 기반 다크 미니멀리즘, 터미널 감성의 모노스페이스 배지 등) 일관성을 엄격히 유지합니다.
- **반응형 검증:** 항상 모바일 우선(Mobile-first) 레이아웃을 고려하며, 필요 시 Tailwind의 반응형 유틸리티(`md:`, `lg:`)를 적극 활용하여 여백과 크기를 세밀하게 조정합니다.
- UI/UX 변경 시 항상 `.agents/skills/ui-ux-pro-max/SKILL.md`와 `.agents/skills/frontend-design/SKILL.md`를 우선 참조하여 퀄리티 컨트롤을 적용합니다.
- 피해야 할 패턴: 일반적인 AI 템플릿(어두운 회색에 형광색 액센트, 세리프 폰트 남용 등)을 피하고 의도적이고 독창적인 디자인 결정을 내립니다.
- UI 텍스트 작성 시 '디자인 속 글쓰기' 가이드(능동태, 명확한 동사, 일관성 있는 사이니지)를 준수합니다.

## 2. Component Structure & Modification
- 모든 컴포넌트는 Functional Component 구조의 훅(Hooks) 패턴으로만 작성합니다.
- Tailwind CSS v4 유틸리티 클래스만 사용하여 스타일링하며, 인라인 스타일(`style={{}}`)은 특별히 동적인 렌더링을 제외하고는 사용하지 않습니다.
- 내부 임포트 경로는 상대 경로 대신 항상 `@/` 별칭(Alias)을 사용합니다.

## 3. Component Scaffolding (신규 생성 시)
새로운 파일을 생성할 때는 다음 구조 규칙을 따릅니다:
- **File placement & naming**
  - Reusable primitive: `src/components/common/PascalCase.tsx`
  - Feature component: `src/components/<feature>/PascalCase.tsx`
  - Page (route): `src/pages/PascalCase.tsx`
  - Custom hook: `src/hooks/useCamelCase.ts`
  - Zustand store: `src/stores/use<Domain>Store.ts`
  - Utility function: `src/utils/camelCase.ts`
- **Barrel Exports:** 새로운 파일을 생성한 후, 동일 디렉토리 내의 `index.ts`를 반드시 업데이트합니다 (예: `export { MyComponent } from "./MyComponent";`).

## 4. i18n 동기화 (다국어 지원)
컴포넌트 생성 또는 수정 과정에서 사용자에게 노출되는 문자열(User-visible strings)이 포함되거나 변경될 경우:
1. 관련된 모든 다국어 문자열 키를 식별합니다.
2. `src/i18n/types.ts` 파일에 키를 추가하거나 업데이트합니다.
3. 4개의 로캘 파일(`ko.ts`, `en.ts`, `ja.ts`, `de.ts`)의 정확히 동일한 상대적 위치에 번역을 추가합니다.
