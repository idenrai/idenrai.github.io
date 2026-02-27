/**
 * scripts/import-backup.mjs
 *
 * Tistory HTML 백업 파일 → Astro content/blog 일괄 변환 스크립트
 * 실행: npm run import-backup
 *
 * 구조:
 *   idenrai-1-1/{번호}/{번호}-제목.html
 */

import TurndownService from "turndown";
import { JSDOM } from "jsdom";
import fs from "fs/promises";
import path from "path";
import { glob } from "glob";
import { titleToSlug, makeFileName } from "./utils.mjs";

const BACKUP_DIR = path.resolve("idenrai-1-1");
const OUTPUT_DIR = path.resolve("src/content/blog");

// ---------------------------------------------------------------------------
// Turndown 설정
// ---------------------------------------------------------------------------
const td = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
  hr: "---",
});

// colorscripter 코드 블록 → ``` 펜스 코드
td.addRule("colorscripter", {
  filter: (node) =>
    node.nodeName === "DIV" && node.className?.includes("colorscripter-code"),
  replacement: (_content, node) => {
    // td 셀에서 실제 코드 텍스트만 추출 (번호 열 제외)
    const codeDiv =
      node.querySelector?.("td:last-child div[style]") ||
      (node.querySelectorAll
        ? Array.from(node.querySelectorAll("td"))[1]
        : null);
    if (!codeDiv) return "";
    const lines = [];
    Array.from(
      codeDiv.querySelectorAll ? codeDiv.querySelectorAll("div") : [],
    ).forEach((div) => {
      lines.push(div.textContent);
    });
    const code = lines
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    return `\n\`\`\`\n${code}\n\`\`\`\n`;
  },
});

// Tistory imageblock figure → Markdown 이미지
td.addRule("tistory-figure", {
  filter: (node) =>
    node.nodeName === "FIGURE" ||
    (node.nodeName === "P" && node.querySelector?.("img")),
  replacement: (_content, node) => {
    const imgNodes = node.querySelectorAll
      ? Array.from(node.querySelectorAll("img"))
      : [];
    if (imgNodes.length === 0) return _content;
    return imgNodes
      .map((img) => {
        const src = img.getAttribute?.("src") || img.src || "";
        const alt =
          img.getAttribute?.("alt") ||
          img.getAttribute?.("data-filename") ||
          "";
        return src ? `\n\n![${alt}](${src})\n\n` : "";
      })
      .join("");
  },
});

// 로컬 img 태그 (백업 파일 내 상대 경로 이미지)
td.addRule("local-img", {
  filter: "img",
  replacement: (_content, node) => {
    const src = node.getAttribute?.("src") || node.src || "";
    const alt =
      node.getAttribute?.("alt") || node.getAttribute?.("data-filename") || "";
    if (!src) return "";
    // 로컬 상대경로 이미지(백업 파일 내)는 빌드 오류 방지를 위해 제외
    if (
      src.startsWith("./") ||
      src.startsWith("../") ||
      (!src.startsWith("http") && !src.startsWith("/"))
    )
      return "";
    return `![${alt}](${src})`;
  },
});

// ---------------------------------------------------------------------------
// 헬퍼
// ---------------------------------------------------------------------------

/** HTML 파일에서 메타데이터 + 본문 추출 */
function parseHtml(html, filePath) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // 폴더 번호 → tistory 포스트 번호
  const folderNum = path.basename(path.dirname(filePath));

  // 제목
  const titleEl = doc.querySelector("h2.title-article");
  const title = titleEl?.textContent?.trim() || "";

  // 날짜
  const dateEl = doc.querySelector("p.date");
  const rawDate = dateEl?.textContent?.trim() || "";
  const date = rawDate ? rawDate.split(" ")[0] : "1970-01-01"; // "YYYY-MM-DD HH:MM:SS" → "YYYY-MM-DD"

  // 카테고리 → 태그 배열
  const catEl = doc.querySelector("p.category");
  const catRaw = catEl?.textContent?.trim() || "";
  const catTags = catRaw
    ? catRaw
        .split("/")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  // 해시태그
  const tagsEl = doc.querySelector("div.tags");
  const tagsRaw = tagsEl?.textContent?.trim() || "";
  const hashTags = tagsRaw
    ? tagsRaw.match(/#([^\s#]+)/g)?.map((t) => t.slice(1).trim()) || []
    : [];

  // 중복 제거한 태그 목록
  const tags = [...new Set([...catTags, ...hashTags])];

  // 본문 HTML
  const contentEl = doc.querySelector("div.contents_style");
  const contentHtml = contentEl?.innerHTML || "";

  return { folderNum, title, date, tags, contentHtml };
}

