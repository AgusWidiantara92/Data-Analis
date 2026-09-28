'use client';

import React from 'react';
import { GameRecord } from '@/types/gaming';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Activity, BarChart2, Zap } from 'lucide-react';

interface AnalyticsMatrixTabProps {
  records: GameRecord[];
  onSelectGame: (game: GameRecord) => void;
}

export const AnalyticsMatrixTab: React.FC<AnalyticsMatrixTabProps> = ({ records, onSelectGame }) => {
  // Data Scatter Plot: Momentum vs Popularitas
  const scatterData = records.map((g) => ({
    name: g.entity,
    popularity: g.popularity_score,
    momentum: g.momentum_score ?? 50,
    recentViews: g.recent_views,
    status: g.trend_status,
  }));

  // Data Perbandingan Penonton
  const viewsComparisonData = records.map((g) => ({
    name: g.entity,
    'Penonton Terbaru': g.recent_views,
    'Penonton Sebelumnya': g.previous_views,
  }));

  // Data Perbandingan Tingkat Pertumbuhan
  const growthData = records
    .filter((g) => g.view_growth_pct !== null && g.comment_growth_pct !== null)
    .map((g) => ({
      name: g.entity,
      'Pertumbuhan Penonton %': Math.round(g.view_growth_pct || 0),
      'Pertumbuhan Komentar %': Math.round(g.comment_growth_pct || 0),
    }));

  return (
    <div className="space-y-6">
      {/* Grafik 1: Matriks Scatter Momentum vs Popularitas */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white">Matriks Momentum vs Jangkauan Popularitas</h2>
          </div>
          <span className="text-xs text-slate-300">Sumbu X: Popularitas | Sumbu Y: Momentum</span>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                type="number"
                dataKey="popularity"
                name="Popularitas"
                unit=" poin"
                domain={[0, 100]}
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
                tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }}
              />
              <YAxis
                type="number"
                dataKey="momentum"
                name="Momentum"
                unit=" poin"
                domain={[0, 100]}
                axisLine={{ stroke: '#334155' }}
                tickLine={false}
                tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 600 }}
              />
              <ZAxis type="number" dataKey="recentViews" range={[60, 400]} />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-950 border border-slate-700 p-3 rounded-xl text-xs space-y-1 shadow-xl">
                        <div className="font-extrabold text-white capitalize text-sm">{data.name}</div>
                        <div className="text-emerald-400 font-bold">Momentum: {data.momentum} poin</div>
                        <div className="text-purple-300 font-bold">Popularitas: {data.popularity} poin</div>
                        <div className="text-cyan-300 font-semibold">Penonton: {data.recentViews.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-300 uppercase">{data.status}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Game" data={scatterData} fill="#06b6d4" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid Dua Grafik Komparasi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grafik 2: Penonton Terbaru vs Penonton Sebelumnya */}
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Penonton Terbaru vs Penonton Sebelumnya</h3>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={viewsComparisonData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  tick={{ fill: '#ffffff', fontSize: 11, fontWeight: 600 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  tick={{ fill: '#cbd5e1', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                  itemStyle={{ color: '#38bdf8', fontWeight: 600 }}
                  labelStyle={{ color: '#ffffff', fontWeight: 700 }}
                  formatter={(val: any) => [Number(val).toLocaleString(), 'Penonton']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#e2e8f0' }} />
                <Bar dataKey="Penonton Terbaru" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Penonton Sebelumnya" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Grafik 3: Pertumbuhan Penonton % vs Pertumbuhan Komentar % */}
        <div className="glass-panel p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Pertumbuhan Penonton % vs Pertumbuhan Komentar %</h3>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={growthData} margin={{ top: 10, right: 10, left: 10, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis
                  dataKey="name"
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  tick={{ fill: '#ffffff', fontSize: 11, fontWeight: 600 }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                />
                <YAxis
                  axisLine={{ stroke: '#334155' }}
                  tickLine={false}
                  tick={{ fill: '#cbd5e1', fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#ffffff',
                  }}
                  itemStyle={{ color: '#f59e0b', fontWeight: 600 }}
                  labelStyle={{ color: '#ffffff', fontWeight: 700 }}
                  formatter={(val: any) => [`${val}%`, 'Pertumbuhan']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#e2e8f0' }} />
                <Bar dataKey="Pertumbuhan Penonton %" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pertumbuhan Komentar %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
