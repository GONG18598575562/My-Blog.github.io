# 我的博客

一个基于 React + TypeScript + Tailwind CSS 的静态个人博客。

## 特性

- 纯静态网站，无需后端
- 响应式设计，支持移动端
- 暗色模式支持
- Markdown 文章渲染
- 代码语法高亮
- 文章搜索功能
- 分类和标签筛选

## 技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS 样式
- React Router 路由
- React Markdown 渲染

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 添加文章

在 `src/data/posts.ts` 中添加新的文章对象：

```typescript
{
  slug: 'your-post-slug',      // URL 中的标识
  title: '文章标题',
  excerpt: '文章摘要',
  content: `#  Markdown 内容  `,
  date: '2026-09-10',
  category: '分类',
  tags: ['标签1', '标签2'],
}
```

## 部署

推送到 `main` 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

访问地址：https://gong18598575562.github.io/My-Blog.github.io/

## License

MIT
