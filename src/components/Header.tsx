'use client';

import React from 'react';
import { Gamepad2, Search, Download, ExternalLink } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onOpenDeployModal: () => void;
  onExportCsv: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  onOpenDeployModal,
  onExportCsv,
}) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo & Judul */}
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 shadow-lg shadow-cyan-500/20 text-white animate-pulse-glow">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                Pusat Analitik Trend YouTube Gaming
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                v3.8.15
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Pipeline Analitik Deskriptif & Performa Interaksi Penonton
            </p>
          </div>
        </div>

        {/* Kontrol Aksi & Pencarian */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {/* Kotak Pencarian */}
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari game..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 transition-all"
            />
          </div>

          {/* Tombol Ekspor */}
          <button
            onClick={onExportCsv}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700/60 rounded-xl transition-all shadow-sm"
            title="Unduh dataset olahan sebagai CSV"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            Ekspor CSV
          </button>

          {/* Tombol Deploy Vercel */}
          <button
            onClick={onOpenDeployModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-xl shadow-md shadow-emerald-500/20 transition-all"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Hosting di Vercel
          </button>
        </div>
      </div>
    </header>
  );
};
