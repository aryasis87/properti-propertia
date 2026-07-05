'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, House } from 'lucide-react';
import { nav, site, waLink } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (h) => (h === '/' ? pathname === '/' : !!pathname && pathname.startsWith(h));

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-cream"><House size={18} /></span>
          <span className="font-display text-2xl text-forest">Propertia</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className={`text-sm font-medium transition ${active(l.href) ? 'text-forest' : 'text-ink/70 hover:text-forest'}`}>{l.label}</Link>
          ))}
          <a href={waLink(site.wa, 'Halo Propertia, saya mau pasang iklan properti.')} target="_blank" rel="noopener noreferrer" className="rounded-full bg-forest px-5 py-2 text-sm font-semibold text-cream transition hover:bg-forest-soft">Pasang Iklan</a>
        </div>

        <button className="text-forest md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>{open ? <X /> : <Menu />}</button>
      </nav>

      {open && (
        <div className="border-t border-black/5 bg-cream px-4 py-3 md:hidden">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${active(l.href) ? 'text-forest' : 'text-ink/70'}`}>{l.label}</Link>
          ))}
          <a href={waLink(site.wa)} target="_blank" rel="noopener noreferrer" className="mt-2 block rounded-full bg-forest px-5 py-2.5 text-center text-sm font-semibold text-cream">Pasang Iklan</a>
        </div>
      )}
    </header>
  );
}
