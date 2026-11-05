import { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, getCategories, getTags } from '../data/posts';
import { siteConfig } from '../data/config';
import { NotificationCarousel } from '../components/NotificationCarousel';
import { SEO } from '../components/SEO';
import { Avatar } from '../components/Avatar';

export function HomePage() {
  const categories = getCategories();
  const tags = getTags();
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
    <div className="min-h-screen bg-background">
      <SEO />

      {/* Hero 区域 */}
      <div className="relative overflow-hidden bg-card border-b border-border">
        {/* 渐变装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.04] to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-48 bg-gradient-to-tr from-primary/[0.03] to-transparent rounded-full blur-3xl" />
          <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-bl from-blue-400/[0.03] to-transparent rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex items-center gap-6 sm:gap-8">
            <Avatar src={siteConfig.user.avatarUrl} name={siteConfig.user.displayName} size="lg" />
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                {siteConfig.site_name}
              </h1>
              <p className="text-muted-foreground mt-2 text-base sm:text-lg max-w-xl leading-relaxed">
                {siteConfig.site_description}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {posts.length} 篇文章
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  {categories.length} 个分类
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

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
          <div className="lg:col-span-7 xl:col-span-8">
            {/* 筛选状态 */}
            {selectedCategory && (
              <div className="mb-5 flex items-center gap-2 animate-fade-in">
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
              <div className="bg-card rounded-xl border border-border p-12 text-center">
                <svg className="mx-auto h-12 w-12 text-muted-foreground/40 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-foreground mb-2">暂无文章</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedCategory ? '当前分类下没有文章' : '还没有发布任何文章'}
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {sortedPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="card-magazine group animate-fade-in"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <Link to={`/posts/${post.slug}`} className="block">
                      {/* 封面图 */}
                      {post.cover ? (
                        <div className="aspect-[21/9] overflow-hidden rounded-t-xl">
                          <img
                            src={post.cover}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[21/9] overflow-hidden rounded-t-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <svg className="w-12 h-12 text-muted-foreground/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}

                      {/* 内容 */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-xs font-medium text-primary">{post.category}</span>
                          <span className="text-muted-foreground/30">·</span>
                          <time className="text-xs text-muted-foreground">{post.date}</time>
                        </div>

                        <h2 className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug mb-2 text-balance">
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
          <aside className="hidden xl:block xl:col-span-3">
            <div className="sticky top-20 space-y-6">
              {/* 最新文章 */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">最新文章</h3>
                <div className="space-y-3">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.slug}
                      to={`/posts/${post.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1 leading-snug">
                        {post.title}
                      </h4>
                      <time className="text-xs text-muted-foreground mt-0.5 block">{post.date}</time>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 标签云 */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">标签</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link
                      key={tag.name}
                      to={`/tags/${tag.slug}`}
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {tag.name}
                      <span className="ml-1.5 text-[10px] opacity-60">{tag.postCount}</span>
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
