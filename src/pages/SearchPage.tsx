import { useSearchParams, Link } from 'react-router-dom';
import { searchPosts } from '../data/posts';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchPosts(query) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        搜索
      </h1>
      {query && (
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          关键词 &quot;{query}&quot; 的搜索结果 ({results.length} 篇)
        </p>
      )}

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((post) => (
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
      ) : query ? (
        <p className="text-gray-500 dark:text-gray-400">
          没有找到相关文章，试试其他关键词？
        </p>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">
          请输入关键词进行搜索
        </p>
      )}
    </div>
  );
}
