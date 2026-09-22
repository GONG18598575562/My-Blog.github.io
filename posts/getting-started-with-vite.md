---
title: Vite 快速上手
date: 2026-08-28
category: 技术
subcategory: 构建工具
tags: [Vite, 前端, 构建工具]
excerpt: Vite 是下一代前端构建工具，它的极速冷启动和热更新让开发体验大幅提升。
viewCount: 167
readingTime: 5
---

# Vite 快速上手

Vite 是 Vue.js 作者尤雨溪开发的下一代前端构建工具，它的名字来自法语"快"的意思。

## 核心特性

- **极速冷启动** — 利用浏览器原生 ES Module，不需要打包
- **即时热更新 (HMR)** — 无论应用多快，热更新都很快
- **真正的按需编译** — 只编译当前页面用到的代码
- **内置 TypeScript 支持** — 无需额外配置
- **CSS 预处理支持** — 内置支持 Less、Sass、Stylus 等

## 创建项目

```bash
# 使用 npm
npm create vite@latest my-app -- --template react-ts

# 使用 pnpm
pnpm create vite my-app -- --template react-ts

# 进入目录并安装依赖
cd my-app
npm install
npm run dev
```

## 项目结构

```
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
```

## 配置文件

`vite.config.ts` 是 Vite 的核心配置文件：

```ts
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
```

## 与 Webpack 的区别

| 特性 | Vite | Webpack |
|------|------|---------|
| 开发服务器 | 原生 ESM | 打包后服务 |
| 启动速度 | 极快 | 较慢 |
| 热更新 | 即时 | 较快 |
| 生产构建 | Rollup | Webpack 自身 |

## 总结

Vite 的开发体验让人耳目一新。对于新项目，强烈推荐使用 Vite 作为构建工具。它的配置简单、启动快速，让开发者能够更专注于业务代码。
