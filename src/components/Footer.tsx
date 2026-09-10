import { siteConfig } from '../data/config';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {siteConfig.site_name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {siteConfig.footer_text}
            </p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {siteConfig.social_github && (
              <a
                href={siteConfig.social_github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Built with {siteConfig.footer_tech_stack.join(' · ')}
          </p>
        </div>
      </div>
    </footer>
  );
}
