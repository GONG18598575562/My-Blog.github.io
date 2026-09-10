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

export const posts: Post[] = [
  {
    slug: 'welcome-to-my-blog',
    title: '欢迎来到我的博客',
    excerpt: '这是我的第一篇博客文章，在这里我将分享技术见解和生活感悟。',
    content: `# 欢迎来到我的博客

你好！欢迎来到我的个人博客。

## 关于这个博客

这是我第一次搭建个人博客，我计划在这里分享：

- **技术文章** — 编程心得、项目经验、技术教程
- **学习笔记** — 读书笔记、课程总结
- **生活感悟** — 日常生活中的思考和体会

## 技术栈

这个博客使用以下技术构建：

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式
- React Router 路由
- React Markdown 渲染文章内容

## 后续计划

我会持续更新博客内容，欢迎收藏本站。如果你有任何问题或建议，欢迎通过 GitHub 联系我。

> Stay hungry, stay foolish. — Steve Jobs
`,
    date: '2026-09-10',
    category: '随笔',
    subcategory: '日常',
    tags: ['介绍', '开始'],
    viewCount: 128,
    readingTime: 3,
  },
  {
    slug: 'react-hooks-guide',
    title: 'React Hooks 入门指南',
    excerpt: 'React Hooks 是 React 16.8 引入的新特性，它让我们能够在函数组件中使用状态和其他 React 特性。',
    content: `# React Hooks 入门指南

React Hooks 是 React 16.8 引入的新特性，它让我们能够在函数组件中使用状态和其他 React 特性。

## 为什么需要 Hooks？

在 Hooks 出现之前，我们只能在 class 组件中使用状态和生命周期方法。这导致了一些问题：

- 组件之间难以复用状态逻辑
- 复杂组件变得难以理解
- class 组件的 \`this\` 绑定容易出错

## 常用 Hooks

### useState

\`useState\` 是最基础的 Hook，用于在函数组件中添加状态：

\`\`\`tsx
const [count, setCount] = useState(0);
\`\`\`

### useEffect

\`useEffect\` 用于处理副作用，如数据获取、订阅、DOM 操作等：

\`\`\`tsx
useEffect(() => {
  document.title = \`点击了 \${count} 次\`;
}, [count]);
\`\`\`

### useContext

\`useContext\` 用于在组件树中传递数据，避免 prop drilling：

\`\`\`tsx
const theme = useContext(ThemeContext);
\`\`\`

### useMemo 和 useCallback

这两个 Hook 用于性能优化：

\`\`\`tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
\`\`\`

## 自定义 Hook

除了内置 Hook，我们还可以创建自定义 Hook 来复用状态逻辑：

\`\`\`tsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
\`\`\`

## 总结

React Hooks 让函数组件拥有了 class 组件的所有能力，同时代码更加简洁和易于理解。建议从 \`useState\` 和 \`useEffect\` 开始学习，逐步掌握其他 Hook。
`,
    date: '2026-09-08',
    category: '技术',
    subcategory: 'React',
    tags: ['React', 'JavaScript', '前端'],
    viewCount: 256,
    readingTime: 5,
  },
  {
    slug: 'tailwind-css-tips',
    title: 'Tailwind CSS 实用技巧',
    excerpt: '分享一些在使用 Tailwind CSS 过程中积累的实用技巧和最佳实践。',
    content: `# Tailwind CSS 实用技巧

Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量低级别的实用类，让你能够快速构建自定义设计。

## 1. 响应式设计

Tailwind 使用移动优先的断点系统：

\`\`\`html
<!-- 默认在小屏幕上生效，sm/md/lg/xl 分别在更大屏幕上覆盖 -->
<div class="text-sm md:text-base lg:text-lg">
  响应式文字
</div>
\`\`\`

## 2. 状态变体

Tailwind 支持各种状态变体：

\`\`\`html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2">
  按钮
</button>
\`\`\`

## 3. 使用 @apply 提取组件类

在 CSS 文件中使用 \`@apply\` 将多个 Tailwind 类组合成一个：

\`\`\`css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}
\`\`\`

## 4. 暗色模式

通过在类名前加 \`dark:\` 前缀来定义暗色模式样式：

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  支持暗色模式的卡片
</div>
\`\`\`

## 5. 自定义配置

在 \`tailwind.config.js\` 中自定义主题：

\`\`\`js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3B82F6',
      },
    },
  },
};
\`\`\`

## 6. 使用 JIT 模式

Tailwind CSS v3 默认启用 JIT（Just-In-Time）模式，它只在生成实际使用的 CSS，大大减少了最终的 CSS 文件大小。

## 总结

Tailwind CSS 的核心理念是"组合优于继承"，通过组合小的实用类来构建界面。一旦习惯了这种方式，开发效率会显著提升。
`,
    date: '2026-09-05',
    category: '技术',
    subcategory: 'CSS',
    tags: ['CSS', 'Tailwind', '前端'],
    viewCount: 189,
    readingTime: 4,
  },
  {
    slug: 'static-site-advantages',
    title: '为什么选择静态网站',
    excerpt: '静态网站正在重新受到重视，它们快速、稳定、安全且部署简单，非常适合内容型网站。',
    content: `# 为什么选择静态网站

在动态网站和 JavaScript 框架盛行的今天，静态网站正在悄然回归。

## 静态网站的优势

### 1. 速度极快

静态网站直接由 HTML 和 CSS 组成，不需要服务器端处理，加载速度极快。CDN 可以轻松缓存整个站点。

### 2. 稳定性高

没有数据库、没有服务器端逻辑，意味着更少的故障点。静态网站几乎不会因为流量激增而崩溃。

### 3. 安全性好

没有后端 API、没有数据库，攻击面大大减少。不用担心 SQL 注入、XSS 等常见安全问题。

### 4. 部署简单

静态网站可以部署在任何地方：GitHub Pages、Vercel、Netlify、Cloudflare Pages，甚至任何一台文件服务器。

### 5. 成本低廉

大多数静态网站托管服务都提供免费额度，对于个人博客来说完全够用。

## 适合场景

- **个人博客** — 以展示内容为主
- **文档站点** — API 文档、使用手册
- **作品集** — 展示项目和作品
- **企业官网** — 信息展示型网站

## 静态网站生成器

目前流行的静态网站生成器包括：

| 生成器 | 语言 | 特点 |
|--------|------|------|
| Astro | JavaScript | 岛屿架构，内容优先 |
| Hugo | Go | 构建速度极快 |
| Next.js | React | 支持静态导出 |
| Hexo | Node.js | 插件丰富 |
| Eleventy | JavaScript | 灵活轻量 |

## 结语

对于以内容展示为主的网站，静态网站是一个务实的选择。它让我们回归本质——把内容直接交付给浏览器，而不是先下载大量 JavaScript 再由客户端组装。
`,
    date: '2026-09-01',
    category: '随笔',
    subcategory: '思考',
    tags: ['静态网站', 'Astro', 'Web'],
    viewCount: 342,
    readingTime: 6,
  },
  {
    slug: 'getting-started-with-vite',
    title: 'Vite 快速上手',
    excerpt: 'Vite 是下一代前端构建工具，它的极速冷启动和热更新让开发体验大幅提升。',
    content: `# Vite 快速上手

Vite 是 Vue.js 作者尤雨溪开发的下一代前端构建工具，它的名字来自法语"快"的意思。

## 核心特性

- **极速冷启动** — 利用浏览器原生 ES Module，不需要打包
- **即时热更新 (HMR)** — 无论应用多快，热更新都很快
- **真正的按需编译** — 只编译当前页面用到的代码
- **内置 TypeScript 支持** — 无需额外配置
- **CSS 预处理支持** — 内置支持 Less、Sass、Stylus 等

## 创建项目

\`\`\`bash
# 使用 npm
npm create vite@latest my-app -- --template react-ts

# 使用 pnpm
pnpm create vite my-app -- --template react-ts

# 进入目录并安装依赖
cd my-app
npm install
npm run dev
\`\`\`

## 项目结构

\`\`\`
my-app/
├── index.html          # 入口 HTML
├── package.json
├── public/             # 静态资源
├── src/
│   ├── App.tsx         # 根组件
│   ├── main.tsx        # 应用入口
│   └── index.css       # 全局样式
├── tsconfig.json       # TypeScript 配置
└── vite.config.ts      # Vite 配置
\`\`\`

## 配置文件

\`vite.config.ts\` 是 Vite 的核心配置文件：

\`\`\`ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})
\`\`\`

## 与 Webpack 的区别

| 特性 | Vite | Webpack |
|------|------|---------|
| 开发服务器 | 原生 ESM | 打包后服务 |
| 启动速度 | 极快 | 较慢 |
| 热更新 | 即时 | 较快 |
| 生产构建 | Rollup | Webpack 自身 |

## 总结

Vite 的开发体验让人耳目一新。对于新项目，强烈推荐使用 Vite 作为构建工具。它的配置简单、启动快速，让开发者能够更专注于业务代码。
`,
    date: '2026-08-28',
    category: '技术',
    subcategory: '构建工具',
    tags: ['Vite', '前端', '构建工具'],
    viewCount: 167,
    readingTime: 5,
  },
];

// 获取所有分类
export function getCategories(): string[] {
  return [...new Set(posts.map(p => p.category))];
}

// 获取分类下的子分类
export function getSubcategories(category: string): string[] {
  return [...new Set(posts.filter(p => p.category === category && p.subcategory).map(p => p.subcategory!))];
}

// 获取所有标签
export function getTags(): string[] {
  const tagSet = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  return [...tagSet];
}

// 根据 slug 获取文章
export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}

// 根据分类筛选文章
export function getPostsByCategory(category: string): Post[] {
  return posts.filter(p => p.category === category);
}

// 根据标签筛选文章
export function getPostsByTag(tag: string): Post[] {
  return posts.filter(p => p.tags.includes(tag));
}

// 搜索文章
export function searchPosts(query: string): Post[] {
  const q = query.toLowerCase();
  return posts.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.excerpt.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q)) ||
    p.category.toLowerCase().includes(q)
  );
}
