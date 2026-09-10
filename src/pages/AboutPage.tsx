import { siteConfig } from '../data/config';

export function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        关于
      </h1>

      <div className="markdown-body">
        <p className="text-gray-600 dark:text-gray-400">
          {siteConfig.site_description}
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          关于我
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          你好！我是 {siteConfig.site_author}，这个博客的作者。
          我热爱技术，喜欢分享编程心得和学习笔记。
        </p>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          技术栈
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          这个博客使用以下技术构建：
        </p>
        <ul className="text-gray-600 dark:text-gray-400">
          {siteConfig.footer_tech_stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          联系方式
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          如果你有任何问题或建议，欢迎通过以下方式联系我：
        </p>
        <ul className="text-gray-600 dark:text-gray-400">
          {siteConfig.social_github && (
            <li>
              GitHub:{' '}
              <a
                href={siteConfig.social_github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                {siteConfig.social_github}
              </a>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
