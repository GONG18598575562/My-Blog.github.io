import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { getPostBySlug } from '../data/posts';
import { NotFoundPage } from './NotFoundPage';
import 'highlight.js/styles/github-dark.css';

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          <time>{post.date}</time>
          <span>·</span>
          <Link
            to={`/categories/${post.category}`}
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            {post.category}
          </Link>
        </div>
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
      </header>

      {/* 文章内容 */}
      <article className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </article>

      {/* 底部导航 */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
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
