import { useSearchParams, Link } from 'react-router-dom';
import { searchPosts } from '../data/posts';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchPosts(query) : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          搜索
        </h1>
        {query && (
          <p className="text-muted-foreground mb-6">
            关键词 &quot;{query}&quot; 的搜索结果 ({results.length} 篇)
          </p>
        )}

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {results.map((post) => (
              <Link
                key={post.slug}
                to={`/posts/${post.slug}`}
                className="group bg-card/80 rounded-xl shadow-md border border-border/50 overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    <div className="flex gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs opacity-70">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          <div className="bg-card/80 rounded-xl shadow-md p-8 text-center">
            <svg className="mx-auto h-14 w-14 text-muted-foreground mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-foreground mb-2">没有找到相关文章</h3>
            <p className="text-muted-foreground text-sm">试试其他关键词？</p>
          </div>
        ) : (
          <div className="bg-card/80 rounded-xl shadow-md p-8 text-center">
            <p className="text-muted-foreground">请输入关键词进行搜索</p>
          </div>
        )}
      </div>
    </div>
  );
}
