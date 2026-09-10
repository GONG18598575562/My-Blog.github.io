import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/config';
import { getReadingHistory, ReadingHistoryItem } from '../utils/storage';

export function ProfilePage() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getReadingHistory());
  }, []);

  const totalReads = history.length;
  const recentReads = history.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">首页</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground">个人中心</span>
        </nav>

        {/* 用户信息卡片 */}
        <div className="bg-card rounded-xl shadow-md border border-border p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* 头像 */}
            {siteConfig.user.avatarUrl ? (
              <img
                src={siteConfig.user.avatarUrl}
                alt={siteConfig.user.displayName}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-primary/30"
              />
            ) : (
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-2xl sm:text-3xl border-4 border-primary/30">
                {siteConfig.user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                {siteConfig.user.displayName}
              </h1>
              <p className="text-muted-foreground mt-1">{siteConfig.site_description}</p>
            </div>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl shadow-md border border-border p-5 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{totalReads}</div>
            <div className="text-sm text-muted-foreground">阅读文章</div>
          </div>
          <div className="bg-card rounded-xl shadow-md border border-border p-5 text-center">
            <div className="text-3xl font-bold text-emerald-500 mb-1">0</div>
            <div className="text-sm text-muted-foreground">点赞</div>
          </div>
          <div className="bg-card rounded-xl shadow-md border border-border p-5 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-1">0</div>
            <div className="text-sm text-muted-foreground">收藏</div>
          </div>
        </div>

        {/* 最近阅读 */}
        <div className="bg-card rounded-xl shadow-md border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">最近阅读</h2>
            <Link
              to="/reading-history"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              查看全部 →
            </Link>
          </div>

          {recentReads.length > 0 ? (
            <div className="space-y-3">
              {recentReads.map((item) => (
                <Link
                  key={item.slug}
                  to={`/posts/${item.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(item.viewedAt).toLocaleDateString('zh-CN', {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground text-sm">暂无阅读记录</p>
              <Link
                to="/"
                className="inline-block mt-3 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                去阅读文章 →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
