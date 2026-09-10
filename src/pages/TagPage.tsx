import { useParams, Link } from 'react-router-dom';
import { getPostsByTag } from '../data/posts';

export function TagPage() {
  const { slug } = useParams<{ slug: string }>();
  const posts = slug ? getPostsByTag(slug) : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">首页</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-foreground">#{slug}</span>
        </nav>

        <h1 className="text-3xl font-bold text-foreground mb-2">
          标签：#{slug}
        </h1>
        <p className="text-muted-foreground mb-6">
          共 {posts.length} 篇文章
        </p>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                to={`/posts/${post.slug}`}
                className="group bg-card/80 rounded-xl shadow-md border border-border/50 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card/80 rounded-xl shadow-md p-8 text-center">
            <p className="text-muted-foreground">该标签下暂无文章</p>
          </div>
        )}

        <footer className="mt-8">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← 返回首页
          </Link>
        </footer>
      </div>
    </div>
  );
}
