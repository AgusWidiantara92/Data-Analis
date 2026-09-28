'use client';

import React from 'react';
import { GameRecord } from '@/types/gaming';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { ThumbsUp, Radio, MessageSquare } from 'lucide-react';

interface EngagementBreadthTabProps {
  records: GameRecord[];
  onSelectGame: (game: GameRecord) => void;
}

export const EngagementBreadthTab: React.FC<EngagementBreadthTabProps> = ({ records, onSelectGame }) => {
  // Diurutkan berdasarkan skor keterlibatan
  const sortedByEngagement = [...records].sort((a, b) => b.engagement_score - a.engagement_score);

  // Data Pertumbuhan Cakupan (Breadth Growth)
  const breadthData = [...records]
    .filter((g) => g.breadth_growth_pct !== null)
    .sort((a, b) => (b.breadth_growth_pct || 0) - (a.breadth_growth_pct || 0))
    .map((g) => ({
      name: g.entity,
      breadthGrowth: Math.round(g.breadth_growth_pct || 0),
      channels: g.recent_channels,
      videos: g.recent_videos,
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik Skor Keterlibatan */}
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-purple-400" />
              <h2 className="text-base font-bold text-white">Leaderboard Skor Keterlibatan (Engagement)</h2>
            </div>
            <span className="text-xs text-slate-300">Rasio Suka + Komentar + Intensitas</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sortedByEngagement}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
                  }}
                  formatter={(val: any) => [`${val} poin`, 'Skor Keterlibatan']}
                />
                <Bar dataKey="engagement_score" fill="#a855f7" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik Pertumbuhan Cakupan Kanal */}
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-cyan-400" />
              <h2 className="text-base font-bold text-white">Pertumbuhan Cakupan Kanal (Breadth Growth %)</h2>
            </div>
            <span className="text-xs text-slate-300">Distribusi antar kanal</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={breadthData}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
              >
                <XAxis
                  type="number"
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
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
                  }}
                  formatter={(val: any) => [`${val}%`, 'Pertumbuhan Cakupan']}
                />
                <Bar dataKey="breadthGrowth" radius={[0, 6, 6, 0]}>
                  {breadthData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.breadthGrowth >= 0 ? '#06b6d4' : '#f43f5e'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Grid Kartu Rincian Engagement */}
      <div className="glass-panel p-5 rounded-2xl">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" /> Rincian Kualitas Interaksi Per Game
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {records.map((g) => (
            <div
              key={g.entity}
              onClick={() => onSelectGame(g)}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all space-y-2 text-xs"
            >
              <div className="flex items-center justify-between font-bold text-white capitalize">
                <span>{g.entity}</span>
                <span className="text-cyan-400 font-extrabold">{g.engagement_score} poin</span>
              </div>
              <div className="space-y-1 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Rasio Suka (Like Rate):</span>
                  <span className="font-semibold text-white">{(g.recent_like_rate * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Rasio Komentar:</span>
                  <span className="font-semibold text-white">{(g.recent_comment_rate * 100).toFixed(2)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Komentar Terbaru:</span>
                  <span className="font-semibold text-white">{g.recent_comments.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
