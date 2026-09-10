import { useParams, Link } from 'react-router-dom';
import { getPostsByCategory } from '../data/posts';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = slug ? getPostsByCategory(slug) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        分类：{slug}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        共 {posts.length} 篇文章
      </p>

      {posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <Link to={`/posts/${post.slug}`}>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                  {post.title}
                </h3>
              </Link>
              <div className="flex items-center space-x-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <time>{post.date}</time>
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
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          该分类下暂无文章
        </p>
      )}

      <footer className="mt-8">
        <Link
          to="/"
          className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          ← 返回首页
        </Link>
      </footer>
    </div>
  );
}
