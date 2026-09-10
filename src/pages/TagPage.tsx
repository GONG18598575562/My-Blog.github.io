import { useParams, Link } from 'react-router-dom';
import { getPostsByTag } from '../data/posts';

export function TagPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = slug ? getPostsByTag(slug) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        标签：#{slug}
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
            </article>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          该标签下暂无文章
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
