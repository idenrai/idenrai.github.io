# Martin Fowler Refactoring Catalog & Smells

Astro 블로그 코드 및 스타일 개선을 위한 리팩토링 카탈로그입니다.

---

## 1. Code Smells Diagnostic

| 스멜 분류 | 증상 | 권장 리팩토링 기법 |
| :--- | :--- | :--- |
| **Bloaters** | 100줄 이상의 거대한 단일 Astro 컴포넌트 | **Extract Component** (UI 카드, 뱃지 등으로 분리) |
| **Dispensables** | 미사용 CSS 클래스, 데드 마크다운 파일 | **Remove Dead Code / Prune Assets** |
| **Duplication** | 여러 페이지에서 동일한 레이아웃/스타일 반복 | **Extract Layout / Shared Component** |
| **Feature Envy** | 포스트 렌더링 로직이 컴포넌트 내에 난립 | **Extract Utility Function** (날짜 포맷터, 태그 파서) |

