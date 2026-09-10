import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">
        404
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        页面未找到
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}
