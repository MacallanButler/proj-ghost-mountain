import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/donate',
    },
    sitemap: 'https://ghostofthemountains.org/sitemap.xml',
  };
}