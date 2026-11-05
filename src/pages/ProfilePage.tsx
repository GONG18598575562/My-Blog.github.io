import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/config';
import { getReadingHistory, ReadingHistoryItem } from '../utils/storage';
import { SEO } from '../components/SEO';
import { Avatar } from '../components/Avatar';

export function ProfilePage() {
  const [history, setHistory] = useState<ReadingHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getReadingHistory());
  }, []);

  const totalReads = history.length;
  const recentReads = history.slice(0, 5);

  return (
    <div className="min-h-screen bg-background">
      <SEO title="个人中心" />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 面包屑 */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">首页</Link>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground">个人中心</span>
        </nav>

        {/* 用户信息 */}
        <div className="bg-card rounded-xl border border-border p-6 sm:p-8 mb-6">
          <div className="flex items-center gap-5">
            <Avatar src={siteConfig.user.avatarUrl} name={siteConfig.user.displayName} size="lg" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                {siteConfig.user.displayName}
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">{siteConfig.site_description}</p>
            </div>
          </div>
        </div>

        {/* 统计 */}
        <div className="bg-card rounded-xl border border-border p-5 text-center mb-6">
          <div className="text-3xl font-bold text-primary mb-1">{totalReads}</div>
          <div className="text-sm text-muted-foreground">已读文章</div>
        </div>

        {/* 最近阅读 */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-foreground">最近阅读</h2>
            {recentReads.length > 0 && (
              <Link
                to="/reading-history"
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                查看全部 →
              </Link>
            )}
          </div>

          {recentReads.length > 0 ? (
            <div className="space-y-1">
              {recentReads.map((item) => (
                <Link
                  key={item.slug}
                  to={`/posts/${item.slug}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-foreground truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {new Date(item.viewedAt).toLocaleDateString('zh-CN', {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <svg className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground text-sm mb-3">暂无阅读记录</p>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                去阅读文章
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
