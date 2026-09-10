import { siteConfig } from '../data/config';

export function Footer() {
  const quickLinks = { '首页': '/', '关于': '/about' };
  const techStack = siteConfig.footer_tech_stack || ['React + TypeScript', 'Tailwind CSS'];

  return (
    <footer className="mt-auto border-t border-border bg-card dark:bg-card transition-theme">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 品牌信息 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-foreground dark:text-foreground">
              {siteConfig.site_name}
            </h3>
            <p className="text-sm text-foreground/70 dark:text-foreground/70">
              {siteConfig.site_subtitle}
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground dark:text-foreground">快速链接</h4>
            <ul className="space-y-2 text-sm text-foreground/70 dark:text-foreground/70">
              {Object.entries(quickLinks).map(([label, url], index) => (
                <li key={index}>
                  <a
                    href={String(url)}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 技术栈 */}
          <div>
            <h4 className="text-sm font-semibold mb-3 text-foreground dark:text-foreground">技术栈</h4>
            <ul className="space-y-2 text-sm text-foreground/70 dark:text-foreground/70">
              {techStack.map((tech: string, index: number) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 版权信息 */}
        <div className="mt-6 pt-4 border-t border-border text-center text-sm text-foreground/70 dark:text-foreground/70">
          <p>{siteConfig.footer_text}</p>
        </div>
      </div>
    </footer>
  );
}
