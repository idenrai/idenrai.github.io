/**
 * scripts/utils.mjs
 * 스크립트 간 공유 유틸리티
 */

/** title → 파일명용 슬러그 */
export function titleToSlug(title) {
  return title
    .trim()
    .replace(/[\s\u3000]+/g, '-')           // 공백(전각 포함) → 하이픈
    .replace(/[<>:"/\\|?*]/g, '')           // Windows 금지 문자 제거
    .replace(/[#%&{}[\]^`~!@$();,]/g, '')   // 그 외 특수문자 제거
    .replace(/\.{2,}/g, '.')                // 연속 점 정리
    .replace(/-{2,}/g, '-')                 // 연속 하이픈 정리
    .replace(/^[-.]|[-.]$/g, '');           // 앞뒤 하이픈/점 제거
}

/** title + date → MD 파일명 (예: 2024-01-01-제목.md) */
export function makeFileName(title, date) {
  const slug = titleToSlug(title);
  return date ? `${date}-${slug}.md` : `${slug}.md`;
}
