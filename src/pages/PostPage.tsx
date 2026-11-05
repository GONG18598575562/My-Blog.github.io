import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Giscus from '@giscus/react';
import { getPostBySlug } from '../data/posts';
import { siteConfig } from '../data/config';
import { addToHistory } from '../utils/storage';
import { NotFoundPage } from './NotFoundPage';
import { SEO } from '../components/SEO';
import { Avatar } from '../components/Avatar';
import 'highlight.js/styles/github-dark.css';

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      addToHistory(post.slug, post.title);
    }
  }, [post]);

  if (!post) {
    return <NotFoundPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ')}
        type="article"
      />

      {/* 封面图 - 全宽 */}
      {post.cover && (
        <div className="w-full aspect-[21/9] max-h-[420px] overflow-hidden">
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* 面包屑 */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-primary transition-colors">首页</Link>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link to={`/categories/${post.category}`} className="hover:text-primary transition-colors">
            {post.category}
          </Link>
        </nav>

        {/* 文章头部 */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight tracking-tight text-balance mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar src={siteConfig.user.avatarUrl} name={siteConfig.site_author} size="sm" />
              <span className="font-medium text-foreground">{siteConfig.site_author}</span>
            </div>
            <span className="text-border">|</span>
            <time>{post.date}</time>
            <span className="text-border">|</span>
            <Link to={`/categories/${post.category}`} className="hover:text-primary transition-colors">
              {post.category}
            </Link>
          </div>

          {/* 标签 */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/tags/${tag}`}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <article className="mb-12">
          <div className="markdown-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* 分割线 */}
        <hr className="border-border mb-8" />

        {/* 评论区域 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-5">评论</h2>
          <Giscus
            id="comments"
            repo="GONG18598575562/My-Blog.github.io"
            repoId="R_kgDOUUMvtw"
            category="Announcements"
            categoryId="DIC_kwDOUUMvt84DKbeA"
            mapping="pathname"
            strict="0"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="bottom"
            theme="preferred_color_scheme"
            lang="zh-CN"
            loading="lazy"
          />
        </div>

        {/* 底部导航 */}
        <footer className="flex items-center justify-between pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
        </footer>
      </div>
    </div>
  );
}
