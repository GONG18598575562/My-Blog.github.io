import yaml from 'js-yaml';

export interface Tag {
  name: string;
  slug: string;
  color: string;
  postCount: number;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  subcategory?: string;
  tags: string[];
  cover?: string;
  viewCount?: number;
  readingTime?: number;
}

// 构建时由 Vite 把 ../../posts/*.md 全部作为原始字符串打包进来。
// 新增/修改/删除 md 文件后重新构建即可，无需再动这里的代码。
const modules = import.meta.glob('../../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// 极简 frontmatter 解析：匹配文件开头的 --- ... --- 块，剩余部分作为正文
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  let data: Record<string, unknown> = {};
  try {
    const loaded = yaml.load(match[1]);
    if (loaded && typeof loaded === 'object') data = loaded as Record<string, unknown>;
  } catch (err) {
    console.error('[posts] frontmatter YAML 解析失败：', err);
  }
  return { data, content: match[2] };
}

function formatDate(value: unknown): string {
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(value).trim();
}

function toArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim());
  if (value == null || value === '') return [];
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function deriveExcerpt(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, '') // 去代码块
    .replace(/^#+\s.*$/gm, '') // 去标题
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // 去图片
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // 链接只留文字
    .replace(/[*_`>#-]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 100);
}

// 把 markdown 中 /images/... 或 images/... 形式的图片路径改写成
// 带 Vite BASE_URL 前缀的绝对路径，这样部署到 GitHub Pages 子路径
// (/My-Blog.github.io/) 下也能正确加载。用户在 md 里始终写 /images/xxx.jpg 即可。
function rewriteAssetUrls(content: string): string {
  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  if (normalizedBase === '/') return content; // 根路径部署无需改写

  // ![alt](/images/foo.jpg) → ![alt](/My-Blog.github.io/images/foo.jpg)
  // ![alt](images/foo.jpg)  → 同上（容忍少写一个斜杠）
  // <img src="/images/..."> 也一并处理
  return content
    .replace(/(!\[[^\]]*\]\()\s*\/?(images\/[^)\s]+)(\s*\))/g, `$1${normalizedBase}$2$3`)
    .replace(/(<img\b[^>]*\bsrc=["'])\s*\/?(images\/[^"']+)(["'])/gi, `$1${normalizedBase}$2$3`);
}

function loadPosts(): Post[] {
  const result: Post[] = [];
  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? '';
    // 以 _ 开头的文件（例如 _TEMPLATE.md）跳过，不当作文章
    if (filename.startsWith('_')) continue;

    const slug = filename.replace(/\.md$/i, '');
    const { data, content } = parseFrontmatter(raw);

    const missing: string[] = [];
    if (!data.title) missing.push('title');
    if (!data.date) missing.push('date');
    if (!data.category) missing.push('category');
    if (!data.tags) missing.push('tags');
    if (missing.length > 0) {
      console.warn(`[posts] ${filename} 缺少必填字段 (${missing.join(', ')})，已跳过`);
      continue;
    }

    const excerpt = data.excerpt ? String(data.excerpt) : deriveExcerpt(content);
    // 图片路径统一改写：/images/foo.jpg → {BASE_URL}images/foo.jpg
    const processedContent = rewriteAssetUrls(content);
    const rawCover = data.cover ? String(data.cover) : undefined;
    const cover = rawCover
      ? rawCover.replace(/^\/?(images\/)/, `${import.meta.env.BASE_URL || '/'}$1`)
      : undefined;

    result.push({
      slug,
      title: String(data.title),
      date: formatDate(data.date),
      category: String(data.category),
      subcategory: data.subcategory ? String(data.subcategory) : undefined,
      tags: toArray(data.tags),
      excerpt,
      content: processedContent,
      cover,
      viewCount: typeof data.viewCount === 'number' ? data.viewCount : undefined,
      readingTime: typeof data.readingTime === 'number' ? data.readingTime : undefined,
    });
  }
  // 按日期倒序（新文章在前）
  return result.sort((a, b) => b.date.localeCompare(a.date));
}

export const posts: Post[] = loadPosts();

// 获取所有分类
export function getCategories(): string[] {
  return [...new Set(posts.map((p) => p.category))];
}

// 获取所有标签（带颜色和计数）
export function getTags(): Tag[] {
  const tagMap = new Map<string, { count: number }>();
  posts.forEach((p) =>
    p.tags.forEach((t) => {
      const existing = tagMap.get(t);
      if (existing) {
        existing.count++;
      } else {
        tagMap.set(t, { count: 1 });
      }
    })
  );

  // 预定义标签颜色
  const tagColors: Record<string, string> = {
    介绍: '#3B82F6',
    开始: '#8B5CF6',
    React: '#06B6D4',
    JavaScript: '#F59E0B',
    前端: '#10B981',
    CSS: '#EC4899',
    Tailwind: '#06B6D4',
    静态网站: '#8B5CF6',
    Astro: '#F97316',
    Web: '#6366F1',
    Vite: '#8B5CF6',
    构建工具: '#14B8A6',
    日常: '#F59E0B',
    思考: '#EC4899',
  };

  const defaultColors = [
    '#3B82F6',
    '#8B5CF6',
    '#06B6D4',
    '#10B981',
    '#F59E0B',
    '#EC4899',
    '#6366F1',
    '#F97316',
  ];

  return Array.from(tagMap.entries()).map(([name, { count }], index) => ({
    name,
    slug: name,
    color: tagColors[name] || defaultColors[index % defaultColors.length],
    postCount: count,
  }));
}

// 根据 slug 获取文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

// 根据分类筛选文章
export function getPostsByCategory(category: string): Post[] {
  return posts.filter((p) => p.category === category);
}

// 根据标签筛选文章
export function getPostsByTag(tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag));
}

// 获取子分类列表（带计数）
export function getSubcategories(category: string): { name: string; count: number }[] {
  const subMap = new Map<string, number>();
  posts
    .filter((p) => p.category === category && p.subcategory)
    .forEach((p) => {
      const sub = p.subcategory!;
      subMap.set(sub, (subMap.get(sub) || 0) + 1);
    });
  return Array.from(subMap.entries()).map(([name, count]) => ({ name, count }));
}

// 搜索文章
export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase();
  return posts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
  );
}
