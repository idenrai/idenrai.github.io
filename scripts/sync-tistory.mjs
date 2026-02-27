/**
 * scripts/sync-tistory.mjs
 *
 * Tistory (또는 임의의) RSS → Astro content/blog 동기화 스크립트
 * 실행: node scripts/sync-tistory.mjs <tistory-url>
 *   예) node scripts/sync-tistory.mjs https://example.tistory.com
 *       node scripts/sync-tistory.mjs https://example.tistory.com/rss
 * - 이미 존재하는 파일은 건너뜀 (중복 방지)
 * - RSS에서 제공하는 최근 포스트를 가져와 MD 파일로 저장
 */

import Parser from "rss-parser";
import TurndownService from "turndown";
import fs from "fs/promises";
import path from "path";

/** 입력 URL에서 RSS 피드 URL 생성 */
function resolveRssUrl(input) {
  // 이미 /rss 로 끝나면 그대로 사용
  if (/\/rss$/.test(input)) return input;
  // 끝에 /rss 붙이기 (trailing slash 처리)
  return input.replace(/\/$/, "") + "/rss";
}

const rawArg = process.argv[2];
if (!rawArg || rawArg === "--help" || rawArg === "-h") {
  console.log("사용법: node scripts/sync-tistory.mjs <tistory-url>");
  console.log("  예)  node scripts/sync-tistory.mjs https://example.tistory.com");
  process.exit(rawArg ? 0 : 1);
}

const RSS_URL = resolveRssUrl(rawArg);
const OUTPUT_DIR = path.resolve("src/content/blog");

// --- Turndown 설정 ---
const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// Tistory figure/imageblock → Markdown 이미지
turndown.addRule("tistory-image", {
  filter: (node) =>
    node.nodeName === "FIGURE" && node.className?.includes("imageblock"),
  replacement: (_content, node) => {
    const img =
      node.querySelector?.("img") || node.getElementsByTagName?.("img")?.[0];
    if (!img) return "";
    const src = img.getAttribute?.("src") || img.src || "";
    const alt = img.getAttribute?.("data-filename") || "";
    return src ? `\n\n![${alt}](${src})\n\n` : "";
  },
});

// data-ke-size 속성 제거
turndown.addRule("clean-ke", {
  filter: ["p", "h1", "h2", "h3", "h4"],
  replacement: (content, node, options) => {
    // 헤딩 처리
    const level = parseInt(node.nodeName[1]);
    if (level >= 1 && level <= 4) {
      const prefix = "#".repeat(level);
      return `\n\n${prefix} ${content.trim()}\n\n`;
    }
    return `\n\n${content}\n\n`;
  },
});

// --- title → 파일명용 슬러그 ---
function titleToSlug(title) {
  return title
    .trim()
    .replace(/[\s\u3000]+/g, "-")
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/[#%&{}[\]^`~!@$();,]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]|[-.]$/g, "");
}

// --- title + date → 파일명 ---
function makeFileName(title, date) {
  const slug = titleToSlug(title);
  return date ? `${date}-${slug}.md` : `${slug}.md`;
}

// --- 날짜 파싱 ---
function parseDate(dateStr) {
  try {
    return new Date(dateStr).toISOString().split("T")[0];
  } catch {
    return new Date().toISOString().split("T")[0];
  }
}

// --- 카테고리 → 태그 배열 ---
function parseCategories(item) {
  const cats = item.categories || [];
  // 'Tech/Databricks' 같은 경로에서 마지막 부분만 추출
  return cats.map((c) => c.split("/").pop().trim()).filter(Boolean);
}

// --- HTML → Markdown 변환 ---
function htmlToMarkdown(html) {
  if (!html) return "";
  // Tistory 특유의 스타일 속성 제거
  let cleaned = html
    .replace(/\s*data-ke-[^=]+=["'][^"']*["']/g, "")
    .replace(/\s*style=["'][^"']*["']/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/&nbsp;/g, " ");
  return turndown.turndown(cleaned);
}

// --- 메인 ---
async function main() {
  const parser = new Parser({
    customFields: {
      item: [["category", "categories", { keepArray: true }]],
    },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept: "application/rss+xml, application/xml, text/xml, */*",
    },
  });

  console.log(`📡 RSS 피드 가져오는 중: ${RSS_URL}`);
  const feed = await parser.parseURL(RSS_URL);
  console.log(`📰 포스트 ${feed.items.length}개 발견\n`);

  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (const item of feed.items) {
    const date = parseDate(item.pubDate);
    const rawTitle = item.title || "";
    const fileName = makeFileName(rawTitle, date);
    const filePath = path.join(OUTPUT_DIR, fileName);

    // 이미 존재하면 건너뜀
    try {
      await fs.access(filePath);
      console.log(`⏭️  건너뜀 (이미 존재): ${fileName}`);
      skipped++;
      continue;
    } catch {
      // 파일 없음 → 생성
    }

    const tags = parseCategories(item);
    const title = rawTitle.replace(/"/g, '\\"');
    const description = (item.contentSnippet || "")
      .replace(/\n/g, " ")
      .replace(/"/g, '\\"')
      .slice(0, 120);

    const bodyMarkdown = htmlToMarkdown(
      item.content || item["content:encoded"] || "",
    );

    const frontmatter = [
      "---",
      `title: "${title}"`,
      `date: ${date}`,
      description ? `description: "${description}"` : "",
      tags.length ? `tags: [${tags.map((t) => `"${t}"`).join(", ")}]` : "",
      `tistory_url: "${item.link}"`,
      "---",
    ]
      .filter(Boolean)
      .join("\n");

    const fileContent = `${frontmatter}\n\n${bodyMarkdown}\n`;

    await fs.writeFile(filePath, fileContent, "utf-8");
    console.log(`✅ 생성: ${fileName}  [${date}] ${item.title}`);
    created++;
  }

  console.log(`\n🎉 완료! 생성: ${created}개 / 건너뜀: ${skipped}개`);
  if (created > 0) {
    console.log("\n다음 단계:");
    console.log("  npm run build   — 빌드 확인");
    console.log(
      '  git add . && git commit -m "sync: tistory posts" && git push',
    );
  }
}

main().catch((err) => {
  console.error("❌ 오류:", err.message);
  process.exit(1);
});
