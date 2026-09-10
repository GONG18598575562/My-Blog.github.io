import { Link } from 'react-router-dom';
import { posts, getCategories, getTags } from '../data/posts';
import { siteConfig } from '../data/config';

export function HomePage() {
  const categories = getCategories();
  const tags = getTags();
  // 按日期倒序排列
  const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 头部介绍 */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {siteConfig.site_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {siteConfig.site_description}
        </p>
      </section>

      {/* 文章列表 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          最新文章
        </h2>
        <div className="space-y-6">
          {sortedPosts.map((post) => (
            <article
              key={post.slug}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
            >
              <Link to={`/posts/${post.slug}`}>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </Link>
              <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <time>{post.date}</time>
                <span>·</span>
                <Link
                  to={`/categories/${post.category}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {post.category}
                </Link>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${tag}`}
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 分类和标签 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 分类 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            分类
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/categories/${category}`}
                className="px-3 py-1.5 text-sm rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {category}
                <span className="ml-1 text-xs text-gray-400">
                  ({posts.filter(p => p.category === category).length})
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 标签 */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            标签
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
