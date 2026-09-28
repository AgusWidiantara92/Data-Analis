'use client';

import React from 'react';
import { GameRecord, KpiSummary } from '@/types/gaming';
import { TrendingUp, Flame, Eye, Award, Zap, ShieldCheck } from 'lucide-react';

interface KpiCardsProps {
  kpi: KpiSummary;
  records: GameRecord[];
}

export const KpiCards: React.FC<KpiCardsProps> = ({ records }) => {
  const topOpportunityGame = records.reduce((prev, current) => 
    (current.opportunity_score > prev.opportunity_score) ? current : prev
  , records[0] || {} as GameRecord);

  const topEfficiencyGame = records.reduce((prev, current) =>
    ((current.avg_views_per_video || 0) > (prev.avg_views_per_video || 0)) ? current : prev
  , records[0] || {} as GameRecord);

  const risingCount = records.filter(r => r.trend_status === 'RISING').length;
  const newCount = records.filter(r => r.trend_status === 'NEW').length;
  const decliningCount = records.filter(r => r.trend_status === 'DECLINING').length;

  const totalViews = records.reduce((acc, curr) => acc + (curr.recent_views || 0), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Kartu 1: Ringkasan Dataset */}
      <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-cyan-400">
          <TrendingUp className="w-16 h-16" />
        </div>
        <div className="flex items-center gap-2 text-cyan-400 mb-1 font-semibold text-xs tracking-wider uppercase">
          <Flame className="w-4 h-4" />
          Ringkasan Dataset
        </div>
        <div className="text-3xl font-black text-white tracking-tight mb-2">
          {records.length} <span className="text-sm font-normal text-slate-400">Game</span>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[11px]">
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
            {risingCount} Naik
          </span>
          <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium">
            {newCount} Game Baru
          </span>
          <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium">
            {decliningCount} Menurun
          </span>
        </div>
      </div>

      {/* Kartu 2: Pemimpin Skor Peluang */}
      <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-purple-400">
          <Award className="w-16 h-16" />
        </div>
        <div className="flex items-center gap-2 text-purple-400 mb-1 font-semibold text-xs tracking-wider uppercase">
          <Award className="w-4 h-4" />
          Pemimpin Peluang Utama
        </div>
        <div className="text-2xl font-extrabold text-white tracking-tight capitalize truncate mb-1">
          {topOpportunityGame?.entity || 'N/A'}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-purple-300">
            {topOpportunityGame?.opportunity_score ?? 0}
          </span>
          <span className="text-xs text-slate-400">Skor Peluang</span>
          <span className="px-1.5 py-0.5 text-[10px] rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {topOpportunityGame?.analysis_label}
          </span>
        </div>
      </div>

      {/* Kartu 3: Efisiensi Penonton per Video (Paling Penting untuk Penyetaraan) */}
      <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group border border-amber-500/30">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-amber-400">
          <Zap className="w-16 h-16" />
        </div>
        <div className="flex items-center gap-2 text-amber-400 mb-1 font-semibold text-xs tracking-wider uppercase">
          <Zap className="w-4 h-4" />
          Efisiensi Penonton / Video
        </div>
        <div className="text-xl font-extrabold text-white tracking-tight capitalize truncate mb-1">
          {topEfficiencyGame?.entity || 'N/A'}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="font-extrabold text-amber-300">
            {topEfficiencyGame ? (topEfficiencyGame.avg_views_per_video / 1000).toFixed(0) + 'k views/video' : 'N/A'}
          </span>
          <span className="px-1.5 py-0.5 text-[10px] rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {topEfficiencyGame?.recent_videos} video
          </span>
        </div>
      </div>

      {/* Kartu 4: Total Penonton Terbaru */}
      <div className="glass-panel glass-panel-hover p-5 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-400">
          <Eye className="w-16 h-16" />
        </div>
        <div className="flex items-center gap-2 text-emerald-400 mb-1 font-semibold text-xs tracking-wider uppercase">
          <Eye className="w-4 h-4" />
          Total Penonton Terbaru
        </div>
        <div className="text-3xl font-black text-white tracking-tight mb-2">
          {(totalViews / 1000000).toFixed(2)}M
          <span className="text-sm font-normal text-slate-400 ml-1">penonton</span>
        </div>
        <p className="text-xs text-slate-400 truncate">
          Cakupan penonton kumulatif di seluruh sampel video
        </p>
      </div>
    </div>
  );
};
