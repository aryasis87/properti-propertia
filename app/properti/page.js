import { Suspense } from 'react';
import PageHeader from '@/components/PageHeader';
import ListingsClient from '@/components/ListingsClient';
import { site, properti } from '@/lib/data';

export const metadata = {
  title: 'Properti',
  description: `${properti.length} listing ${site.name}: saring menurut status, jenis, kota, harga, dan jumlah kamar.`,
  alternates: { canonical: '/properti' },
};

export default function PropertiPage() {
  return (
    <main>
      <PageHeader kicker="Katalog" title={site.katalog?.judul || 'Jelajahi properti'} subtitle={site.katalog?.sub || 'Saring berdasarkan status, jenis, kota, harga, dan jumlah kamar.'} />
      <Suspense fallback={<div className="px-6 py-20 text-center text-muted">Memuat…</div>}>
        <ListingsClient />
      </Suspense>
    </main>
  );
}
