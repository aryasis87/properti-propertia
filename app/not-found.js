import Link from 'next/link';
import { properti } from '@/lib/data';

export const metadata = { title: 'Halaman tidak ditemukan' };

export default function NotFound() {
  const contoh = properti.find((p) => p.featured) || properti[0];
  return (
    <main className="relative z-10 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-display text-7xl text-forest">404</p>
        <h1 className="mt-4 font-display text-3xl text-ink md:text-4xl">Alamat ini kosong</h1>
        <p className="mt-3 text-muted">Listingnya mungkin sudah terjual atau tautannya salah ketik. Rumah lain masih ada.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/properti" className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-soft">Lihat semua properti</Link>
          <Link href={`/properti/${contoh.id}`} className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-ink transition hover:border-forest hover:text-forest">{contoh.judul}</Link>
        </div>
      </div>
    </main>
  );
}
