// 阅读历史存储
export interface ReadingHistoryItem {
  slug: string;
  title: string;
  viewedAt: string;
}

const HISTORY_KEY = 'reading-history';
const MAX_HISTORY = 50;

// 获取阅读历史
export function getReadingHistory(): ReadingHistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// 添加到阅读历史
export function addToHistory(slug: string, title: string): void {
  const history = getReadingHistory();
  // 移除重复项
  const filtered = history.filter(item => item.slug !== slug);
  // 添加到开头
  const newItem: ReadingHistoryItem = { slug, title, viewedAt: new Date().toISOString() };
  const updated = [newItem, ...filtered].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

// 清除阅读历史
export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
