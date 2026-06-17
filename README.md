# idenrai.github.io

도쿄에서 일하는 소프트웨어 엔지니어의 기술 블로그입니다.  
[https://idenrai.github.io](https://idenrai.github.io) · [Tistory 원본](https://idenrai.tistory.com)

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | [Astro](https://astro.build) 4.x (Node.js 24 환경) |
| 스타일링 | [Tailwind CSS](https://tailwindcss.com) 3.x + [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) |
| 디자인 컨셉| Swiss Modernism 2.0 + Terminal 감성 (다크 미니멀리즘, Electric Blue 액센트) |
| 콘텐츠 | Astro Content Collections (MDX 지원) |
| 코드 하이라이트 | [Shiki](https://shiki.matsu.io) (`github-dark` 테마) |
| 배포 | GitHub Actions → GitHub Pages (Tistory 자동 동기화 통합) |
| 폰트 | [Pretendard](https://github.com/orioncactus/pretendard), [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) |

## 개발 명령어

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 (http://localhost:4321)
npm run build        # 정적 빌드 (dist/)
npm run preview      # 빌드 결과 미리보기
```

## 포스트 관리 스크립트

### Tistory RSS 동기화

Tistory 최신 포스트(RSS 기준)를 Astro 콘텐츠로 가져옵니다.

> 💡 **자동화 알림**: 현재 GitHub Actions(`deploy.yml`)를 통해 **매일 자정(KST)** 자동으로 Tistory의 새 글을 가져와 리포지토리에 커밋하고 블로그를 배포하도록 설정되어 있습니다. 수동으로 실행하고 싶을 때만 아래 명령어를 사용합니다.

```bash
node scripts/sync-tistory.mjs <tistory-url>

# 예시
node scripts/sync-tistory.mjs https://idenrai.tistory.com
```

- 이미 존재하는 파일은 스킵 (중복 방지)
- 파일명: `{날짜}-{title-slug}.md`

## 프로젝트 구조

```
src/
├── components/
│   ├── Header.astro       # 상단 네비게이션 (다크모드 토글, 모바일 메뉴)
│   ├── Footer.astro       # 푸터 (GitHub, RSS 링크)
│   └── PostCard.astro     # 블로그 목록 카드
├── content/
│   ├── config.ts          # Content Collection 스키마
│   └── blog/              # 블로그 포스트 MD/MDX 파일
├── layouts/
│   ├── BaseLayout.astro   # HTML 베이스 (SEO, OG태그, 다크모드 초기화)
│   ├── PageLayout.astro   # 일반 페이지 (Header + main + Footer)
│   └── PostLayout.astro   # 블로그 포스트 레이아웃
├── pages/
│   ├── index.astro        # 홈 (Hero, 기술스택, 최근 포스트)
│   ├── about.astro        # 소개
│   ├── 404.astro          # 404 페이지
│   ├── rss.xml.ts         # RSS 피드
│   └── blog/
│       ├── index.astro    # 포스트 목록 (태그 필터)
│       └── [slug].astro   # 포스트 상세
├── styles/
│   └── global.css         # 전역 스타일 (Tailwind 커스텀 컴포넌트)
└── utils/
    └── date.ts            # 날짜 포맷 유틸리티
scripts/
├── utils.mjs              # 공유 유틸 (titleToSlug, makeFileName)
├── sync-tistory.mjs       # Tistory RSS 동기화
└── import-backup.mjs      # HTML 백업 일괄 변환
.github/
└── workflows/
    └── deploy.yml         # GitHub Actions 자동 배포
```

## 새 포스트 작성 및 예약 발행

`src/content/blog/` 에 MD 또는 MDX 파일을 추가합니다.

```markdown
---
title: "포스트 제목"
date: 2024-01-01
tags: ["Tech", "Python"]
description: "포스트 요약 (선택)"
draft: false
---

본문 내용...
```

- 파일명 규칙: `{YYYY-MM-DD}-{제목-슬러그}.md`
- **예약 발행**: `draft: true`로 설정하거나 `date`를 **미래의 날짜**로 지정하면 빌드 시 목록에서 자동으로 숨겨집니다. 해당 날짜가 지나고 매일 자정에 도는 GitHub Actions 스케줄러가 작동할 때 자동으로 공개됩니다.

## 자동화 및 배포

- **자동 배포**: `master` 브랜치에 코드를 push하면 GitHub Actions가 즉시 빌드 후 GitHub Pages에 배포합니다.
- **Tistory 연동**: 매일 자정, Tistory RSS에서 새 글을 확인해 자동으로 GitHub 저장소에 커밋한 후 블로그를 배포합니다. (Tistory에 글을 쓰기만 하면 별도 작업 없이 연동됨)

> **최초 설정 시**: GitHub 저장소 Settings → Pages → Source를 **"GitHub Actions"** 로 변경해야 합니다.

## 관련 링크

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
