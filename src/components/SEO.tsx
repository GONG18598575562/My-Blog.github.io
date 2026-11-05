import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../data/config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: 'website' | 'article';
}

const BASE_URL = 'https://gong18598575562.github.io/My-Blog.github.io/';

export function SEO({ title, description, keywords, type = 'website' }: SEOProps) {
  const siteName = siteConfig.site_name;
  const fullTitle = title ? `${title} - ${siteName}` : siteName;
  const desc = description || siteConfig.site_description;
  const kws = keywords || siteConfig.site_keywords;
  const url = BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={kws} />
      <meta name="author" content={siteConfig.site_author} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="zh_CN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />

      <html lang="zh-CN" />
    </Helmet>
  );
}
