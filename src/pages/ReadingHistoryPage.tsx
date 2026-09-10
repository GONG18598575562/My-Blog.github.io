import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReadingHistory, clearHistory, ReadingHistoryItem } from '../utils/storage';
import { getPostBySlug } from '../data/posts';

export function ReadingHistoryPage() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getReadingHistory());
  }, []);

  const handleClear = () => {
    if (confirm('确定要清除所有阅读历史吗？')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">首页</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground">阅读历史</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              阅读历史
            </h1>
            <p className="text-muted-foreground">
              共 {history.length} 条记录
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="px-4 py-2 text-sm text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              清除历史
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="space-y-3">
            {history.map((item) => {
              const post = getPostBySlug(item.slug);
              return (
                <Link
                  key={item.slug}
                  to={`/posts/${item.slug}`}
                  className="block bg-card/80 rounded-xl shadow-md border border-border/50 p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors truncate">
                        {item.title}
                      </h3>
                      {post && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 ml-4 text-xs text-muted-foreground">
                      {new Date(item.viewedAt).toLocaleDateString('zh-CN', {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="bg-card/80 rounded-xl shadow-md p-8 text-center">
            <svg className="mx-auto h-14 w-14 text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-foreground mb-2">暂无阅读记录</h3>
            <p className="text-muted-foreground text-sm mb-4">阅读文章后会自动记录在这里</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              去阅读文章
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
