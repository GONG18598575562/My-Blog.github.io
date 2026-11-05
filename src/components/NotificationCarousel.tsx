import { useState, useEffect, useCallback } from 'react';

interface CarouselItem {
  id: number;
  title: string;
  content: string;
  type?: 'info' | 'success' | 'warning' | 'update';
}

const CAROUSEL_INTERVAL = 6000;

const defaultNotifications: CarouselItem[] = [
  {
    id: 1,
    title: '欢迎来到我的博客',
    content: '在这里我将分享技术见解和生活感悟，探索编程的乐趣和生活的意义',
    type: 'info',
  },
];

export function NotificationCarousel() {
  const notifications = defaultNotifications;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (notifications.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, CAROUSEL_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, notifications.length]);

  const goTo = useCallback((index: number) => setCurrentIndex(index), []);
  const next = useCallback(() => setCurrentIndex((prev) => (prev + 1) % notifications.length), [notifications.length]);
  const prev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + notifications.length) % notifications.length), [notifications.length]);

  const current = notifications[currentIndex];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden bg-card rounded-xl border border-border px-5 py-3.5 flex items-center gap-3">
        <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-foreground">{current.title}</span>
          <span className="text-sm text-muted-foreground ml-2 hidden sm:inline">{current.content}</span>
        </div>

        {notifications.length > 1 && (
          <div className="flex items-center gap-2">
            <button onClick={prev} className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground" aria-label="上一条">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center gap-1">
              {notifications.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all ${i === currentIndex ? 'w-4 h-1 bg-primary' : 'w-1 h-1 bg-border'}`}
                  aria-label={`第 ${i + 1} 条`}
                />
              ))}
            </div>
            <button onClick={next} className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground" aria-label="下一条">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
