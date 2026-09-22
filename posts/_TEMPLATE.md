---
title: 文章标题
date: 2026-01-01
category: 技术
subcategory: 前端
tags: [标签1, 标签2]
excerpt: 一句话摘要，会显示在首页文章卡片上。
cover: /images/xxx.jpg
viewCount: 0
readingTime: 3
---

# 文章标题

正文用标准 Markdown 写，支持 GFM（表格、任务列表、删除线）和代码块语法高亮。

## 二级标题

- 列表项
- 列表项

```ts
// 代码块会自动高亮
console.log('hello');
```

> 引用块也支持。

## 插入图片

把图片丢到项目根目录的 `public/images/` 下，然后在 markdown 里写以 `/images/` 开头的路径：

![一张示意图](/images/example/sample.svg)

也可以指定标题和尺寸（用 HTML）：

<img src="/images/example/sample.svg" alt="示例" width="400" />

构建时会自动把 `/images/...` 拼上 GitHub Pages 的 base 路径，不需要手动加 `/My-Blog.github.io/`。

<!--
提示：
- 文件名（不含 .md）会自动作为 URL slug，比如 hello-world.md → /posts/hello-world
- 以 _ 开头的文件会被忽略（比如这个 _TEMPLATE.md）
- date 请用 YYYY-MM-DD 格式
- tags 用 YAML 数组语法：[标签1, 标签2]
- 图片统一放 public/images/<文章名>/xxx.jpg，建议按文章建子目录
- frontmatter 里的 cover 字段也支持 /images/... 路径
-->
