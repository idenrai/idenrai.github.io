# Code & Content Review Checklists for idenrai.github.io

Astro 블로그 포스팅 및 컴포넌트 코드 리뷰 시 검토하는 상세 항목 기준서입니다.

---

## 1. Markdown & Content Integrity 체크리스트
- [ ] **Frontmatter**: 포스트 상단에 `title`, `description`, `pubDate`, `tags`가 올바른 형식으로 기재되었는가?
- [ ] **Markdown Rules**: 제목 계층(`h1` -> `h2` -> `h3`)이 건너뛰지 않고 순차적인가?
- [ ] **Code Blocks**: 코드 블록에 언어 태그(예: `ts`, `bash`, `python`)가 명시되었는가?
- [ ] **Images & Links**: 첨부 이미지의 상대 경로가 유효하며 `alt` 텍스트가 작성되었는가?

---

## 2. Astro Component & Styling 체크리스트
- [ ] **Zero JS by Default**: 정적 콘텐츠 영역에 불필요한 클라이언트 사이드 프레임워크 스크립트가 로드되지 않는가?
- [ ] **Typography**: `prose` 클래스와 Tailwind Typography 스타일이 가독성 높게 유지되는가?
- [ ] **Mobile Responsive**: 모바일 화면에서 코드 블록 및 테이블이 화면을 뚫고 나가지 않는가?

