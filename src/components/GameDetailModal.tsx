'use client';

import React from 'react';
import { GameRecord } from '@/types/gaming';
import { X, Eye, ThumbsUp, Award, Activity, Flame, ShieldCheck } from 'lucide-react';

interface GameDetailModalProps {
  game: GameRecord | null;
  onClose: () => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose }) => {
  if (!game) return null;

  const viewGrowthStr =
    game.view_growth_pct !== null
      ? `${game.view_growth_pct > 0 ? '+' : ''}${game.view_growth_pct.toFixed(1)}%`
      : 'N/A (Game Baru)';

  const commentGrowthStr =
    game.comment_growth_pct !== null
      ? `${game.comment_growth_pct > 0 ? '+' : ''}${game.comment_growth_pct.toFixed(1)}%`
      : 'N/A (Game Baru)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-opacity">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-cyan-500/30 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Judul & Status */}
        <div className="flex flex-wrap items-center gap-3 pr-10">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 text-white font-extrabold text-lg">
            #{game.rank}
          </div>
          <div>
            <h2 className="text-2xl font-black text-white capitalize tracking-tight">
              {game.entity}
            </h2>
            <div className="flex items-center gap-2 text-xs mt-1">
              <span className="px-2.5 py-0.5 rounded-md font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {game.trend_status}
              </span>
              <span className="text-slate-400 font-medium">• {game.analysis_label}</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Bukti {game.evidence_level}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Progress Bar Skor Komposit */}
        <div className="space-y-3.5 p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Rincian Skor Analitik Komposit
          </h3>

          {/* Skor Peluang */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-cyan-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Skor Peluang (Opportunity)
              </span>
              <span className="text-white">{game.opportunity_score} / 100</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(game.opportunity_score, 100)}%` }}
              />
            </div>
          </div>

          {/* Skor Popularitas */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-purple-400 flex items-center gap-1.5">
                <Flame className="w-4 h-4" /> Skor Popularitas (Jangkauan Penonton)
              </span>
              <span className="text-white">{game.popularity_score} / 100</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(game.popularity_score, 100)}%` }}
              />
            </div>
          </div>

          {/* Skor Momentum */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Activity className="w-4 h-4" /> Skor Momentum (Pertumbuhan)
              </span>
              <span className="text-white">
                {game.momentum_score !== null ? `${game.momentum_score} / 100` : 'N/A (Game Baru)'}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(game.momentum_score || 50, 100)}%` }}
              />
            </div>
          </div>

          {/* Skor Engagement */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-amber-400 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4" /> Skor Keterlibatan (Engagement)
              </span>
              <span className="text-white">{game.engagement_score} / 100</span>
            </div>
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(game.engagement_score, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tabel Metrik Detail */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Penonton Terbaru</div>
            <div className="text-sm font-extrabold text-white">{game.recent_views.toLocaleString()}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Penonton Sebelumnya</div>
            <div className="text-sm font-extrabold text-white">{game.previous_views.toLocaleString()}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Pertumbuhan Penonton %</div>
            <div
              className={`text-sm font-extrabold ${
                (game.view_growth_pct || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {viewGrowthStr}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Rasio Suka (Like Rate) %</div>
            <div className="text-sm font-extrabold text-purple-300">
              {(game.recent_like_rate * 100).toFixed(2)}%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Rasio Komentar %</div>
            <div className="text-sm font-extrabold text-amber-300">
              {(game.recent_comment_rate * 100).toFixed(2)}%
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Pertumbuhan Komentar %</div>
            <div
              className={`text-sm font-extrabold ${
                (game.comment_growth_pct || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {commentGrowthStr}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Jumlah Video Terbaru</div>
            <div className="text-sm font-extrabold text-white">{game.recent_videos}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Jumlah Kanal Terbaru</div>
            <div className="text-sm font-extrabold text-white">{game.recent_channels}</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-slate-400 mb-0.5">Intensitas Diskusi</div>
            <div className="text-sm font-extrabold text-cyan-300">
              {game.discussion_intensity_recent?.toFixed(1) || '0.0'}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-all"
          >
            Tutup Detail
          </button>
        </div>
      </div>
    </div>
  );
};
