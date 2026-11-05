import { Link } from 'react-router-dom';
import { siteConfig } from '../data/config';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-foreground tracking-tight">
              {siteConfig.site_name}
            </span>
            <span className="text-sm text-muted-foreground">
              {siteConfig.site_subtitle}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">首页</Link>
            <Link to="/about" className="hover:text-foreground transition-colors">关于</Link>
            <a href="/My-Blog.github.io/rss.xml" className="hover:text-foreground transition-colors">RSS</a>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">{siteConfig.footer_text}</p>
        </div>
      </div>
    </footer>
  );
}
