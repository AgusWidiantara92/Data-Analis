'use client';

import React, { useState } from 'react';
import { GameRecord, TrendStatus } from '@/types/gaming';
import {
  Filter,
  ArrowUpDown,
  Grid,
  List,
  Eye,
  ThumbsUp,
  Video,
  TrendingUp,
  Zap,
} from 'lucide-react';

interface GameExplorerTabProps {
  records: GameRecord[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSelectGame: (game: GameRecord) => void;
}

type SortField = 'opportunity_score' | 'popularity_score' | 'momentum_score' | 'avg_views_per_video' | 'recent_views' | 'view_growth_pct';

export const GameExplorerTab: React.FC<GameExplorerTabProps> = ({
  records,
  searchTerm,
  setSearchTerm,
  onSelectGame,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('SEMUA');
  const [sortField, setSortField] = useState<SortField>('opportunity_score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const filterMap: Record<string, string> = {
    'SEMUA': 'ALL',
    'NAIK': 'RISING',
    'BARU': 'NEW',
    'TURUN': 'DECLINING',
    'BUKTI TINGGI': 'HIGH',
    'BUKTI SEDANG': 'MEDIUM'
  };

  // Filter logic
  const filtered = records.filter((g) => {
    const matchesSearch = g.entity.toLowerCase().includes(searchTerm.toLowerCase());
    const mapped = filterMap[selectedStatus] || selectedStatus;
    const matchesStatus = mapped === 'ALL' || g.trend_status === mapped || g.evidence_level === mapped;
    return matchesSearch && matchesStatus;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortField] ?? -9999;
    let valB = b[sortField] ?? -9999;
    if (sortOrder === 'asc') {
      return valA > valB ? 1 : -1;
    }
    return valA < valB ? 1 : -1;
  });

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
    <div className="space-y-5">
      {/* Kontrol Penjelajah */}
      <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        {/* Pill Filter */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['SEMUA', 'NAIK', 'BARU', 'TURUN', 'BUKTI TINGGI', 'BUKTI SEDANG'].map((pill) => (
            <button
              key={pill}
              onClick={() => setSelectedStatus(pill)}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedStatus === pill
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-500/20 font-bold'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Pengurutan & Switcher Tampilan */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs bg-slate-900/80 border border-slate-800 rounded-xl px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Urutkan:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="opportunity_score" className="bg-slate-900">Skor Peluang</option>
              <option value="avg_views_per_video" className="bg-slate-900">Rata-Rata Penonton / Video</option>
              <option value="popularity_score" className="bg-slate-900">Popularitas</option>
              <option value="momentum_score" className="bg-slate-900">Momentum</option>
              <option value="recent_views" className="bg-slate-900">Total Penonton Terbaru</option>
              <option value="view_growth_pct" className="bg-slate-900">Pertumbuhan Penonton %</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="ml-1 text-slate-400 hover:text-white font-bold px-1"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          <div className="flex items-center bg-slate-900/80 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'grid' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan Grid"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-all ${
                viewMode === 'table' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400 hover:text-white'
              }`}
              title="Tampilan Tabel"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tampilan Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sorted.map((game) => (
            <div
              key={game.entity}
              onClick={() => onSelectGame(game)}
              className="glass-panel glass-panel-hover p-5 rounded-2xl cursor-pointer flex flex-col justify-between relative group"
            >
              <div>
                {/* Header Kartu */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-extrabold text-white capitalize group-hover:text-cyan-300 transition-colors">
                      {game.entity}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {game.analysis_label}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getStatusBadge(
                      game.trend_status
                    )}`}
                  >
                    {game.trend_status}
                  </span>
                </div>

                {/* Pill Skor */}
                <div className="grid grid-cols-3 gap-2 my-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Peluang</div>
                    <div className="text-base font-black text-cyan-400">{game.opportunity_score}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Popularitas</div>
                    <div className="text-base font-black text-purple-400">{game.popularity_score}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">Momentum</div>
                    <div className="text-base font-black text-emerald-400">
                      {game.momentum_score !== null ? game.momentum_score : 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Metrik Utama */}
                <div className="space-y-1.5 text-xs text-slate-300 py-2 border-t border-slate-800/60">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1 font-semibold text-amber-400">
                      <Zap className="w-3.5 h-3.5" /> Rata-Rata / Video:
                    </span>
                    <span className="font-extrabold text-amber-300">
                      {game.avg_views_per_video.toLocaleString()} views
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-cyan-400" /> Total Penonton:
                    </span>
                    <span className="font-semibold text-white">
                      {game.recent_views.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Pertumbuhan Penonton:
                    </span>
                    <span
                      className={`font-semibold ${
                        (game.view_growth_pct || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {game.view_growth_pct !== null ? `${game.view_growth_pct > 0 ? '+' : ''}${game.view_growth_pct.toFixed(1)}%` : 'Game Baru'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5 text-purple-400" /> Rasio Suka (Like Rate):
                    </span>
                    <span className="font-semibold text-white">
                      {(game.recent_like_rate * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Cakupan */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Video className="w-3.5 h-3.5 text-slate-400" /> {game.recent_videos} video / {game.recent_channels} kanal
                </span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                  Lihat Detail →
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tampilan Tabel */}
      {viewMode === 'table' && (
        <div className="glass-panel rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/90 text-slate-400 uppercase tracking-wider font-bold border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Rank</th>
                  <th className="p-3.5">Game</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Skor Peluang</th>
                  <th className="p-3.5 text-amber-400 font-extrabold">Rata-Rata Views/Video</th>
                  <th className="p-3.5">Total Views</th>
                  <th className="p-3.5">Sampel Video</th>
                  <th className="p-3.5">Bukti</th>
                  <th className="p-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {sorted.map((game) => (
                  <tr
                    key={game.entity}
                    onClick={() => onSelectGame(game)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="p-3.5 font-black text-slate-400">#{game.rank}</td>
                    <td className="p-3.5 font-extrabold text-white capitalize">{game.entity}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${getStatusBadge(game.trend_status)}`}>
                        {game.trend_status}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-cyan-400">{game.opportunity_score}</td>
                    <td className="p-3.5 font-black text-amber-300">
                      {game.avg_views_per_video.toLocaleString()} views
                    </td>
                    <td className="p-3.5 font-medium text-white">{game.recent_views.toLocaleString()}</td>
                    <td className="p-3.5 font-medium text-slate-300">{game.recent_videos} video</td>
                    <td className="p-3.5">
                      <span className="px-1.5 py-0.5 text-[10px] rounded bg-slate-800 text-slate-300">
                        {game.evidence_level}
                      </span>
                    </td>
                    <td className="p-3.5 text-right font-semibold text-cyan-400 hover:underline">
                      Detail
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
