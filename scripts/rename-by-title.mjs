/**
 * scripts/rename-by-title.mjs
 *
 * src/content/blog/ 내 MD 파일을 frontmatter의 title 기반으로 rename
 * 형식: {date}-{title-slug}.md
 * 실행: node scripts/rename-by-title.mjs
 */

import fs from 'fs/promises';
import path from 'path';

const BLOG_DIR = path.resolve('src/content/blog');

/** frontmatter에서 title, date 추출 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = match[1];
  const titleMatch = fm.match(/^title:\s*["']?(.*?)["']?\s*$/m);
  const dateMatch = fm.match(/^date:\s*(\S+)/m);
  return {
    title: titleMatch?.[1]?.trim() || '',
    date: dateMatch?.[1]?.trim().split('T')[0] || '',
  };
}

/** title → 파일명용 슬러그 */
function titleToSlug(title) {
  return title
    .trim()
    .replace(/[\s　]+/g, '-')           // 공백(전각 포함) → 하이픈
    .replace(/[<>:"/\\|?*]/g, '')       // Windows 금지 문자 제거
    .replace(/[#%&{}[\]^`~!@$();,]/g, '') // 그 외 특수문자 제거
    .replace(/\.{2,}/g, '.')            // 연속 점 정리
    .replace(/-{2,}/g, '-')             // 연속 하이픈 정리
    .replace(/^[-.]|[-.]$/g, '');       // 앞뒤 하이픈/점 제거
}

async function main() {
  const files = (await fs.readdir(BLOG_DIR)).filter((f) => f.endsWith('.md'));
  files.sort();

  let renamed = 0;
  let skipped = 0;
  let errors = 0;

  // 충돌 방지용: 새 파일명 목록 추적
  const usedNames = new Set();

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const content = await fs.readFile(filePath, 'utf-8');
    const { title, date } = parseFrontmatter(content);

    if (!title) {
      console.warn(`⚠️  title 없음, 건너뜀: ${file}`);
      skipped++;
      continue;
    }

    const slug = titleToSlug(title);
    if (!slug) {
      console.warn(`⚠️  slug 생성 실패, 건너뜀: ${file} (title: "${title}")`);
      skipped++;
      continue;
    }

    let newName = date ? `${date}-${slug}.md` : `${slug}.md`;

    // 충돌 처리: 같은 이름이 이미 있으면 뒤에 -2, -3 붙이기
    if (usedNames.has(newName.toLowerCase()) || (newName !== file && files.includes(newName))) {
      let i = 2;
      const base = newName.replace(/\.md$/, '');
      while (usedNames.has(`${base}-${i}.md`.toLowerCase())) i++;
      newName = `${base}-${i}.md`;
    }
    usedNames.add(newName.toLowerCase());

    if (newName === file) {
      skipped++;
      continue;
    }

    const newPath = path.join(BLOG_DIR, newName);
    try {
      await fs.rename(filePath, newPath);
      console.log(`✅ ${file}  →  ${newName}`);
      renamed++;
    } catch (err) {
      console.error(`❌ 오류 (${file}): ${err.message}`);
      errors++;
    }
  }

  console.log(`\n🎉 완료! 변환: ${renamed}개 / 건너뜀: ${skipped}개 / 오류: ${errors}개`);
}

main().catch((err) => {
  console.error('❌ 치명적 오류:', err);
  process.exit(1);
});
