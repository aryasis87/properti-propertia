// Perkiraan biaya pembeli saat membeli rumah di Indonesia.
// Semua angka adalah asumsi umum untuk simulasi, bukan nasihat pajak atau hukum.

export const ASUMSI = {
  npoptkp: 80e6, // NPOPTKP ditetapkan tiap pemda; isian bawaan bisa diubah.
  tarifBphtb: 0.05,
  tarifPpn: 0.11, // hanya pembelian rumah baru dari pengembang; insentif PPN DTP berubah tiap tahun.
  ppat: 0.01, // honor PPAT/notaris untuk AJB & balik nama, batas atas umum 1%.
  provisi: 0.01,
  asuransi: 0.015, // asuransi jiwa + kebakaran dibayar di muka, kira-kira.
  aphtKpr: 0.0075, // akta pembebanan hak tanggungan & SKMHT.
  adminBank: 1_000_000,
  appraisal: 1_500_000,
};

export function cicilanBulanan(pokok, bungaTahunan, tenorTahun) {
  const r = bungaTahunan / 100 / 12;
  const n = tenorTahun * 12;
  if (!pokok || !n) return 0;
  return r ? (pokok * r) / (1 - Math.pow(1 + r, -n)) : pokok / n;
}

export function hitungBiaya({ harga, baru = false, kpr = true, dpPersen = 20, bunga = 7.5, tenor = 20, npoptkp = ASUMSI.npoptkp }) {
  const pokok = kpr ? Math.round(harga * (1 - dpPersen / 100)) : 0;
  const awal = harga - pokok;
  const bphtb = Math.max(0, harga - npoptkp) * ASUMSI.tarifBphtb;
  const ppn = baru ? harga * ASUMSI.tarifPpn : 0;
  const ppat = harga * ASUMSI.ppat;
  const biayaKpr = kpr ? pokok * (ASUMSI.provisi + ASUMSI.asuransi + ASUMSI.aphtKpr) + ASUMSI.adminBank + ASUMSI.appraisal : 0;

  const rincian = [
    { k: 'awal', label: kpr ? `Uang muka ${dpPersen}%` : 'Harga rumah (tunai)', nilai: awal, ket: kpr ? 'Dibayar ke penjual saat akad.' : 'Dibayar penuh ke penjual.' },
    { k: 'bphtb', label: 'BPHTB', nilai: bphtb, ket: `${ASUMSI.tarifBphtb * 100}% × (harga − NPOPTKP). Disetor ke pemda sebelum AJB ditandatangani.` },
    ppn && { k: 'ppn', label: 'PPN rumah baru', nilai: ppn, ket: `${Math.round(ASUMSI.tarifPpn * 100)}% dari harga, hanya untuk pembelian dari pengembang. Cek insentif PPN DTP yang berlaku.` },
    { k: 'ppat', label: 'PPAT & balik nama', nilai: ppat, ket: 'Akta jual beli, cek sertifikat, dan pendaftaran di BPN. Sekitar 1% dari harga.' },
    kpr && { k: 'kpr', label: 'Biaya KPR', nilai: biayaKpr, ket: 'Provisi 1%, asuransi ±1,5%, APHT ±0,75% dari pinjaman, ditambah administrasi dan appraisal.' },
  ].filter(Boolean);

  const tunai = rincian.reduce((a, r) => a + r.nilai, 0);
  return {
    pokok,
    rincian,
    tunai,
    tambahan: tunai - awal,
    cicilan: kpr ? cicilanBulanan(pokok, bunga, tenor) : 0,
  };
}
