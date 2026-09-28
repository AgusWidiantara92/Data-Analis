'use client';

import React from 'react';
import { GameRecord, KpiSummary } from '@/types/gaming';
import {
  FileText,
  TrendingUp,
  Sparkles,
  TrendingDown,
  Zap,
  ShieldAlert,
  CheckCircle2,
  BookOpen,
  Award,
  Layers,
  HelpCircle,
} from 'lucide-react';

interface DetailedReportTabProps {
  records: GameRecord[];
  kpi: KpiSummary;
}

export const DetailedReportTab: React.FC<DetailedReportTabProps> = ({ records, kpi }) => {
  const risingGames = records.filter((r) => r.trend_status === 'RISING');
  const newGames = records.filter((r) => r.trend_status === 'NEW');
  const decliningGames = records.filter((r) => r.trend_status === 'DECLINING');

  const sortedByEfficiency = [...records].sort((a, b) => b.avg_views_per_video - a.avg_views_per_video);
  const topEfficiency = sortedByEfficiency[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Banner Judul Laporan */}
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        <div className="flex items-center gap-3 text-cyan-400 font-bold text-xs uppercase tracking-widest mb-2">
          <FileText className="w-5 h-5 text-cyan-400" />
          Laporan Analisis Eksekutif Resmi Pipeline V3.8.15
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight mb-3">
          Analisis Trend Deskriptif & Performa Interaksi YouTube Gaming
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          Dokumen ini menyajikan rincian komprehensif mengenai hasil olahan data <b>YouTube Gaming Analytics Pipeline V3.8.15</b>.
          Laporan ini mengevaluasi <b>{records.length} game utama</b> berdasarkan sinyal momentum, jangkauan popularitas, kualitas keterlibatan penonton (engagement), serta efisiensi per konten video.
        </p>
      </div>

      {/* Bagian 1: Ringkasan Temuan Utama (Executive Summary Findings) */}
      <div className="glass-panel p-7 rounded-3xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Award className="w-5 h-5 text-purple-400" />
          1. Ringkasan Temuan Utama & Performa Teratas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between font-bold text-emerald-400 text-sm">
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" /> Pemimpin Momentum (Rising)</span>
              <span>PUBG</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <b>PUBG</b> mencatatkan lonjakan performa terkuat dalam periode ini dengan pertumbuhan penonton mencapai <b>+193.2%</b> (dari 92.1k menjadi 270.1k views), didukung pertumbuhan komentar sebesar <b>+241.1%</b> dan Skor Momentum mencapai <b>91.0 poin</b>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between font-bold text-amber-400 text-sm">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Efisiensi Konten Teratas</span>
              <span>{topEfficiency?.entity.toUpperCase()}</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Secara rata-rata penonton per video (penyetaraan sampel), <b>{topEfficiency?.entity}</b> menghasilkan efisiensi tertinggi dengan <b>{topEfficiency?.avg_views_per_video.toLocaleString()} views/video</b> dari sampel {topEfficiency?.recent_videos} video.
            </p>
          </div>
        </div>
      </div>

      {/* Bagian 2: Analisis Kategori & Segmentasi Status Game */}
      <div className="glass-panel p-7 rounded-3xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-cyan-400" />
          2. Rincian Analisis Berdasarkan Kategori Status Trend
        </h2>

        {/* Kategori 1: Game Rising */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> A. Game Berstatus Rising (Tren Naik) — {risingGames.length} Game
          </h3>
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 space-y-2">
            <p className="leading-relaxed">
              Status <b>RISING</b> diberikan kepada game yang memiliki data komparabel pada periode sebelumnya dan menunjukkan pertumbuhan positif yang konsisten di seluruh indikator utama (views, komentar, serta cakupan kanal).
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-200">
              <li><b>PUBG</b> (Skor Peluang: 78.6 | Bukti: HIGH): Mengalami kenaikan jangkauan penonton dari 92,154 menjadi 270,170 views. Jumlah kanal aktif meningkat dari 1 menjadi 4 kanal, menandakan tren partisipasi kreator yang makin meluas.</li>
            </ul>
          </div>
        </div>

        {/* Kategori 2: Game New (Rilis Baru) */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
            <Sparkles className="w-4 h-4" /> B. Game Berstatus NEW (Rilis Baru / Emerging) — {newGames.length} Game
          </h3>
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 space-y-2">
            <p className="leading-relaxed">
              Status <b>NEW</b> diberikan kepada game yang belum memiliki data baseline pada periode sebelumnya (previous_views = 0). Pipeline secara sengaja <i>tidak memberikan angka pertumbuhan % buatan</i> agar tidak merusak validitas statistik.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-200">
              <li><b>Silent Hill Townfall</b> (Jangkauan: 2,519,654 views | 5 video di 5 kanal | Bukti: HIGH): Merupakan rilis baru dengan jangkauan penonton terbesar di dataset. Memperoleh Skor Peluang tinggi (87.4 poin) karena jangkauan organik yang sangat massif.</li>
              <li><b>Control Resonant</b> (Jangkauan: 855,127 views | 3 video di 3 kanal | Bukti: MEDIUM): Menunjukkan minat awal penonton yang kuat dengan rasio interaksi yang stabil.</li>
              <li><b>Halo</b> (Jangkauan: 350,950 views | 3 video di 3 kanal | Bukti: MEDIUM): Mencatatkan rasio suka (Like Rate) tertinggi di antara rilis baru sebesar <b>5.58%</b>.</li>
            </ul>
          </div>
        </div>

        {/* Kategori 3: Game Declining / Cooling */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-rose-400 flex items-center gap-2">
            <TrendingDown className="w-4 h-4" /> C. Game Berstatus Declining (Fase Penurunan / Cooling) — {decliningGames.length} Game
          </h3>
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-xs text-slate-300 space-y-2">
            <p className="leading-relaxed font-medium">
              <i>Catatan Penting:</i> Status <b>DECLINING</b> merefleksikan pergerakan siklus pencarian pada jendela waktu tersebut, <u>bukan penilaian kualitas game secara keseluruhan</u>.
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-slate-200">
              <li><b>Fortnite</b> (1,943,429 views | Declining -32.6%): Meskipun mengalami penurunan dari periode lalu (2.88M views), Fortnite tetap mempertahankan volume penonton yang sangat besar dan efisiensi konten yang sangat tinggi (647k views/video).</li>
              <li><b>Marvel's Wolverine</b> (822,602 views | Declining -91.2%): Penurunan tajam disebabkan oleh lonjakan sampel pada periode lalu (18 video saat momen pengumuman resmi trailer) dibandingkan 2 video pada periode saat ini.</li>
              <li><b>Roblox</b> (621,953 views | Declining -19.9%): Menunjukkan penurunan moderat, namun memiliki rasio interaksi komentar yang cukup aktif (1,744 komentar).</li>
              <li><b>Undertale</b> & <b>Minecraft</b>: Mengalami penurunan siklus aktivitas penonton dan dimasukkan ke dalam daftar pantau karena sampel kanal yang terbatas.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bagian 3: Penjelasan Metodologi Penyetaraan Sampel (Per-Video Average) */}
      <div className="glass-panel p-7 rounded-3xl space-y-4 border border-amber-500/30">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <Zap className="w-5 h-5 text-amber-400" />
          3. Analisis Penyetaraan Sampel & Efisiensi Konten (Views / Video)
        </h2>
        <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
          <p>
            Salah satu pertanyaan penting dalam analisis data ini adalah: <b>"Mengapa jumlah video per game tidak sama?"</b>
          </p>
          <p>
            Jawabannya: Algoritma pengambilan data YouTube bekerja secara <b>organik</b> mengikuti tren aktivitas pencarian dan kreator pada saat itu. Game yang sedang diperbincangkan atau baru rilis memancing lebih banyak video rilis dari berbagai kanal. Banyaknya jumlah video itu sendiri merupakan bagian dari <i>sinyal kepopuleran game</i>.
          </p>
          <p className="font-semibold text-amber-300">
            Untuk membandingkan performa antar-game secara setara dan adil tanpa terpengaruh oleh jumlah video, pipeline menghitung metrik <u>Rata-Rata Penonton per Video</u> (<i>avg_views_per_video</i>):
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/80 p-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-2.5">Game</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Total Penonton</th>
                  <th className="p-2.5">Jumlah Video</th>
                  <th className="p-2.5 text-amber-400 font-bold">Rata-Rata Views / Video</th>
                  <th className="p-2.5">Evaluasi Efisiensi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sortedByEfficiency.map((g) => (
                  <tr key={g.entity} className="hover:bg-slate-900/50">
                    <td className="p-2.5 font-bold text-white capitalize">{g.entity}</td>
                    <td className="p-2.5 text-slate-300">{g.trend_status}</td>
                    <td className="p-2.5 text-slate-300">{g.recent_views.toLocaleString()}</td>
                    <td className="p-2.5 text-slate-300">{g.recent_videos} video</td>
                    <td className="p-2.5 font-extrabold text-amber-300">
                      {g.avg_views_per_video.toLocaleString()} views/video
                    </td>
                    <td className="p-2.5 text-slate-400">
                      {g.avg_views_per_video >= 400000
                        ? '🔥 Sangat Tinggi'
                        : g.avg_views_per_video >= 150000
                        ? '📈 Tinggi'
                        : '⚖️ Moderat'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bagian 4: Kesimpulan & Rekomendasi Strategis */}
      <div className="glass-panel p-7 rounded-3xl space-y-4 border-l-4 border-l-cyan-500">
        <h2 className="text-lg font-bold text-white flex items-center gap-2.5 border-b border-slate-800 pb-3">
          <CheckCircle2 className="w-5 h-5 text-cyan-400" />
          4. Kesimpulan & Rekomendasi Tindak Lanjut
        </h2>
        <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
          <ul className="list-disc list-inside space-y-2">
            <li>
              <b>Fokus Pengembangan Konten / Marketing:</b> Game seperti <b>Fortnite</b> dan <b>Silent Hill Townfall</b> menawarkan efisiensi jangkauan per video yang sangat massif (di atas 500k views/video). Konten yang dibuat untuk judul game ini memiliki potensi jangkauan tertinggi.
            </li>
            <li>
              <b>Fokus Peluang Momentum:</b> <b>PUBG</b> menunjukkan momentum pertumbuhan interaksi terkuat (+193.2% views & +241.1% komentar), menandakan minat komunitas penonton yang sedang berkembang pesat secara konsisten.
            </li>
            <li>
              <b>Pemantauan Kualitas Sampel:</b> Untuk game dengan sampel kanal tunggal (seperti <i>Undertale</i>), disarankan melakukan penambahan cakupan sampel video di iterasi pipeline berikutnya untuk validasi lebih mendalam.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
