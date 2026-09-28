'use client';

import React, { useState } from 'react';
import { GameRecord, TrendStatus } from '@/types/gaming';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { BarChart3, PieChart as PieIcon, Lightbulb, Zap, Trophy, TrendingUp, Sparkles, TrendingDown, ChevronRight, Eye, Award } from 'lucide-react';

interface OverviewTabProps {
  records: GameRecord[];
  onSelectGame: (game: GameRecord) => void;
}

const STATUS_COLORS: Record<string, string> = {
  RISING: '#10b981', // emerald
  NEW: '#a855f7',    // purple
  DECLINING: '#f43f5e', // rose
  MIXED: '#f59e0b',    // amber
  INSUFFICIENT_DATA: '#64748b' // slate
};

const STATUS_LABELS_ID: Record<string, string> = {
  RISING: 'Naik (Rising)',
  NEW: 'Baru (New)',
  DECLINING: 'Menurun (Declining)',
  MIXED: 'Campuran (Mixed)',
  INSUFFICIENT_DATA: 'Data Kurang'
};

export const OverviewTab: React.FC<OverviewTabProps> = ({ records, onSelectGame }) => {
  const [rankingMode, setRankingMode] = useState<'views' | 'efficiency' | 'opportunity'>('views');

  // 1. Data Peringkat Dinamis (Default: Total Penonton Views 7 Hari Terakhir)
  const rankedGames = [...records].sort((a, b) => {
    if (rankingMode === 'views') {
      return b.recent_views - a.recent_views;
    }
    if (rankingMode === 'efficiency') {
      return b.avg_views_per_video - a.avg_views_per_video;
    }
    return b.opportunity_score - a.opportunity_score;
  });

  // 2. Data Distribusi Status
  const statusCounts = records.reduce((acc, curr) => {
    acc[curr.trend_status] = (acc[curr.trend_status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(statusCounts).map((status) => ({
    name: STATUS_LABELS_ID[status] || status,
    value: statusCounts[status],
    color: STATUS_COLORS[status] || '#94a3b8',
  }));

  // 3. Data Leaderboard diurutkan berdasarkan Skor Peluang
  const sortedByOpp = [...records].sort((a, b) => b.opportunity_score - a.opportunity_score);

  // 4. Data Leaderboard Efisiensi (Rata-rata Penonton per Video)
  const sortedByEfficiency = [...records].sort((a, b) => b.avg_views_per_video - a.avg_views_per_video);

  // 5. Wawasan Analitis Otomatis
  const risingGame = records.find((r) => r.trend_status === 'RISING');
  const topEfficiencyGame = sortedByEfficiency[0];

  const getRankBadge = (index: number) => {
    const rank = index + 1;
    if (rank === 1) return <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 font-black text-xs shadow-md shadow-amber-500/20">🥇 #1</span>;
    if (rank === 2) return <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-slate-300 to-slate-400 text-slate-950 font-black text-xs shadow-md">🥈 #2</span>;
    if (rank === 3) return <span className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-700 to-amber-600 text-white font-black text-xs shadow-md">🥉 #3</span>;
    return <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 font-extrabold text-xs">#{rank}</span>;
  };

  const getStatusBadge = (status: TrendStatus) => {
    switch (status) {
      case 'RISING':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'NEW':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'DECLINING':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* SEKSI UTAMA: Tabel Peringkat Game Trending (7 Hari Terakhir) */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20">
              <Trophy className="w-5 h-5 font-black" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white tracking-tight">
                Peringkat Game Paling Trending (7 Hari Terakhir)
              </h2>
              <p className="text-xs text-slate-300">
                Peringkat otomatis berdasarkan {rankingMode === 'views' ? 'Total Penonton (Views)' : rankingMode === 'efficiency' ? 'Efisiensi Views / Video' : 'Skor Peluang (Opportunity)'}
              </p>
            </div>
          </div>

          {/* Mode Switcher Peringkat */}
          <div className="flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setRankingMode('views')}
              className={`flex items-center gap-1 px-3 py-1.5 font-bold rounded-lg transition-all ${
                rankingMode === 'views'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              Total Penonton (Views)
            </button>

            <button
              onClick={() => setRankingMode('efficiency')}
              className={`flex items-center gap-1 px-3 py-1.5 font-bold rounded-lg transition-all ${
                rankingMode === 'efficiency'
                  ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Views / Video
            </button>

            <button
              onClick={() => setRankingMode('opportunity')}
              className={`flex items-center gap-1 px-3 py-1.5 font-bold rounded-lg transition-all ${
                rankingMode === 'opportunity'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Skor Peluang
            </button>
          </div>
        </div>

        {/* Tabel Ranking 1 - 9 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-300 uppercase tracking-wider font-extrabold border-b border-slate-800">
              <tr>
                <th className="p-3.5">Peringkat</th>
                <th className="p-3.5">Nama Game</th>
                <th className="p-3.5">Status 7 Hari</th>
                <th className="p-3.5 text-center">Trend Pergerakan</th>
                <th className="p-3.5 font-extrabold text-cyan-300">Total Penonton 7 Hari</th>
                <th className="p-3.5 font-extrabold text-amber-300">Efisiensi (Views / Video)</th>
                <th className="p-3.5">Skor Peluang</th>
                <th className="p-3.5 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rankedGames.map((game, index) => (
                <tr
                  key={game.entity}
                  onClick={() => onSelectGame(game)}
                  className="hover:bg-slate-800/60 cursor-pointer transition-colors group"
                >
                  <td className="p-3.5 whitespace-nowrap">{getRankBadge(index)}</td>
                  <td className="p-3.5 font-black text-white capitalize text-sm group-hover:text-cyan-300 transition-colors">
                    {game.entity}
                  </td>
                  <td className="p-3.5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg border ${getStatusBadge(game.trend_status)}`}>
                      {game.trend_status === 'RISING' ? 'NAIK' : game.trend_status === 'NEW' ? 'GAME BARU' : 'MENURUN'}
                    </span>
                  </td>
                  <td className="p-3.5 text-center whitespace-nowrap font-bold">
                    {game.trend_status === 'RISING' && (
                      <span className="text-emerald-400 flex items-center justify-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" /> +{game.view_growth_pct?.toFixed(1)}%
                      </span>
                    )}
                    {game.trend_status === 'NEW' && (
                      <span className="text-purple-300 flex items-center justify-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Rilis Baru ({(game.recent_views / 1000000).toFixed(2)}M)
                      </span>
                    )}
                    {game.trend_status === 'DECLINING' && (
                      <span className="text-rose-400 flex items-center justify-center gap-1">
                        <TrendingDown className="w-3.5 h-3.5" /> {game.view_growth_pct?.toFixed(1)}%
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 font-black text-cyan-300 whitespace-nowrap text-sm">
                    {game.recent_views.toLocaleString()} views
                  </td>
                  <td className="p-3.5 font-black text-amber-300 whitespace-nowrap">
                    {game.avg_views_per_video.toLocaleString()} views/video
                  </td>
                  <td className="p-3.5 font-extrabold text-purple-300 whitespace-nowrap">
                    {game.opportunity_score} <span className="text-[10px] text-slate-400 font-normal">pts</span>
                  </td>
                  <td className="p-3.5 text-right font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                    <span className="inline-flex items-center gap-0.5">
                      Lihat <ChevronRight className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grid Grafik Utama */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grafik 1: Leaderboard Skor Peluang Komposit */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Skor Peluang & Profil Komposit</h2>
            </div>
            <span className="text-xs text-slate-300">Skala: 0 – 100</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sortedByOpp}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }}
                />
                <YAxis
                  type="category"
                  dataKey="entity"
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 600 }}
                  width={140}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#ffffff',
                    fontSize: '12px',
                  }}
                  itemStyle={{ color: '#38bdf8', fontWeight: 600 }}
                  labelStyle={{ color: '#ffffff', fontWeight: 700 }}
                  formatter={(value: any, name?: any, item?: any) => [
                    `${value} poin`,
                    `Skor Peluang (${item?.payload?.analysis_label || ''})`,
                  ]}
                />
                <Bar dataKey="opportunity_score" radius={[0, 6, 6, 0]}>
                  {sortedByOpp.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.trend_status] || '#06b6d4'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik 2: Rincian Status Trend */}
        <div className="lg:col-span-5 glass-panel p-5 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-bold text-white">Proporsi Status Trend</h2>
            </div>
            <span className="text-xs text-slate-300">Total {records.length} game</span>
          </div>

          <div className="h-56 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                  itemStyle={{ color: '#a855f7', fontWeight: 600 }}
                  labelStyle={{ color: '#ffffff', fontWeight: 700 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-slate-800/80">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-200 font-semibold capitalize">{item.name}:</span>
                <span className="font-extrabold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grafik 3: Leaderboard Efisiensi Rata-rata Penonton per Video (Penyetaraan Sampel) */}
      <div className="glass-panel p-5 rounded-2xl border border-amber-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Efisiensi Rata-Rata Penonton / Video (Penyetaraan Sampel)</h2>
          </div>
          <span className="text-xs text-slate-300">Penonton Terbagi Jumlah Video Sampel</span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={sortedByEfficiency}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis
                type="number"
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
                tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }}
              />
              <YAxis
                type="category"
                dataKey="entity"
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
                tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 600 }}
                width={140}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
                itemStyle={{ color: '#f59e0b', fontWeight: 600 }}
                labelStyle={{ color: '#ffffff', fontWeight: 700 }}
                formatter={(val: any) => [`${Number(val).toLocaleString()} views/video`, 'Rata-Rata Penonton']}
              />
              <Bar dataKey="avg_views_per_video" fill="#f59e0b" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Kartu Catatan Deskriptif Otomatis */}
      <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-cyan-500">
        <div className="flex items-center gap-2.5 text-cyan-400 font-bold text-sm mb-3">
          <Lightbulb className="w-5 h-5" />
          Temuan Penting Pipeline & Analisis Efisiensi
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {risingGame && (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-1.5">
              <div className="flex items-center justify-between text-emerald-400 font-semibold">
                <span className="capitalize text-white font-bold">{risingGame.entity}</span>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-[10px]">Sinyal Naik Terkuat</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Pertumbuhan penonton +{risingGame.view_growth_pct?.toFixed(1)}%,
                pertumbuhan komentar +{risingGame.comment_growth_pct?.toFixed(1)}%, skor momentum {risingGame.momentum_score}.
              </p>
            </div>
          )}

          {topEfficiencyGame && (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/20 space-y-1.5">
              <div className="flex items-center justify-between text-amber-400 font-semibold">
                <span className="capitalize text-white font-bold">{topEfficiencyGame.entity}</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-[10px]">Efisiensi Konten Teratas</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                Rata-rata penonton per video tertinggi: {topEfficiencyGame.avg_views_per_video.toLocaleString()} views/video dari {topEfficiencyGame.recent_videos} video.
              </p>
            </div>
          )}

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-cyan-500/20 space-y-1.5">
            <div className="flex items-center justify-between text-cyan-400 font-semibold">
              <span>Penyetaraan Sampel Video</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-[10px]">Penting</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              Jumlah video per game berbeda secara organik mengikuti trend kreator di YouTube. Gunakan metrik <i>Rata-Rata Penonton / Video</i> untuk membandingkan efisiensi per konten secara adil.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
