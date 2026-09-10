import { useState, useEffect, useCallback } from 'react';

interface CarouselItem {
  id: number;
  title: string;
  content: string;
  type?: 'info' | 'success' | 'warning' | 'update';
}

const CAROUSEL_INTERVAL = 6000;

const typeConfig = {
  info: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    borderColor: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary',
    accent: 'bg-primary',
  },
  success: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: 'from-emerald-500/20 via-green-500/10 to-transparent',
    borderColor: 'border-emerald-400/30',
    iconBg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    accent: 'bg-emerald-500',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderColor: 'border-amber-400/30',
    iconBg: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
    accent: 'bg-amber-500',
  },
  update: {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    borderColor: 'border-purple-400/30',
    iconBg: 'bg-purple-500/20 text-purple-600 dark:text-purple-400',
    accent: 'bg-purple-500',
  },
};

const defaultNotifications: CarouselItem[] = [
  {
    id: 1,
    title: '欢迎来到我的博客',
    content: '在这里我将分享技术见解和生活感悟，探索编程的乐趣和生活的意义',
    type: 'info',
  },
  {
    id: 2,
    title: 'React 技术分享',
    content: '最新发布了 React Hooks 入门指南，深入浅出讲解 React 核心概念',
    type: 'success',
  },
  {
    id: 3,
    title: '持续更新中',
    content: '博客内容持续更新，涵盖前端开发、CSS 技巧、构建工具等主题',
    type: 'update',
  },
];

export function NotificationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const notifications = defaultNotifications;

  useEffect(() => {
    if (notifications.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [notifications.length, isPaused]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % notifications.length);
  }, [notifications.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + notifications.length) % notifications.length);
  }, [notifications.length]);

  const currentNotification = notifications[currentIndex];
  const config = currentNotification?.type ? typeConfig[currentNotification.type] : typeConfig.info;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 主卡片容器 */}
      <div
        className={`
          relative overflow-hidden
          bg-card/85
          backdrop-blur-xl
          rounded-2xl
          border ${config.borderColor}
          shadow-lg
          transition-all duration-300
        `}
      >
        {/* 背景渐变装饰 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50`} />

        {/* 左侧装饰条 */}
        <div className={`absolute top-0 left-0 bottom-0 w-1 ${config.accent} opacity-90`} />

        {/* 内容区域 */}
        <div className="relative px-4 py-3 sm:px-5 sm:py-4 flex items-start gap-3 sm:gap-4">
          {/* 类型图标 */}
          <div className={`
            flex-shrink-0
            inline-flex items-center justify-center
            w-9 h-9 sm:w-10 sm:h-10 rounded-xl mt-0.5
            ${config.iconBg}
          `}>
            {config.icon}
          </div>

          {/* 文本内容 */}
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">
              {currentNotification.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
              {currentNotification.content}
            </p>
          </div>
        </div>

        {/* 进度条 */}
        {notifications.length > 1 && !isPaused && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-muted/50 overflow-hidden">
            <div
              className={`h-full ${config.accent} animate-carousel-progress`}
              style={{ animationDuration: `${CAROUSEL_INTERVAL}ms` }}
              key={currentIndex}
            />
          </div>
        )}
      </div>

      {/* 导航控制 */}
      {notifications.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-3">
          <button
            onClick={prev}
            className="p-2 rounded-lg bg-card/70 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-1.5">
            {notifications.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'w-5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500'
                    : 'w-1.5 h-1.5 bg-border/60 hover:bg-border'
                }`}
                aria-label={`切换到第 ${index + 1} 条`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-lg bg-card/70 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
