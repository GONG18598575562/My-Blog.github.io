import { siteConfig } from '../data/config';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent mb-4">
            关于
          </h1>
          <p className="text-lg text-muted-foreground">
            了解更多关于这个网站的信息
          </p>
        </div>

        {/* 内容区域 */}
        <div className="bg-card rounded-xl shadow-md border border-border p-6 sm:p-8">
          <div className="markdown-body">
            <h2 className="text-2xl font-semibold text-foreground mb-4">关于这个博客</h2>
            <p className="text-muted-foreground mb-6">
              {siteConfig.site_description}
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">关于我</h2>
            <p className="text-muted-foreground mb-6">
              你好！我是 {siteConfig.site_author}，这个博客的作者。
              我热爱技术，喜欢分享编程心得和学习笔记。
            </p>

            <h2 className="text-2xl font-semibold text-foreground mb-4">技术栈</h2>
            <p className="text-muted-foreground mb-4">
              这个博客使用以下技术构建：
            </p>
            <ul className="text-muted-foreground space-y-2 mb-6">
              {siteConfig.footer_tech_stack.map((tech) => (
                <li key={tech} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {tech}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mb-4">联系方式</h2>
            <p className="text-muted-foreground mb-4">
              如果你有任何问题或建议，欢迎通过以下方式联系我：
            </p>
            <ul className="text-muted-foreground space-y-2">
              {siteConfig.social_github && (
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <a
                    href={siteConfig.social_github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
