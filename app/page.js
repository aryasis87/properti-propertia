import Image from 'next/image';
import Link from 'next/link';
import {
  House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse,
  Search, Tag, KeyRound, Landmark, UserCheck, ShieldCheck,
  ArrowRight, ArrowUpRight, BadgeCheck, Star, ChevronDown, MapPin,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { site, stats, kategori, properti, services, keunggulan, testimonials, faqs, formatHarga, waLink } from '@/lib/data';

const ICONS = { House, Home: House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse, Search, Tag, KeyRound, Landmark, UserCheck, ShieldCheck };
const KOTA_MARQUEE = ['Jakarta', 'Bandung', 'Bali', 'Surabaya', 'Yogyakarta', 'Tangerang', 'Bekasi', 'Bogor'];

function Label({ no, children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-sm text-gold">{no}</span>
      <span className="h-px w-10 bg-ink/20" />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">{children}</span>
    </div>
  );
}

export default function HomePage() {
  const featured = properti.filter((p) => p.featured);
  const hero = featured[0];
  const rest = featured.slice(1, 4);

  return (
    <main className="relative z-10">
      {/* Hero — editorial, asimetris */}
      <section className="px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
              <BadgeCheck size={14} /> Marketplace properti tepercaya
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] text-ink md:text-7xl">
              Setiap orang berhak punya <span className="italic text-forest">tempat pulang</span>.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              Jual, beli, dan sewa properti di seluruh Indonesia — terverifikasi, transparan, dan didampingi agen profesional.
            </p>
            <div className="mt-8"><SearchBar /></div>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['rm2.jpg', 'rm5.jpg', 'rm9.jpg', 'rm3.jpg'].map((f) => (
                  <span key={f} className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-cream">
                    <Image src={`/images/${f}`} alt="" fill sizes="36px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted"><span className="font-display text-base text-ink">4,9</span> ★ · dipercaya <span className="font-semibold text-ink">8.300+</span> keluarga</p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="arch relative aspect-[4/5] w-full overflow-hidden bg-sand shadow-xl">
                <Image src="/images/rm4.jpg" alt="Properti unggulan" fill priority sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              </div>
              {/* Floating featured card */}
              <Link href={`/properti/${hero.id}`} className="absolute -bottom-4 -left-4 w-60 rounded-2xl border border-black/5 bg-white/95 p-4 shadow-xl backdrop-blur transition hover:-translate-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gold">{hero.jenisProperti} · {hero.status}</p>
                <p className="mt-1 line-clamp-1 font-display text-base text-ink">{hero.judul}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={12} /> {hero.lokasi.kota}</p>
                <p className="mt-2 font-display text-xl text-forest">{formatHarga(hero.harga)}</p>
              </Link>
              {/* rating chip */}
              <div className="absolute -right-3 top-6 hidden rounded-2xl bg-forest px-4 py-3 text-center text-cream shadow-lg sm:block">
                <p className="font-display text-2xl">120+</p>
                <p className="text-[10px] uppercase tracking-wide text-cream/70">Kota</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Marquee kota */}
      <div className="mt-6 overflow-hidden border-y border-ink/10 bg-forest py-4 text-cream">
        <div className="flex w-max animate-marquee-x">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              {KOTA_MARQUEE.map((k) => (
                <span key={k} className="flex items-center gap-6 px-6 font-display text-2xl">
                  {k} <span className="text-gold">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Kategori */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><Label no="01">Kategori</Label><h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">Cari sesuai kebutuhanmu</h2></Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {kategori.map((k, i) => {
              const Icon = ICONS[k.icon] || House;
              return (
                <Reveal key={k.jenis} delay={i * 0.05}>
                  <Link href={`/properti?jenis=${k.jenis}`} className="flex h-full flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-forest/30">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest/10 text-forest transition group-hover:bg-forest group-hover:text-cream"><Icon size={22} /></span>
                    <span className="text-sm font-semibold text-ink">{k.jenis}</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured — magazine */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between gap-4">
            <Reveal><Label no="02">Pilihan terbaik</Label><h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">Properti unggulan</h2></Reveal>
            <Link href="/properti" className="hidden items-center gap-1 text-sm font-semibold text-forest hover:underline sm:inline-flex">Lihat semua <ArrowUpRight size={16} /></Link>
          </div>

          {/* Big feature */}
          <Reveal className="mt-10">
            <div className="grid overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm lg:grid-cols-2">
              <div className="relative min-h-[300px] lg:min-h-[420px]">
                <Image src={hero.media.foto[0]} alt={hero.judul} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <span className="absolute left-5 top-5 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-cream">Unggulan · {hero.status}</span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{hero.jenisProperti} · {hero.lokasi.kota}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">{hero.judul}</h3>
                <p className="mt-4 text-muted">{hero.deskripsi}</p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm text-ink/80">
                  <span className="flex items-center gap-1.5"><BedDouble size={16} /> {hero.spesifikasi.kamarTidur} K. Tidur</span>
                  <span className="flex items-center gap-1.5"><House size={16} /> {hero.spesifikasi.luasBangunan} m²</span>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <p className="font-display text-3xl text-forest">{formatHarga(hero.harga)}</p>
                  <Link href={`/properti/${hero.id}`} className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-soft">Lihat detail <ArrowRight size={15} /></Link>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Grid of rest */}
          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => <Reveal key={p.id} delay={(i % 3) * 0.08}><PropertyCard item={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="mt-8 bg-forest px-4 py-14 text-cream sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <Reveal key={s.label} className="text-center">
              <p className="font-display text-4xl text-cream md:text-5xl">{s.value}</p>
              <p className="mt-1 text-sm text-cream/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Kenapa Propertia */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="arch-sm relative aspect-[4/5] w-full max-w-md overflow-hidden bg-sand shadow-xl">
              <Image src="/images/rm8.jpg" alt="Hunian Propertia" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Label no="—">Kenapa Propertia</Label>
            <h2 className="mt-4 font-display text-3xl text-ink md:text-5xl">Cara cerdas &amp; aman mencari properti</h2>
            <div className="mt-10 space-y-8">
              {keunggulan.map((k, i) => (
                <div key={k.title} className="flex gap-5">
                  <span className="font-display text-4xl leading-none numeral-outline">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{k.title}</h3>
                    <p className="mt-1 text-muted">{k.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Layanan */}
      <section className="bg-sand/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><Label no="03">Layanan</Label><h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">Semua kebutuhan properti, satu tempat</h2></Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = ICONS[s.icon] || ShieldCheck;
              return (
                <Reveal key={s.title}>
                  <div className="h-full bg-cream p-8 transition hover:bg-white">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest/10 text-forest"><Icon size={22} /></span>
                    <h3 className="mt-4 font-display text-xl text-ink">{s.title}</h3>
                    <p className="mt-2 text-muted">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimoni */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal><Label no="—">Kata mereka</Label></Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <figure className="flex h-full flex-col justify-between rounded-3xl bg-forest p-8 text-cream md:p-12">
                <blockquote className="font-display text-2xl leading-snug md:text-3xl">“{testimonials[0].quote}”</blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-cream font-display text-forest">{testimonials[0].nama[0]}</span>
                  <span><span className="block font-semibold">{testimonials[0].nama}</span><span className="block text-sm text-cream/70">{testimonials[0].peran}</span></span>
                </figcaption>
              </figure>
            </Reveal>
            <div className="grid gap-8">
              {testimonials.slice(1).map((t, i) => (
                <Reveal key={t.nama} delay={i * 0.1}>
                  <figure className="rounded-3xl border border-black/5 bg-white p-7 shadow-sm">
                    <div className="mb-3 flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={15} className="fill-gold" />)}</div>
                    <blockquote className="text-ink/85">“{t.quote}”</blockquote>
                    <figcaption className="mt-4 text-sm"><span className="font-semibold text-ink">{t.nama}</span> <span className="text-muted">· {t.peran}</span></figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center"><Label no="04"><span className="mx-auto">FAQ</span></Label><h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">Pertanyaan yang sering diajukan</h2></Reveal>
          <div className="mt-10 space-y-3">
            {faqs.map((f) => (
              <Reveal key={f.q}>
                <details className="group rounded-2xl border border-black/5 bg-white p-5 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-ink">
                    {f.q}
                    <ChevronDown size={18} className="shrink-0 text-forest transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl bg-forest px-8 py-16 text-cream md:px-16 md:py-20">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15 blur-2xl" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-4xl leading-tight md:text-5xl">Siap menemukan atau menjual properti?</h2>
              <p className="mt-4 max-w-xl text-cream/80">Pasang iklan gratis atau jelajahi ribuan listing terverifikasi sekarang juga.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/properti" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 font-semibold text-ink transition hover:opacity-90">Jelajahi Properti <ArrowRight size={16} /></Link>
                <a href={waLink(site.wa, 'Halo Propertia, saya mau pasang iklan properti.')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-7 py-3 font-semibold text-cream transition hover:bg-cream/10">Pasang Iklan</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
