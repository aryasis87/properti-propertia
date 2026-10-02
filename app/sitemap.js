import { site, nav, properti, halamanEkstra } from '@/lib/data';

export default function sitemap() {
  const now = new Date();
  const halaman = nav.some((n) => n.href === '/') ? nav : [{ href: '/' }, ...nav];
  const statis = halaman.map((n) => ({ url: site.url + (n.href === '/' ? '' : n.href), lastModified: now, changeFrequency: 'monthly', priority: n.href === '/' ? 1 : 0.8 }));
  const listing = properti.map((p) => ({ url: `${site.url}/properti/${p.id}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 }));
  const ekstra = halamanEkstra.map((h) => ({ url: site.url + h, lastModified: now, changeFrequency: 'monthly', priority: 0.6 }));
  return [...statis, ...listing, ...ekstra];
}
