import Image from 'next/image';
import Link from 'next/link';
import {
  House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse,
  Search, Tag, KeyRound, Landmark, UserCheck, ShieldCheck,
  ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, MapPin, Ruler, Calculator,
} from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { stats, kategori, properti, services, keunggulan, faqs, hargaLabel, rp, kotaList } from '@/lib/data';
import { hitungBiaya } from '@/lib/biaya';

const ICONS = { House, Home: House, Building2, Store, Trees, Palmtree, BedDouble, Warehouse, Search, Tag, KeyRound, Landmark, UserCheck, ShieldCheck };
const KOTA_MARQUEE = kotaList.slice(1);

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
  const sampul = properti.find((p) => p.id === 8) || featured[0];
  const hero = featured[0];
  const rest = featured.filter((p) => p.id !== hero.id && p.id !== sampul.id).slice(0, 3);
  const contoh = hitungBiaya({ harga: hero.harga });

  return (
    <main className="relative z-10">
      {/* Hero — editorial, asimetris */}
      <section className="px-4 pt-10 pb-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-forest">
              <BadgeCheck size={14} /> {properti.length} listing · semuanya sudah dikunjungi
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.02] text-ink md:text-7xl">
              Rumah yang sudah kami <span className="italic text-forest">datangi</span>, bukan sekadar didaftarkan.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              Setiap listing diukur ulang, difoto sendiri, dan bisa dihitung biaya belinya sampai rupiah terakhir.
            </p>
            <div className="mt-8"><SearchBar /></div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              {['Luas dicocokkan dengan sertifikat', 'Biaya beli dihitung', 'Survei dijadwalkan'].map((t) => (
                <li key={t} className="flex items-center gap-1.5"><BadgeCheck size={15} className="text-forest" /> {t}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative mx-auto w-full max-w-md">
              <div className="arch relative aspect-[4/5] w-full overflow-hidden bg-sand shadow-xl">
                <Image src={sampul.media.foto[0]} alt={sampul.judul} fill priority sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
              </div>
              {/* Floating featured card */}
              <Link href={`/properti/${sampul.id}`} className="absolute -bottom-4 -left-4 w-60 rounded-2xl border border-black/5 bg-white/95 p-4 shadow-xl backdrop-blur transition hover:-translate-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">{sampul.jenisProperti} · {sampul.status}</p>
                <p className="mt-1 line-clamp-1 font-display text-base text-ink">{sampul.judul}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={12} /> {sampul.lokasi.kecamatan}, {sampul.lokasi.kota}</p>
                <p className="mt-2 font-display text-xl text-forest">{hargaLabel(sampul)}</p>
              </Link>
              <div className="absolute -right-3 top-6 hidden rounded-2xl bg-forest px-4 py-3 text-center text-cream shadow-lg sm:block">
                <p className="font-display text-2xl">{KOTA_MARQUEE.length}</p>
                <p className="text-[10px] uppercase tracking-wide text-cream/80">Kota</p>
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
                <span key={k} className="flex items-center gap-6 whitespace-nowrap px-6 font-display text-2xl">
                  {k} <span className="text-sand" aria-hidden="true">✦</span>
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
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {kategori.map((k, i) => {
              const Icon = ICONS[k.icon] || House;
              return (
                <Reveal key={k.jenis} delay={i * 0.05}>
                  <Link href={`/properti?jenis=${k.jenis}`} className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-forest/30">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-forest/10 text-forest transition group-hover:bg-forest group-hover:text-cream"><Icon size={22} /></span>
                    <span className="text-sm font-semibold text-ink">{k.jenis}</span>
                    <span className="-mt-2 text-xs text-muted">{properti.filter((p) => p.jenisProperti === k.jenis).length} listing</span>
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
            <Reveal><Label no="02">Minggu ini</Label><h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">Yang sedang kami tawarkan</h2></Reveal>
            <Link href="/properti" className="hidden items-center gap-1 text-sm font-semibold text-forest hover:underline sm:inline-flex">Lihat semua <ArrowUpRight size={16} /></Link>
          </div>

          {/* Big feature */}
          <Reveal className="mt-10">
            <div className="grid overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm lg:grid-cols-2">
              <div className="relative min-h-[300px] lg:min-h-[420px]">
                <Image src={hero.media.foto[0]} alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                <span className="absolute left-5 top-5 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-cream">{hero.status}</span>
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">{hero.jenisProperti} · {hero.lokasi.kecamatan}, {hero.lokasi.kota}</p>
                <h3 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">{hero.judul}</h3>
                <p className="mt-4 text-muted">{hero.deskripsi}</p>
                <div className="mt-6 flex flex-wrap gap-6 text-sm text-ink/80">
                  <span className="flex items-center gap-1.5"><BedDouble size={16} /> {hero.spesifikasi.kamarTidur} K. Tidur</span>
                  <span className="flex items-center gap-1.5"><House size={16} /> {hero.spesifikasi.luasBangunan} m²</span>
                  <span className="flex items-center gap-1.5"><Ruler size={16} /> tanah {hero.spesifikasi.luasTanah} m²</span>
                </div>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="font-display text-3xl text-forest">{hargaLabel(hero)}</p>
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
              <Image src="/images/properti/ruang-tamu-terang.webp" alt="" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Label no="—">Sebelum tayang</Label>
            <h2 className="mt-4 font-display text-3xl text-ink md:text-5xl">Tiga hal yang kami lakukan untuk setiap listing</h2>
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
          <Reveal><Label no="03">Layanan</Label><h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">Dari survei pertama sampai kunci</h2></Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-black/5 bg-black/5 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Biaya — cuplikan kalkulator */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <Label no="04">Hitung biaya</Label>
            <h2 className="mt-4 font-display text-3xl text-ink md:text-5xl">Harga {hargaLabel(hero)}, tapi yang perlu disiapkan lebih dari itu</h2>
            <p className="mt-4 max-w-lg text-muted">Contoh untuk {hero.judul.toLowerCase()} dengan KPR, uang muka 20%, bunga 7,5%, dan tenor 20 tahun.</p>
            <Link href={`/biaya?id=${hero.id}`} className="mt-8 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-cream transition hover:bg-forest-soft"><Calculator size={16} /> Hitung untuk rumah lain</Link>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm md:p-8">
              {contoh.rincian.map((r) => (
                <div key={r.k} className="flex items-baseline justify-between gap-4 border-b border-black/10 py-3">
                  <dt className="text-ink/80">{r.label}</dt>
                  <dd className="font-display text-lg text-ink">{rp(r.nilai)}</dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 pt-4">
                <dt className="font-semibold text-ink">Dana tunai saat akad</dt>
                <dd className="font-display text-2xl text-forest md:text-3xl">{rp(contoh.tunai)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-2 text-sm text-muted">
                <dt>Cicilan per bulan</dt>
                <dd>±{rp(contoh.cicilan)}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-sand/50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal><Label no="05">FAQ</Label><h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">Pertanyaan yang sering diajukan</h2></Reveal>
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
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/15 blur-2xl" aria-hidden="true" />
            <div className="relative max-w-2xl">
              <h2 className="font-display text-4xl leading-tight md:text-5xl">Punya rumah yang layak dikurasi?</h2>
              <p className="mt-4 max-w-xl text-cream/80">Ceritakan sedikit tentang rumahmu. Kami datang, mengukur, dan memotret — dan kami jujur bila belum cocok untuk ditayangkan.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/properti" className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3 font-semibold text-forest transition hover:opacity-90">Jelajahi properti <ArrowRight size={16} /></Link>
                <Link href="/kontak?topik=jual" className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3 font-semibold text-cream transition hover:bg-cream/10">Ajukan listing</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
