# 图片资源目录

把博客里用到的图片全部放在这个文件夹下，构建时 Vite 会**原封不动**地把它们复制到 `dist/images/`，通过 `/My-Blog.github.io/images/xxx.jpg` 提供访问。

## 在 markdown 里怎么引用

在 `posts/*.md` 里直接写以 `/images/` 开头的路径就行：

```markdown
![一张示意图](/images/hello-world/cover.jpg)
```

**不需要**手动加 `/My-Blog.github.io/` 前缀 —— `src/data/posts.ts` 会在构建时自动帮你拼上 `BASE_URL`。

## 组织建议

按文章建子目录，避免所有图片堆在一起：

```
public/images/
├── hello-world/
│   ├── cover.jpg
│   └── diagram-1.png
├── react-hooks-guide/
│   └── hook-flow.svg
└── avatar.jpg              # 站点公共图片可以直接放在根
```

## 支持的格式

`.jpg` `.jpeg` `.png` `.gif` `.webp` `.svg` `.avif` —— 任何浏览器能识别的静态图片都行。

## 优化建议

- 单张图控制在 500KB 以内，大图先用 [squoosh.app](https://squoosh.app) 压一压
- 优先用 WebP，兼容性好且体积小
- 封面图建议 16:9 或 2:1，正文配图宽度不超过 1600px
