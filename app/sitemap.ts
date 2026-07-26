import { MetadataRoute } from 'next';
import { SEO_PAGES } from '@/lib/seoData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://moodflip.coach';

  // Base static routes
  const routes = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/disclaimer',
    '/profile'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic 28+ SEO Mood Guide routes
  const seoRoutes = Object.keys(SEO_PAGES).map((slug) => ({
    url: `${baseUrl}/mood/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...seoRoutes];
}
