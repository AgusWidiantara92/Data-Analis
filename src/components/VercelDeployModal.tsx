'use client';

import React, { useState } from 'react';
import { X, Check, Copy, Terminal, Rocket, GitBranch } from 'lucide-react';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const vercelCliCmd = `npx vercel`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(vercelCliCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 space-y-6 border border-emerald-500/40 shadow-2xl relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight">
              Panduan Hosting: Deploy ke Vercel
            </h2>
            <p className="text-xs text-slate-400">
              Mempublikasikan Dashboard YouTube Gaming Next.js Anda dalam hitungan detik
            </p>
          </div>
        </div>

        {/* Instruksi Langkah demi Langkah */}
        <div className="space-y-4 text-xs">
          {/* Opsi 1: Vercel CLI */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between font-bold text-emerald-400">
              <span className="flex items-center gap-1.5 text-sm">
                <Terminal className="w-4 h-4" /> Opsi 1: Deploy dengan Vercel CLI
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px]">
                Direkomendasikan
              </span>
            </div>
            <p className="text-slate-300">
              Buka terminal di folder proyek <code className="bg-slate-800 text-cyan-300 px-1 py-0.5 rounded">youtube-gaming-dashboard</code> lalu jalankan:
            </p>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-cyan-300">
              <span>{vercelCliCmd}</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-2.5 py-1 text-[11px] rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Tersalin' : 'Salin'}
              </button>
            </div>
          </div>

          {/* Opsi 2: Repository GitHub */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between font-bold text-purple-400">
              <span className="flex items-center gap-1.5 text-sm">
                <GitBranch className="w-4 h-4" /> Opsi 2: Hubungkan via Repository GitHub
              </span>
            </div>
            <ol className="list-decimal list-inside text-slate-300 space-y-1.5 pl-1">
              <li>Push folder proyek ini ke akun GitHub Anda.</li>
              <li>Buka <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline">vercel.com/new</a> dan pilih repository Anda.</li>
              <li>Vercel akan otomatis mendeteksi konfigurasi framework <strong>Next.js</strong>.</li>
              <li>Klik <strong>Deploy</strong> — Vercel akan menghasilkan URL langsung (live URL) Anda!</li>
            </ol>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:opacity-90"
          >
            Paham, Ayo Deploy!
          </button>
        </div>
      </div>
    </div>
  );
};
