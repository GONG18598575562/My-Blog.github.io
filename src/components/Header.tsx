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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [{ path: '/', label: '首页' }];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-background border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {siteConfig.user.avatarUrl ? (
              <img
                src={siteConfig.user.avatarUrl}
                alt={siteConfig.user.displayName}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-border"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm ring-1 ring-border">
                {siteConfig.user.displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-lg font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
              {siteConfig.site_name}
            </span>
          </Link>

          {/* 桌面导航 */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  isActive(link.path)
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* 分类下拉 */}
            <div className="relative">
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                onMouseEnter={() => setCategoryDropdownOpen(true)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all flex items-center gap-1 ${
                  location.pathname.startsWith('/categories')
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                分类
                <svg className={`w-3 h-3 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {categoryDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-1 w-52 bg-card rounded-xl shadow-lg border border-border py-1.5 z-50 animate-fade-in"
                  onMouseLeave={() => setCategoryDropdownOpen(false)}
                >
                  {categories.map((category) => {
                    const subs = getSubcategories(category);
                    return (
                      <div key={category} className="group/sub relative">
                        <Link
                          to={`/categories/${category}`}
                          className="flex items-center justify-between px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                          onClick={() => setCategoryDropdownOpen(false)}
                        >
                          <span>{category}</span>
                          {subs.length > 0 && (
                            <svg className="w-3 h-3 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          )}
                        </Link>
                        {subs.length > 0 && (
                          <div className="hidden group-hover/sub:block absolute left-full top-0 ml-1 w-44 bg-card rounded-xl shadow-lg border border-border py-1.5">
                            {subs.map((sub) => (
                              <Link
                                key={sub.name}
                                to={`/categories/${category}`}
                                className="flex items-center justify-between px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                                onClick={() => setCategoryDropdownOpen(false)}
                              >
                                <span>{sub.name}</span>
                                <span className="text-xs opacity-60">{sub.count}</span>
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

            <Link
              to="/profile"
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                isActive('/profile')
                  ? 'text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              个人中心
            </Link>
          </nav>

          {/* 功能区 */}
          <div className="flex items-center gap-2">
            {/* 搜索 */}
            <form onSubmit={handleSearch} className="hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索..."
                  className="w-44 xl:w-52 pl-9 pr-4 py-1.5 text-sm bg-muted/50 border border-transparent rounded-lg focus:outline-none focus:bg-background focus:border-border focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            <ThemeToggle />

            {/* 移动菜单 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="菜单"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-4 py-2">
                <p className="text-xs font-medium text-muted-foreground mb-2">分类</p>
                <div className="space-y-0.5">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/categories/${category}`}
                      className="block px-3 py-1.5 rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/profile"
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  isActive('/profile')
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-foreground hover:bg-muted'
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
                  className="w-full px-4 py-2 text-sm bg-muted border border-transparent rounded-lg focus:outline-none focus:border-border"
                />
              </form>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

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
      className="p-2 rounded-lg hover:bg-muted transition-colors"
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {isDark ? (
        <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}
