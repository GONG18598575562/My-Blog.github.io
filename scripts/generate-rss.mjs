import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, '..', 'posts');
const distDir = join(__dirname, '..', 'dist');

const SITE_URL = 'https://gong18598575562.github.io/My-Blog.github.io/';
const SITE_NAME = 'ThinkCraft';
const SITE_DESC = '关于思考与创新的个人博客';

function parseFrontmatter(raw) {
  const match = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  let data = {};
  try {
    const loaded = yaml.load(match[1]);
    if (loaded && typeof loaded === 'object') data = loaded;
  } catch (e) {
    console.error(`[rss] frontmatter YAML 解析失败：`, e);
  }
  return { data, content: match[2] };
}

function deriveExcerpt(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#+\s.*$/gm, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 200);
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRSS() {
  const files = readdirSync(postsDir).filter(f => f.endsWith('.md') && !f.startsWith('_'));
  const items = [];

  for (const file of files) {
    const raw = readFileSync(join(postsDir, file), 'utf-8');
    const { data, content } = parseFrontmatter(raw);

    if (!data.title || !data.date || !data.category || !data.tags) {
      console.warn(`[rss] ${file} 缺少必填字段，已跳过`);
      continue;
    }

    const slug = file.replace(/\.md$/i, '');
    const excerpt = data.excerpt ? String(data.excerpt) : deriveExcerpt(content);
    const date = new Date(data.date).toUTCString();
    const link = `${SITE_URL}#/posts/${slug}`;

    items.push({
      title: escapeXml(String(data.title)),
      link,
      category: escapeXml(String(data.category)),
      pubDate: date,
      description: escapeXml(excerpt),
    });
  }

  // 按日期倒序
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>zh-CN</language>
    <atom:link href="${SITE_URL}rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.map(item => `    <item>
      <title>${item.title}</title>
      <link>${item.link}</link>
      <category>${item.category}</category>
      <pubDate>${item.pubDate}</pubDate>
      <description>${item.description}</description>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`).join('\n')}
  </channel>
</rss>`;

  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
  writeFileSync(join(distDir, 'rss.xml'), rss, 'utf-8');
  console.log(`[rss] 已生成 RSS 订阅文件 → dist/rss.xml (${items.length} 篇文章)`);
}

generateRSS();
