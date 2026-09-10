import { useState } from 'react';
import { Link } from 'react-router-dom';
import { posts, getCategories, getTags } from '../data/posts';
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

  // 侧边栏内容
  const SidebarContent = () => (
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 lg:py-10">

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
              <SidebarContent />
            </div>
          )}
        </div>

        {/* 主内容区域 - 响应式网格布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">

          {/* 左侧: 分类和标签 - 桌面端显示 */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-20">
              <SidebarContent />
            </div>
          </div>

          {/* 中间: 文章列表 */}
          <div className="lg:col-span-9 xl:col-span-9">
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
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                  >
                    清除筛选
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {sortedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/posts/${post.slug}`}
                    className="group bg-card/80 rounded-xl shadow-md border border-border/50 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  >
                    {/* 文章卡片内容 */}
                    <div className="p-4 sm:p-5">
                      {/* 分类标签 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                          {post.category}
                        </span>
                      </div>

                      {/* 标题 */}
                      <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h3>

                      {/* 摘要 */}
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {post.excerpt}
                      </p>

                      {/* 底部信息 */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{post.date}</span>
                        <div className="flex gap-1.5">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs opacity-70">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
