import { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, getCategories } from '../data/posts';
import { siteConfig } from '../data/config';
import { NotificationCarousel } from '../components/NotificationCarousel';
import { SEO } from '../components/SEO';
import { Avatar } from '../components/Avatar';
import { TypingEffect } from '../components/TypingEffect';
import { TerminalCard } from '../components/TerminalCard';

const HERO_PHRASES = [
  '分享技术见解',
  '探索编程乐趣',
  '记录生活感悟',
  '保持好奇，持续创造',
];

export function HomePage() {
  const categories = getCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const sortedPosts = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(p => !selectedCategory || p.category === selectedCategory);

  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SEO />

      {/* 全页背景装饰 - 漂浮光球 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/[0.05] rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute top-2/3 right-0 w-[450px] h-[450px] bg-violet-500/[0.04] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '3s' }} />
      </div>

      {/* Hero 区域 */}
      <div className="relative z-10 overflow-hidden bg-card/50 border-b border-border/50">
        {/* 动态渐变背景 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-primary/[0.06] via-purple-500/[0.03] to-transparent" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-primary/[0.08] to-transparent rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-gradient-to-bl from-violet-500/[0.05] to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10 xl:gap-16">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-5 sm:gap-7">
                <Avatar src={siteConfig.user.avatarUrl} name={siteConfig.user.displayName} size="lg" />
                <div className="min-w-0">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gradient">
                    {siteConfig.site_name}
                  </h1>
                  <p className="text-muted-foreground mt-2 text-base sm:text-lg max-w-xl leading-relaxed">
                    {siteConfig.site_description}
                  </p>
                </div>
              </div>

              {/* 打字机标语 */}
              <div className="mt-4 font-mono text-sm sm:text-base text-primary">
                <span className="text-muted-foreground/70">$ </span>
                <TypingEffect phrases={HERO_PHRASES} />
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/20">
                  {posts.length} 篇文章
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground border border-border/50">
                  {categories.length} 个分类
                </span>

                <span className="w-px h-5 bg-border hidden sm:block" />

                {/* 社交链接 */}
                <a
                  href={siteConfig.social_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="GitHub"
                  aria-label="GitHub"
                  className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:shadow-[0_0_12px_rgba(var(--primary-rgb),0.25)]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
                <a
                  href={`${import.meta.env.BASE_URL}rss.xml`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="RSS 订阅"
                  aria-label="RSS 订阅"
                  className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary/40 transition-all hover:shadow-[0_0_12px_rgba(var(--primary-rgb),0.25)]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM3 7a13 13 0 0 1 13 13h3A16 16 0 0 0 3 4v3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 终端卡片 */}
            <div className="hidden lg:block lg:w-[420px] xl:w-[480px] flex-shrink-0">
              <TerminalCard />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">

        {/* 通知轮播 */}
        <div className="mb-6">
          <NotificationCarousel />
        </div>

        {/* 移动端筛选 */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-card rounded-xl border border-border text-foreground text-sm font-medium"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {selectedCategory ? `分类: ${selectedCategory}` : '筛选分类'}
            </span>
            <svg className={`w-4 h-4 transition-transform ${mobileFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileFilterOpen && (
            <div className="mt-3 p-4 bg-card rounded-xl border border-border animate-fade-in">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => { handleCategoryClick(category); setMobileFilterOpen(false); }}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 三栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">

          {/* 左侧边栏 - 分类 */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-20 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">分类</h2>
                  {selectedCategory && (
                    <button onClick={() => setSelectedCategory(null)} className="text-xs text-primary hover:text-primary/80 transition-colors">
                      清除
                    </button>
                  )}
                </div>
                <nav className="space-y-0.5">
                  {categories.map((category) => {
                    const count = posts.filter(p => p.category === category).length;
                    return (
                      <button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          selectedCategory === category
                            ? 'bg-primary text-white font-medium'
                            : 'text-foreground hover:bg-muted font-normal'
                        }`}
                      >
                        <span>{category}</span>
                        <span className={`text-xs ${selectedCategory === category ? 'opacity-70' : 'text-muted-foreground'}`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* 中间 - 文章列表 */}
          <div className="lg:col-span-7">
            {/* 筛选状态 */}
            {selectedCategory && (
              <div className="mb-4 flex items-center gap-2 animate-fade-in">
                <span className="text-sm text-muted-foreground">当前筛选:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory(null)} className="hover:text-primary/70 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
            )}

            {sortedPosts.length === 0 ? (
              <div className="bg-card rounded-xl border border-border p-10 text-center">
                <svg className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-foreground mb-2">暂无文章</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedCategory ? '当前分类下没有文章' : '还没有发布任何文章'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                {sortedPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="card-glass group animate-fade-in"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <Link to={`/posts/${post.slug}`} className="block">
                      {/* 封面图 */}
                      {post.cover ? (
                        <div className="aspect-[2/1] overflow-hidden rounded-t-xl">
                          <img
                            src={post.cover}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[2/1] overflow-hidden rounded-t-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <svg className="w-12 h-12 text-muted-foreground/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}

                      {/* 内容 */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-medium text-primary">{post.category}</span>
                          <span className="text-muted-foreground/30">·</span>
                          <time className="text-xs text-muted-foreground">{post.date}</time>
                        </div>

                        <h2 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 text-balance">
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}

                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* 右侧边栏 */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              {/* 最新文章 */}
              <div className="card-glass p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary glow-sm" />
                  最新文章
                </h3>
                <div className="space-y-1">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/posts/${post.slug}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 group transition-colors"
                    >
                      {post.cover ? (
                        <img
                          src={post.cover}
                          alt=""
                          className="w-12 h-9 rounded-md object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-9 rounded-md bg-muted flex items-center justify-center flex-shrink-0">
                          <svg className="w-4 h-4 text-muted-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h4>
                        <time className="text-xs text-muted-foreground mt-0.5 block">{post.date}</time>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