/** HTML → Markdown */
function toMarkdown(html) {
  if (!html.trim()) return "";
  // 불필요한 속성 정리
  let cleaned = html
    .replace(/\s*data-ke-[^=]+=["'][^"']*["']/g, "")
    .replace(/\s*style=["'][^"']*["']/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/g, " ")
    .replace(/&hellip;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
  let md = td.turndown(cleaned);
  // 연속 빈줄 정리
  md = md.replace(/\n{3,}/g, "\n\n");
  return md.trim();
}

/** frontmatter 생성 */
function makeFrontmatter({ title, date, tags, tistoryNum }) {
  const safeTitle = title.replace(/"/g, '\\"');
  const tagStr = tags.length
    ? `[${tags.map((t) => `"${t}"`).join(", ")}]`
    : "[]";
  return [
    "---",
    `title: "${safeTitle}"`,
    `date: ${date}`,
    `tags: ${tagStr}`,
    `tistory_url: "https://idenrai.tistory.com/${tistoryNum}"`,
    "---",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// 메인
// ---------------------------------------------------------------------------
async function main() {
  // jsdom 설치 확인
  await import("jsdom").catch(() => {
    console.error(
      "❌ jsdom이 없습니다. npm install jsdom --save-dev 실행 후 다시 시도하세요.",
    );
    process.exit(1);
  });

  const files = await glob(`${BACKUP_DIR}/**/*.html`);
  if (files.length === 0) {
    console.error(`❌ HTML 파일을 찾을 수 없습니다: ${BACKUP_DIR}`);
    process.exit(1);
  }
  files.sort();

  console.log(`📂 발견된 HTML 파일: ${files.length}개\n`);
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // 이미 생성된 파일 목록 수집
  const existing = new Set(
    (await fs.readdir(OUTPUT_DIR)).filter((f) => f.endsWith(".md")),
  );

  let created = 0;
  let skipped = 0;
  let errors = 0;

  // 충돌 방지용: 이번 실행에서 생성한 파일명 추적
  const usedNames = new Set(existing);

  for (const filePath of files) {
    const folderNum = path.basename(path.dirname(filePath));

    try {
      const html = await fs.readFile(filePath, "utf-8");
      const { title, date, tags, contentHtml } = parseHtml(html, filePath);

      if (!title) {
        console.warn(`⚠️  제목 없음, 건너뜀: ${path.basename(filePath)}`);
        skipped++;
        continue;
      }

      const slug = titleToSlug(title);
      let fileName = date ? `${date}-${slug}.md` : `${slug}.md`;

      // 충돌 처리
      if (usedNames.has(fileName)) {
        let i = 2;
        const base = fileName.replace(/\.md$/, "");
        while (usedNames.has(`${base}-${i}.md`)) i++;
        fileName = `${base}-${i}.md`;
      }

      // 이미 존재하면 건너뜀
      if (existing.has(fileName)) {
        skipped++;
        continue;
      }
      usedNames.add(fileName);

      const markdown = toMarkdown(contentHtml);
      const frontmatter = makeFrontmatter({
        title,
        date,
        tags,
        tistoryNum: folderNum,
      });
      const fileContent = `${frontmatter}\n\n${markdown}\n`;

      const outPath = path.join(OUTPUT_DIR, fileName);
      await fs.writeFile(outPath, fileContent, "utf-8");

      console.log(`✅ [${date}] ${title}  →  ${fileName}`);
      created++;
    } catch (err) {
      console.error(`❌ 오류 (${path.basename(filePath)}): ${err.message}`);
      errors++;
    }
  }

  console.log(`\n🎉 완료!`);
  console.log(
    `   생성: ${created}개 / 건너뜀: ${skipped}개 / 오류: ${errors}개`,
  );

  if (created > 0) {
    console.log("\n다음 단계:");
    console.log("  npm run build     — 빌드 확인");
    console.log(
      '  git add . && git commit -m "feat: import all tistory posts" && git push',
    );
  }
}

main().catch((err) => {
  console.error("❌ 치명적 오류:", err);
  process.exit(1);
});
