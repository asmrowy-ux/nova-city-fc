import { MetadataRoute } from 'next'
import { client } from "@/sanity/lib/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://twojadomena.pl';
  
  // Fetch dynamic routes
  const posts = await client.fetch(`*[_type == "post"]{ slug, _updatedAt }`);
  
  const newsUrls = posts.map((post: any) => ({
    url: `${baseUrl}/pl/news/${post.slug.current}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    '',
    '/news',
    '/team',
    '/academy',
    '/board',
    '/contact',
    '/table',
    '/matches'
  ].map((route) => ({
    url: `${baseUrl}/pl${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticUrls, ...newsUrls];
}
