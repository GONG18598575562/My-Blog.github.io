import { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, getCategories, getTags } from '../data/posts';
import { getReadingHistory } from '../utils/storage';
import { siteConfig } from '../data/config';

export function HomePage() {
  const categories = getCategories();
  const tags = getTags();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // 按日期倒序排列
  const sortedPosts = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .filter(p => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedTag && !p.tags.includes(selectedTag)) return false;
      return true;
    });

  // 热门文章（按阅读历史排序，如果没有历史则按日期）
  const history = getReadingHistory();
  const hotPosts = [...posts].sort((a, b) => {
    const aViews = history.filter(h => h.slug === a.slug).length;
    const bViews = history.filter(h => h.slug === b.slug).length;
    if (aViews !== bViews) return bViews - aViews;
    return b.date.localeCompare(a.date);
  });

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
      setSelectedTag(null);
    }
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setSelectedCategory(null);
    }
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedTag(null);
  };

  // 左侧边栏内容
  const LeftSidebar = () => (
    <div className="space-y-4">
      {/* 分类卡片 */}
      <div className="bg-card/75 dark:bg-card/75 backdrop-blur-lg rounded-xl shadow-md border border-border/50 dark:border-border/50 p-4 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </span>
            分类
          </h2>
          {selectedCategory && (
            <button
              onClick={clearFilters}
              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              清除
            </button>
          )}
        </div>

        <div className="space-y-1">
          {categories.map((category) => {
            const count = posts.filter(p => p.category === category).length;
            return (
              <div
                key={category}
                className={`group w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm'
                    : 'bg-muted/50 hover:bg-muted text-foreground'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span className="flex items-center gap-2 text-sm font-medium truncate">
                  {category}
                </span>
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  selectedCategory === category
                    ? 'bg-card/20'
                    : 'bg-muted'
                }`}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 标签云卡片 */}
      <div className="bg-card/75 dark:bg-card/75 backdrop-blur-lg rounded-xl shadow-md border border-border/50 dark:border-border/50 p-4 transition-all duration-200 hover:shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
            </span>
            标签
          </h2>
          {selectedTag && (
            <button
              onClick={clearFilters}
              className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              清除
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                selectedTag === tag
                  ? 'shadow-sm scale-105 text-white bg-gradient-to-r from-emerald-500 to-teal-500'
                  : 'hover:scale-105 text-foreground bg-muted/50 hover:bg-muted'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // 右侧边栏 - 热门文章
  const RightSidebar = () => (
    <div className="space-y-4">
      {/* 热门文章卡片 */}
      <div className="bg-card/75 backdrop-blur-lg rounded-xl shadow-md border border-border/50 p-4">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
            </svg>
          </span>
          热门文章
        </h3>
        <div className="space-y-3">
          {hotPosts.slice(0, 8).map((post, index) => (
            <Link
              key={post.slug}
              to={`/posts/${post.slug}`}
              className="flex items-start gap-3 group"
            >
              <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                index === 0 ? 'bg-red-500 text-white' :
                index === 1 ? 'bg-orange-500 text-white' :
                index === 2 ? 'bg-yellow-500 text-white' :
                'bg-muted text-muted-foreground'
              }`}>
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {post.category}
                  </span>
                  {post.viewCount !== undefined && (
                    <span className="flex items-center gap-0.5">
                      <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {post.viewCount}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
          {hotPosts.length === 0 && (
            <div className="text-center py-4 text-muted-foreground text-sm">
              暂无文章
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-10">

        {/* 博客介绍区域 */}
        <div className="mb-8 animate-fade-in">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6 sm:p-8 lg:p-10 shadow-xl">
            {/* 装饰性背景图案 */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white"></div>
              <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full bg-white"></div>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* 用户头像 */}
              {siteConfig.user.avatarUrl ? (
                <img
                  src={siteConfig.user.avatarUrl}
                  alt={siteConfig.user.displayName}
                  className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover border-4 border-white/30 shadow-lg flex-shrink-0"
                />
              ) : (
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-2xl sm:text-3xl border-4 border-white/30 shadow-lg flex-shrink-0">
                  {siteConfig.user.displayName.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {siteConfig.site_name}
                </h1>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-3">
                  {siteConfig.site_description}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-white/80 text-xs sm:text-sm">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {posts.length} 篇文章
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {categories.length} 个分类
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                    </svg>
                    {tags.length} 个标签
                  </span>
                  {siteConfig.social_github && (
                    <a
                      href={siteConfig.social_github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 移动端筛选按钮 */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-card/80 backdrop-blur-md rounded-xl shadow-md border border-border/60 text-foreground"
          >
            <span className="flex items-center gap-2 font-medium">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              筛选与分类
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${mobileSidebarOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {mobileSidebarOpen && (
            <div className="mt-3 animate-fade-in">
              <LeftSidebar />
            </div>
          )}
        </div>

        {/* 主内容区域 - 响应式网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          {/* 左侧: 分类和标签 - 桌面端显示 */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <LeftSidebar />
            </div>
          </div>

          {/* 中间: 文章列表 */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* 手机端/平板端热门文章 - 横向滚动卡片 */}
            <div className="xl:hidden mb-6">
              <div className="bg-card/75 backdrop-blur-lg rounded-xl shadow-md border border-border/50 p-4">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                    </svg>
                  </span>
                  热门文章
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
                  {hotPosts.slice(0, 5).map((post, index) => (
                    <Link
                      key={post.slug}
                      to={`/posts/${post.slug}`}
                      className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`flex-shrink-0 w-5 h-5 rounded text-xs font-bold flex items-center justify-center ${
                          index === 0 ? 'bg-red-500 text-white' :
                          index === 1 ? 'bg-orange-500 text-white' :
                          index === 2 ? 'bg-yellow-500 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                        {post.title}
                      </p>
                    </Link>
                  ))}
                  {hotPosts.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground text-sm w-full">
                      暂无文章
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 当前过滤标签 */}
            {(selectedCategory || selectedTag) && (
              <div className="mb-4 flex flex-wrap items-center gap-2 animate-fade-in">
                <span className="text-xs text-muted-foreground">筛选:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    {selectedCategory}
                    <button onClick={clearFilters} className="hover:text-primary/80">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-medium">
                    #{selectedTag}
                    <button onClick={clearFilters} className="hover:text-emerald-900 dark:hover:text-emerald-100">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* 文章列表 */}
            {sortedPosts.length === 0 ? (
              <div className="bg-card/80 rounded-xl shadow-md p-8 text-center">
                <svg className="mx-auto h-14 w-14 text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-semibold text-foreground mb-2">暂无文章</h3>
                <p className="text-muted-foreground text-sm">
                  {selectedCategory || selectedTag ? '当前筛选条件下没有文章' : '还没有发布任何文章'}
                </p>
                {(selectedCategory || selectedTag) && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all duration-200 font-medium text-sm"
                  >
                    查看所有文章
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-5">
                {sortedPosts.map((post, index) => (
                  <article
                    key={post.slug}
                    className="group bg-card/80 backdrop-blur-sm rounded-xl shadow-md border border-border/60 overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in flex flex-col"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-1 p-3.5 sm:p-4 flex flex-col">
                      {/* 分类标签 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          {post.category}
                        </span>
                      </div>

                      {/* 标题 */}
                      <Link to={`/posts/${post.slug}`} className="flex items-start gap-1.5">
                        <h2 className="text-sm sm:text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h2>
                      </Link>

                      {/* 摘要 */}
                      {post.excerpt && (
                        <p className="text-xs sm:text-sm text-muted-foreground mb-3 flex-1 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      {/* 元信息 - 作者、日期、阅读量、阅读时间 */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                        {/* 作者 */}
                        <span className="flex items-center gap-1 truncate">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="truncate max-w-[60px]">{siteConfig.site_author}</span>
                        </span>

                        {/* 日期 */}
                        <span className="flex items-center gap-0.5 flex-shrink-0">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {post.date}
                        </span>

                        {/* 阅读量 */}
                        {post.viewCount !== undefined && (
                          <span className="flex items-center gap-0.5 flex-shrink-0">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {post.viewCount}
                          </span>
                        )}

                        {/* 阅读时间 */}
                        {post.readingTime !== undefined && (
                          <span className="flex items-center gap-0.5 flex-shrink-0">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readingTime}min
                          </span>
                        )}
                      </div>

                      {/* 标签 */}
                      <div className="flex flex-wrap items-center gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
                          <button
                            key={tag}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleTagClick(tag);
                            }}
                            className="px-1.5 py-0.5 rounded-full text-xs font-medium border hover:scale-105 transition-transform bg-muted/50 text-foreground border-border/50"
                          >
                            #{tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* 右侧: 热门文章 - 桌面端显示 */}
          <div className="hidden xl:block xl:col-span-3">
            <div className="sticky top-20">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
