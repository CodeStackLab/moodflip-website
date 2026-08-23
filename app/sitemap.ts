import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://moodflip.coach';

  // Core pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/login`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/register`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  // SEO Mood Pages (#32 - 20-30 mood-specific pages)
  const moodPages = [
    'feeling-sad', 'feeling-anxious', 'feeling-angry', 'feeling-overwhelmed',
    'feeling-fearful', 'feeling-disgusted', 'feeling-stressed', 'feeling-lonely',
    'feeling-hopeless', 'feeling-frustrated', 'feeling-jealous', 'feeling-guilty',
    'feeling-ashamed', 'feeling-bored', 'feeling-numb', 'feeling-irritated',
    'feeling-rejected', 'feeling-lost', 'feeling-unmotivated', 'feeling-insecure',
    'feeling-nervous', 'feeling-restless', 'feeling-disappointed', 'feeling-confused',
    'feeling-empty', 'feeling-tired', 'flip-your-mood', 'mood-shift-technique',
    'how-to-feel-better', '60-second-mood-reset',
  ].map(slug => ({
    url: `${baseUrl}/moods/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...moodPages];
}
