import { Link } from 'react-router-dom';
import { siteConfig } from '../data/config';

export function Footer() {
  const quickLinks = { '首页': '/', '关于': '/about' };
  const techStack = siteConfig.footer_tech_stack || ['React + TypeScript', 'Tailwind CSS'];

  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 品牌 */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-foreground tracking-tight">
              {siteConfig.site_name}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.site_subtitle}
            </p>
          </div>

          {/* 链接 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">导航</h4>
            <ul className="space-y-2">
              {Object.entries(quickLinks).map(([label, url]) => (
                <li key={url}>
                  <Link
                    to={url}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/My-Blog.github.io/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  RSS 订阅
                </a>
              </li>
            </ul>
          </div>

          {/* 技术栈 */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">技术栈</h4>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">{siteConfig.footer_text}</p>
        </div>
      </div>
    </footer>
  );
}
