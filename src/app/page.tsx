'use client';

import React, { useState } from 'react';
import gamingData from '@/data/gaming_trend_data.json';
import { GameRecord, GamingDataset } from '@/types/gaming';
import { Header } from '@/components/Header';
import { KpiCards } from '@/components/KpiCards';
import { OverviewTab } from '@/components/OverviewTab';
import { GameExplorerTab } from '@/components/GameExplorerTab';
import { AnalyticsMatrixTab } from '@/components/AnalyticsMatrixTab';
import { DetailedReportTab } from '@/components/DetailedReportTab';
import { GameDetailModal } from '@/components/GameDetailModal';
import { VercelDeployModal } from '@/components/VercelDeployModal';
import { LayoutDashboard, Compass, Activity, FileText } from 'lucide-react';

const dataset = gamingData as unknown as GamingDataset;

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'explorer' | 'matrix' | 'report'>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedGame, setSelectedGame] = useState<GameRecord | null>(null);
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);

  const records: GameRecord[] = dataset.final;

  // Export CSV handler
  const exportCsv = () => {
    const headers = [
      'rank',
      'entity',
      'trend_status',
      'evidence_level',
      'opportunity_score',
      'popularity_score',
      'momentum_score',
      'avg_views_per_video',
      'recent_views',
      'previous_views',
      'view_growth_pct',
      'comment_growth_pct',
      'recent_like_rate',
      'recent_comment_rate',
      'analysis_label',
    ];

    const rows = records.map((r) => [
      r.rank,
      `"${r.entity.replace(/"/g, '""')}"`,
      r.trend_status,
      r.evidence_level,
      r.opportunity_score,
      r.popularity_score,
      r.momentum_score ?? '',
      r.avg_views_per_video,
      r.recent_views,
      r.previous_views,
      r.view_growth_pct ?? '',
      r.comment_growth_pct ?? '',
      r.recent_like_rate,
      r.recent_comment_rate,
      `"${r.analysis_label.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `youtube_gaming_trend_v3_8_15.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 pb-16">
      {/* Top Navigation Bar */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenDeployModal={() => setIsDeployModalOpen(true)}
        onExportCsv={exportCsv}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 pt-6">
        {/* KPI Cards Banner */}
        <KpiCards kpi={dataset.kpi} records={records} />

        {/* Tab Switcher Navigation */}
        <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Ringkasan Eksekutif
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'explorer'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            Penjelajah Game
          </button>

          <button
            onClick={() => setActiveTab('matrix')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Activity className="w-4 h-4" />
            Matriks & Grafik Komparasi
          </button>

          <button
            onClick={() => setActiveTab('report')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'report'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-300" />
            Laporan Analisis Lengkap
          </button>
        </div>

        {/* Display Tab Active */}
        {activeTab === 'overview' && (
          <OverviewTab records={records} onSelectGame={(g) => setSelectedGame(g)} />
        )}

        {activeTab === 'explorer' && (
          <GameExplorerTab
            records={records}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSelectGame={(g) => setSelectedGame(g)}
          />
        )}

        {activeTab === 'matrix' && (
          <AnalyticsMatrixTab records={records} onSelectGame={(g) => setSelectedGame(g)} />
        )}

        {activeTab === 'report' && (
          <DetailedReportTab records={records} kpi={dataset.kpi} />
        )}
      </main>

      {/* Game Detail Drawer Modal */}
      <GameDetailModal game={selectedGame} onClose={() => setSelectedGame(null)} />

      {/* Vercel Deploy Guide Modal */}
      <VercelDeployModal isOpen={isDeployModalOpen} onClose={() => setIsDeployModalOpen(false)} />
    </div>
  );
}
