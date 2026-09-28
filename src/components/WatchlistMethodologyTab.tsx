'use client';

import React from 'react';
import { GameRecord, MethodologyItem } from '@/types/gaming';
import { AlertTriangle, BookOpen, CheckCircle2, HelpCircle } from 'lucide-react';

interface WatchlistMethodologyTabProps {
  records: GameRecord[];
  methodology: MethodologyItem[];
  onSelectGame: (game: GameRecord) => void;
}

export const WatchlistMethodologyTab: React.FC<WatchlistMethodologyTabProps> = ({
  records,
  methodology,
  onSelectGame,
}) => {
  // Watchlist: game dengan data kurang, bukti LOW/REVIEW, atau sampel kanal/video tunggal
  const watchlistGames = records.filter(
    (g) =>
      g.trend_status === 'INSUFFICIENT_DATA' ||
      ['LOW', 'REVIEW'].includes(g.evidence_level) ||
      g.recent_channels <= 1 ||
      g.recent_videos <= 1
  );

  const topicTranslations: Record<string, string> = {
    'Purpose': 'Tujuan Pipeline',
    'Momentum Score': 'Skor Momentum',
    'Popularity Score': 'Skor Popularitas',
    'Engagement Score': 'Skor Keterlibatan (Engagement)',
    'Evidence Level': 'Tingkat Kepercayaan Bukti',
    'Opportunity Score': 'Skor Peluang Komposit'
  };

  const expTranslations: Record<string, string> = {
    'Converts YouTube gaming trend analysis V3.8.15 into interactive Next.js dashboard analytics.':
      'Mengonversi hasil analitik trend YouTube gaming V3.8.15 ke dalam bentuk dashboard Next.js yang interaktif.',
    'Comparable-period movement using views, comments, breadth, and discussion intensity.':
      'Mengukur pergerakan antar-periode yang komparabel menggunakan jumlah penonton, komentar, distribusi kanal, dan intensitas diskusi.',
    'Recent reach score derived from log(recent_views) and content/channel distribution breadth.':
      'Skor jangkauan terkini yang dihitung dari log(penonton_terbaru) dan cakupan distribusi kanal/video.',
    'Composite score evaluating recent like rate, comment rate, and discussion intensity.':
      'Skor komposit yang mengevaluasi rasio suka (like rate), rasio komentar, dan intensitas percakapan penonton.',
    'Confidence rating based on video and channel sample coverage (HIGH, MEDIUM, LOW).':
      'Rating tingkat kepercayaan berdasarkan jumlah sampel cakupan video dan kanal (HIGH, MEDIUM, LOW).',
    'Weighted composite (35% Popularity, 30% Momentum, 20% Engagement, 15% Evidence).':
      'Skor komposit berbobot (35% Popularitas, 30% Momentum, 20% Engagement, 15% Bukti).'
  };

  return (
    <div className="space-y-6">
      {/* Seksi Watchlist */}
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-amber-500">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            Daftar Pantau Kualitas Data & Game Berisiko Cakupan
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
            {watchlistGames.length} game memerlukan review
          </span>
        </div>

        {watchlistGames.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3">Game</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Tingkat Bukti</th>
                  <th className="p-3">Video / Kanal Terbaru</th>
                  <th className="p-3">Penonton Terbaru</th>
                  <th className="p-3">Alasan Pemantauan / Catatan Risiko</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {watchlistGames.map((g) => (
                  <tr
                    key={g.entity}
                    onClick={() => onSelectGame(g)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-extrabold text-white capitalize">{g.entity}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-slate-800 text-slate-300">
                        {g.trend_status}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-amber-400">{g.evidence_level}</td>
                    <td className="p-3 text-slate-300">
                      {g.recent_videos} video di {g.recent_channels} kanal
                    </td>
                    <td className="p-3 text-slate-300">{g.recent_views.toLocaleString()}</td>
                    <td className="p-3 text-slate-400 font-medium">
                      {g.recent_channels <= 1
                        ? 'Risiko konsentrasi kanal tunggal'
                        : g.evidence_level === 'MEDIUM'
                        ? 'Cakupan sampel bukti tingkat sedang'
                        : 'Memerlukan sampel video tambahan'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 text-xs text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Seluruh data memiliki cakupan sampel yang memadai.
          </div>
        )}
      </div>

      {/* Rincian Metodologi Pipeline */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-base mb-4">
          <BookOpen className="w-5 h-5" />
          Metodologi Kalkulasi Pipeline V3.8.15 & Penjelasan Topik
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {methodology.map((m) => (
            <div
              key={m.topic}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5"
            >
              <div className="font-bold text-white text-sm flex items-center justify-between">
                <span>{topicTranslations[m.topic] || m.topic}</span>
                <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {expTranslations[m.explanation] || m.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
