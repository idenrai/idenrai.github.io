/** 날짜를 한국어 형식으로 포맷 (예: 2024년 1월 1일) */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
