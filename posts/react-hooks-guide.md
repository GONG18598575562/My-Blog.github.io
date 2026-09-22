---
title: React Hooks 入门指南
date: 2026-09-08
category: 技术
subcategory: React
tags: [React, JavaScript, 前端]
excerpt: React Hooks 是 React 16.8 引入的新特性，它让我们能够在函数组件中使用状态和其他 React 特性。
viewCount: 256
readingTime: 5
---

# React Hooks 入门指南

React Hooks 是 React 16.8 引入的新特性，它让我们能够在函数组件中使用状态和其他 React 特性。

## 为什么需要 Hooks？

在 Hooks 出现之前，我们只能在 class 组件中使用状态和生命周期方法。这导致了一些问题：

- 组件之间难以复用状态逻辑
- 复杂组件变得难以理解
- class 组件的 `this` 绑定容易出错

## 常用 Hooks

### useState

`useState` 是最基础的 Hook，用于在函数组件中添加状态：

```tsx
const [count, setCount] = useState(0);
```

### useEffect

`useEffect` 用于处理副作用，如数据获取、订阅、DOM 操作等：

```tsx
useEffect(() => {
  document.title = `点击了 ${count} 次`;
}, [count]);
```

### useContext

`useContext` 用于在组件树中传递数据，避免 prop drilling：

```tsx
const theme = useContext(ThemeContext);
```

### useMemo 和 useCallback

这两个 Hook 用于性能优化：

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
```

## 自定义 Hook

除了内置 Hook，我们还可以创建自定义 Hook 来复用状态逻辑：

```tsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
```

## 总结

React Hooks 让函数组件拥有了 class 组件的所有能力，同时代码更加简洁和易于理解。建议从 `useState` 和 `useEffect` 开始学习，逐步掌握其他 Hook。
