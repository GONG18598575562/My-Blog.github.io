import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { siteConfig } from '../data/config';
import { getCategories, getSubcategories } from '../data/posts';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  const categories = getCategories();

  // 监听滚动
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭移动菜单
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: '首页' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-background'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + 用户头像 */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            {/* 用户头像 */}
            {siteConfig.user.avatarUrl ? (
              <img
                src={siteConfig.user.avatarUrl}
                alt={siteConfig.user.displayName}
                className="h-9 w-9 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-colors"
              />
            ) : (
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm border-2 border-primary/30 group-hover:border-primary transition-colors">
                {siteConfig.user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                {siteConfig.site_name}
              </span>
              {siteConfig.site_subtitle && (
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {siteConfig.site_subtitle}
                </span>
              )}
            </div>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 分类下拉菜单 */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${
                  location.pathname.startsWith('/categories')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                分类
                <svg className={`w-3.5 h-3.5 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {categoryDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-1 w-56 bg-card rounded-xl shadow-lg border border-border py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  {categories.map((category) => {
                    const subs = getSubcategories(category);
                    return (
                      <div key={category} className="group">
                        <Link
                          to={`/categories/${category}`}
                          className="flex items-center justify-between px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                          onClick={() => setCategoryDropdownOpen(false)}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {category}
                          </span>
                          {subs.length > 0 && (
                            <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </Link>
                        {/* 子分类 */}
                        {subs.length > 0 && (
                          <div className="hidden group-hover:block absolute left-full top-0 ml-1 w-48 bg-card rounded-xl shadow-lg border border-border py-2">
                            {subs.map((sub) => (
                              <Link
                                key={sub.name}
                                to={`/categories/${category}`}
                                className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                                onClick={() => setCategoryDropdownOpen(false)}
                              >
                                <span>{sub.name}</span>
                                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{sub.count}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 个人中心 */}
            <Link
              to="/profile"
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                isActive('/profile')
                  ? 'bg-primary/10 text-primary'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              个人中心
            </Link>
          </nav>

          {/* 搜索和功能区 */}
          <div className="flex items-center space-x-2">
            {/* 搜索框 */}
            <form onSubmit={handleSearch} className="hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文章..."
                  className="w-48 xl:w-64 pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* 主题切换 */}
            <ThemeToggle />

            {/* 移动菜单按钮 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
              aria-label="菜单"
            >
              <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* 移动菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* 移动端子分类导航 */}
              <div className="px-4 py-2">
                <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  分类
                </div>
                <div className="space-y-1 pl-2">
                  {categories.map((category) => {
                    const subs = getSubcategories(category);
                    return (
                      <div key={category}>
                        <Link
                          to={`/categories/${category}`}
                          className={`block px-3 py-1.5 rounded-md text-sm transition-colors ${
                            location.pathname === `/categories/${category}`
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          {category}
                        </Link>
                        {subs.length > 0 && (
                          <div className="pl-3 space-y-0.5 mt-0.5">
                            {subs.map((sub) => (
                              <Link
                                key={sub.name}
                                to={`/categories/${category}`}
                                className="flex items-center justify-between px-3 py-1 rounded-md text-xs text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                              >
                                <span>{sub.name}</span>
                                <span className="text-xs bg-muted px-1.5 py-0.5 rounded">{sub.count}</span>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 移动端个人中心 */}
              <Link
                to="/profile"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/profile')
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground hover:bg-accent'
                }`}
              >
                个人中心
              </Link>

              <form onSubmit={handleSearch} className="px-4 py-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文章..."
                  className="w-full px-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// 主题切换组件
function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-md hover:bg-accent transition-colors"
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {isDark ? (
        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
