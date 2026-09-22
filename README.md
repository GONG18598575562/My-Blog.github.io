# 我的博客

一个基于 React + TypeScript + Vite + Tailwind CSS 的静态个人博客。
**写文章 = 在 `posts/` 下加一个 `.md` 文件，push 到 `main` 分支，其它什么都不用动。**

访问地址：<https://gong18598575562.github.io/My-Blog.github.io/>

## 特性

- 纯静态站点，GitHub Pages 免费托管
- Markdown + YAML frontmatter 写文章，无需碰任何代码 / 样式 / 配置
- 响应式布局，支持暗色模式
- 代码块语法高亮（highlight.js）
- 分类 / 子分类 / 标签 / 全文搜索 / 阅读历史

## 目录结构

```
My-Blog/
├── posts/                  # ← 所有文章都在这里，一个 md 一篇文章
│   ├── _TEMPLATE.md        #   模板文件（下划线开头，不会被发布）
│   ├── welcome-to-my-blog.md
│   └── ...
├── public/                 # 静态资源（图片、robots.txt 等）
├── src/
│   ├── components/         # Header / Footer / 通知栏
│   ├── data/
│   │   ├── config.ts       # 站点全局配置（站名、作者、社交链接等）
│   │   └── posts.ts        # 自动加载 posts/*.md，一般不用改
│   ├── pages/              # 首页、文章页、分类页、标签页、搜索页...
│   ├── styles/markdown.css # markdown 正文样式
│   └── App.tsx
├── .github/workflows/deploy.yml  # 推送 main 分支后自动构建并部署到 GitHub Pages
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 写一篇文章（唯一需要做的事）

1. 在 `posts/` 下新建一个 `.md` 文件，**文件名就是 URL slug**（比如 `hello-world.md` → `/posts/hello-world`）。可以直接复制 `posts/_TEMPLATE.md` 起手。
2. 按下面的格式填 frontmatter 和正文：

    ```markdown
    ---
    title: 文章标题              # 必填
    date: 2026-09-22             # 必填，YYYY-MM-DD
    category: 技术               # 必填，一级分类
    subcategory: 前端            # 可选，二级分类
    tags: [React, Vite]          # 必填，YAML 数组
    excerpt: 一句话摘要          # 可选，不填会自动从正文提取前 100 字
    cover: /images/xxx.jpg       # 可选，封面图（放 public/ 下）
    viewCount: 0                 # 可选
    readingTime: 3               # 可选，单位分钟
    ---

    # 正文标题

    这里写标准 Markdown，支持 GFM（表格、任务列表）、代码块语法高亮、图片、引用等。
    ```

3. `git add posts/xxx.md && git commit -m "post: xxx" && git push`。
4. GitHub Actions 会自动构建并发布，1~2 分钟后刷新页面即可看到新文章。

**必填字段**：`title`、`date`、`category`、`tags`。缺任何一个，构建时控制台会打印警告并跳过这篇文章。

**忽略规则**：文件名以 `_` 开头的 md（比如 `_TEMPLATE.md`、`_draft-xxx.md`）不会被发布，可以用来存草稿或模板。

## 在文章里插入图片

把图片放到项目根目录的 `public/images/` 下，然后在 markdown 里写以 `/images/` 开头的路径即可：

```markdown
![一张示意图](/images/hello-world/diagram.png)

<!-- 也可以用 HTML 控制尺寸 -->
<img src="/images/hello-world/photo.jpg" alt="照片" width="600" />
```

frontmatter 里的 `cover` 字段同理：

```yaml
cover: /images/hello-world/cover.jpg
```

**不需要**手动加 `/My-Blog.github.io/` 前缀 —— 构建时 `src/data/posts.ts` 会自动把 `/images/...` 改写成带 Vite `BASE_URL` 的完整路径，本地开发和线上部署都能正确显示。

推荐按文章建子目录组织图片：

```
public/images/
├── hello-world/
│   ├── cover.jpg
│   └── diagram-1.png
├── react-hooks-guide/
│   └── hook-flow.svg
└── avatar.jpg              # 站点级公共图片直接放在根
```

支持 `.jpg` `.jpeg` `.png` `.gif` `.webp` `.svg` `.avif` 等所有浏览器能识别的静态图片格式。单张图建议控制在 500KB 以内，大图可以先用 [squoosh.app](https://squoosh.app) 压一压。

## 本地开发

```bash
npm install       # 首次或依赖变动后执行
npm run dev       # 启动开发服务器 http://localhost:5173
npm run build     # 生产构建到 dist/
npm run preview   # 预览构建产物
```

修改 `posts/*.md` 时开发服务器会自动热更新，无需重启。

## 修改站点信息

站名、副标题、作者、社交链接、每页文章数等在 `src/data/config.ts` 里改，改一次全站生效。

## 部署

推送到 `main` 分支后，`.github/workflows/deploy.yml` 会：

1. `npm ci && npm run build`
2. 把 `dist/` 发布到 `gh-pages` 分支
3. GitHub Pages 从 `gh-pages` 分支提供访问

无需手动干预。

## 技术栈

React 18 · TypeScript · Vite 7 · Tailwind CSS 3 · React Router 6 · React Markdown + remark-gfm + rehype-highlight · js-yaml

## License

MIT
