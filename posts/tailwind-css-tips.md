---
title: Tailwind CSS 实用技巧
date: 2026-09-05
category: 技术
subcategory: CSS
tags: [CSS, Tailwind, 前端]
excerpt: 分享一些在使用 Tailwind CSS 过程中积累的实用技巧和最佳实践。
viewCount: 189
readingTime: 4
---

# Tailwind CSS 实用技巧

Tailwind CSS 是一个功能类优先的 CSS 框架，它提供了大量低级别的实用类，让你能够快速构建自定义设计。

## 1. 响应式设计

Tailwind 使用移动优先的断点系统：

```html
<!-- 默认在小屏幕上生效，sm/md/lg/xl 分别在更大屏幕上覆盖 -->
<div class="text-sm md:text-base lg:text-lg">
  响应式文字
</div>
```

## 2. 状态变体

Tailwind 支持各种状态变体：

```html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2">
  按钮
</button>
```

## 3. 使用 @apply 提取组件类

在 CSS 文件中使用 `@apply` 将多个 Tailwind 类组合成一个：

```css
.btn-primary {
  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors;
}
```

## 4. 暗色模式

通过在类名前加 `dark:` 前缀来定义暗色模式样式：

```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  支持暗色模式的卡片
</div>
```

## 5. 自定义配置

在 `tailwind.config.js` 中自定义主题：

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#3B82F6',
      },
    },
  },
};
```

## 6. 使用 JIT 模式

Tailwind CSS v3 默认启用 JIT（Just-In-Time）模式，它只在生成实际使用的 CSS，大大减少了最终的 CSS 文件大小。

## 总结

Tailwind CSS 的核心理念是"组合优于继承"，通过组合小的实用类来构建界面。一旦习惯了这种方式，开发效率会显著提升。
