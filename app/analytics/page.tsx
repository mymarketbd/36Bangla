'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DistributionChart from '@/components/DistributionChart';
import ReportModal from '@/components/ReportModal';
import WhitelistModal from '@/components/WhitelistModal';
import { loadStore, Bangla36State } from '@/lib/store';
import { ChartIcon, DownloadIcon, FileTextIcon } from '@/components/Icons';

export default function AnalyticsPage() {
  const [store, setStore] = useState<Bangla36State | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);

  useEffect(() => {
    setStore(loadStore());
  }, []);

  const reports = store?.reports || [];
  const approvedReports = reports.filter((r) => r.moderationStatus === 'APPROVED');

  // CSV Export Handler
  const handleExportCSV = () => {
    const headers = ['ID', 'Category', 'Department', 'Service', 'Division', 'District', 'OfficeName', 'Amount_BDT', 'Outcome', 'OfficerDesignation', 'OfficerName', 'Confirmations', 'Verified', 'CreatedAt'];
    const rows = approvedReports.map((r) => [
      r.id,
      `"${r.category || 'BRIBE'}"`,
      `"${r.department}"`,
      `"${r.service.replace(/"/g, '""')}"`,
      `"${r.division}"`,
      `"${r.district}"`,
      `"${r.officeName.replace(/"/g, '""')}"`,
      r.amount,
      r.outcome,
      `"${(r.officerDesignation || '').replace(/"/g, '""')}"`,
      `"${(r.officerName || '').replace(/"/g, '""')}"`,
      r.confirmationsCount,
      r.isVerified ? 'YES' : 'NO',
      r.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `36bangla_open_data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // JSON Export Handler
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(approvedReports, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `36bangla_open_data_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 flex flex-col font-sans">
      <Header
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenWhitelist={() => setIsWhitelistModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8 flex-1">
        {/* Banner */}
        <div className="bg-gradient-to-r from-cyan-50/90 via-white to-slate-50 border border-cyan-200/90 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span className="bg-cyan-100 text-cyan-800 border border-cyan-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <ChartIcon className="w-3.5 h-3.5 text-cyan-600" />
              <span>ওপেন ডেটা ও পাবলিক পলিসি পোর্টাল</span>
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              উন্মুক্ত পরিসংখ্যান ও বাল্ক ডেটা ডাউনলোড
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              গবেষক, অনুসন্ধানী সাংবাদিক এবং নাগরিক অধিকার কর্মীদের জন্য সম্পূর্ণ ডেটাসেট ক্রিয়েটিভ কমন্স (CC BY 4.0) উন্মুক্ত লাইসেন্সে ডাউনলোডের জন্য প্রস্তুত।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleExportCSV}
              className="smart-btn-emerald px-6 py-3.5 text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <DownloadIcon className="w-4 h-4" />
              <span>CSV ডাউনলোড</span>
            </button>
            <button
              onClick={handleExportJSON}
              className="smart-btn-secondary px-6 py-3.5 text-xs font-bold text-cyan-700 border-cyan-300 hover:border-cyan-400 flex items-center gap-2 cursor-pointer bg-white"
            >
              <DownloadIcon className="w-4 h-4 text-cyan-600" />
              <span>JSON ডাউনলোড</span>
            </button>
          </div>
        </div>

        {/* Distribution Chart */}
        <DistributionChart reports={approvedReports} />

        {/* License & Attribution Notice */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-3 text-xs text-slate-600 shadow-sm">
          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
            <FileTextIcon className="w-4 h-4 text-slate-500" />
            <span>ওপেন ডেটা লাইসেন্স শর্তাবলী (Creative Commons Attribution 4.0 International)</span>
          </h4>
          <p className="leading-relaxed text-slate-600">
            আপনি এই ডেটাসেট যে কোনো গবেষণা, সংবাদ প্রতিবেদন, শিক্ষামূলক বা পলিসি সংস্কারের কাজে অবাধে ব্যবহার, শেয়ার ও বিশ্লেষণ করতে পারবেন। শুধুমাত্র কৃতজ্ঞতা স্বীকার হিসেবে <strong>"উৎস: 36 Bangla (৩৬ বাংলা)"</strong> উল্লেখ করার অনুরোধ করা হলো।
          </p>
        </div>
      </main>

      {isReportModalOpen && (
        <ReportModal
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={() => setIsReportModalOpen(false)}
        />
      )}

      {isWhitelistModalOpen && (
        <WhitelistModal
          onClose={() => setIsWhitelistModalOpen(false)}
          onSubmit={() => setIsWhitelistModalOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}
