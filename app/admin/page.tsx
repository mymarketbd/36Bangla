'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { loadStore, saveStore, Bangla36State } from '@/lib/store';
import { BribeReport, WhitelistOffice } from '@/lib/types';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  StarIcon,
  CloseIcon,
  CheckIcon,
  UserIcon,
  ImageIcon,
  FileTextIcon
} from '@/components/Icons';

export default function AdminPage() {
  const [store, setStore] = useState<Bangla36State | null>(null);
  const [activeTab, setActiveTab] = useState<'reports' | 'whitelist'>('reports');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setStore(loadStore());
  }, []);

  const updateStore = (updater: (prev: Bangla36State) => Bangla36State) => {
    setStore((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      saveStore(next);
      return next;
    });
  };

  const reports = store?.reports || [];
  const whitelist = store?.whitelist || [];

  // Handlers
  const handleToggleVerify = (reportId: string) => {
    updateStore((prev) => ({
      ...prev,
      reports: prev.reports.map((r) =>
        r.id === reportId ? { ...r, isVerified: !r.isVerified } : r
      )
    }));
    setToast('ভেরিফিকেশন স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে');
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteReport = (reportId: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই রিপোর্টটি মুছে ফেলতে চান?')) return;
    updateStore((prev) => ({
      ...prev,
      reports: prev.reports.filter((r) => r.id !== reportId)
    }));
    setToast('পোস্টটি সফলভাবে ডিলিট করা হয়েছে');
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeleteWhitelist = (wlId: string) => {
    if (!confirm('আপনি কি নিশ্চিত যে এই হোয়াইটলিস্টটি মুছে ফেলতে চান?')) return;
    updateStore((prev) => ({
      ...prev,
      whitelist: prev.whitelist.filter((w) => w.id !== wlId)
    }));
    setToast('হোয়াইটলিস্ট এন্ট্রি ডিলিট করা হয়েছে');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 flex flex-col font-sans">
      <Header
        onOpenReport={() => {}}
        onOpenWhitelist={() => {}}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8 flex-1">
        {toast && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl font-bold text-xs flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-emerald-600" />
              <span>{toast}</span>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-500 hover:text-slate-800 p-1">
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheckIcon className="w-4 h-4 text-emerald-600" />
              <span>সিকিউর সুপার অ্যাডমিন প্যানেল</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 pt-1">
              মডারেশন ও ভেরিফিকেশন ব্যাকঅফিস
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="smart-btn-secondary px-4 py-2.5 text-xs font-bold transition bg-white"
            >
              ← পাবলিক ফিডে ফিরুন
            </Link>
          </div>
        </div>

        {/* Stats Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="smart-stat-card">
            <span className="text-slate-500 text-xs font-bold uppercase">মোট সক্রিয় পোস্ট</span>
            <span className="font-mono text-3xl font-black text-slate-900 block">{reports.length}</span>
          </div>

          <div className="smart-stat-card">
            <span className="text-slate-500 text-xs font-bold uppercase">ভেরিফাইড ব্যাজপ্রাপ্ত</span>
            <span className="font-mono text-3xl font-black text-emerald-700 block">
              {reports.filter((r) => r.isVerified).length}
            </span>
          </div>

          <div className="smart-stat-card">
            <span className="text-slate-500 text-xs font-bold uppercase">হোয়াইটলিস্ট অফিস</span>
            <span className="font-mono text-3xl font-black text-amber-600 block">{whitelist.length}</span>
          </div>

          <div className="smart-stat-card">
            <span className="text-slate-500 text-xs font-bold uppercase">ফিচার অনুরোধ</span>
            <span className="font-mono text-3xl font-black text-cyan-700 block">
              {store?.features.length || 0}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-slate-900 text-white font-black shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileTextIcon className="w-3.5 h-3.5" />
            <span>অভিযোগ রিপোর্ট তালিকা ({reports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('whitelist')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'whitelist'
                ? 'bg-amber-500 text-white font-black shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <StarIcon className="w-3.5 h-3.5 text-amber-400" />
            <span>ঘুষমুক্ত হোয়াইটলিস্ট ({whitelist.length})</span>
          </button>
        </div>

        {/* Tab 1: Reports Moderation Table */}
        {activeTab === 'reports' && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">দপ্তর / স্পট</th>
                    <th className="p-4">ক্যাটাগরি ও স্থান</th>
                    <th className="p-4">সেবা ও পদবি</th>
                    <th className="p-4">ছবি / প্রমাণ</th>
                    <th className="p-4">অঙ্ক (BDT)</th>
                    <th className="p-4">ফলাফল</th>
                    <th className="p-4">ভেরিফিকেশন</th>
                    <th className="p-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reports.map((report) => (
                    <tr key={report.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-slate-900 max-w-[200px] truncate">
                        {report.officeName}
                        <span className="block text-[10px] text-slate-500">{report.department}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-bold text-slate-800">{report.district}</span>
                        <span className="block text-[10px] text-emerald-700 font-bold">{report.category}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-slate-900 font-semibold">{report.service}</span>
                        <span className="block text-[10px] text-slate-500">{report.officerDesignation || '—'}</span>
                      </td>
                      <td className="p-4">
                        {report.accusedPhotoUrl ? (
                          <span className="inline-flex items-center gap-1 text-rose-700 font-bold text-[10px] bg-rose-50 px-2 py-0.5 rounded">
                            <UserIcon className="w-3 h-3 text-rose-600" />
                            <span>অভিযুক্তের ছবি</span>
                          </span>
                        ) : report.evidenceFiles?.length > 0 ? (
                          <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-emerald-600" />
                            <span>{report.evidenceFiles.length} ফাইল</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">নেই</span>
                        )}
                      </td>
                      <td className="p-4 font-mono font-black text-amber-700">
                        ৳{report.amount.toLocaleString('en-BD')}
                      </td>
                      <td className="p-4">
                        {report.outcome === 'PAID' ? (
                          <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 px-2 py-0.5 rounded font-bold">বাধ্য হয়ে প্রদান</span>
                        ) : report.outcome === 'REFUSED' ? (
                          <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">প্রত্যাখ্যান</span>
                        ) : (
                          <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded font-bold">পেন্ডিং</span>
                        )}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleVerify(report.id)}
                          className={`px-3 py-1 rounded-lg font-bold text-[10px] transition cursor-pointer ${
                            report.isVerified
                              ? 'bg-emerald-600 text-white font-black shadow-sm'
                              : 'bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {report.isVerified ? '✓ Verified' : 'Unverified'}
                        </button>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteReport(report.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-[10px] font-bold transition cursor-pointer"
                        >
                          ডিলিট
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Whitelist Moderation Table */}
        {activeTab === 'whitelist' && (
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-black text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-4">অফিস ও দপ্তর</th>
                    <th className="p-4">জেলা</th>
                    <th className="p-4">প্রশংসিত সেবা</th>
                    <th className="p-4">সৎ কর্মকর্তা</th>
                    <th className="p-4">রেটিং</th>
                    <th className="p-4">সমর্থন</th>
                    <th className="p-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {whitelist.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-slate-900 max-w-[200px] truncate">
                        {item.officeName}
                        <span className="block text-[10px] text-amber-700 font-semibold">{item.department}</span>
                      </td>
                      <td className="p-4">{item.district}</td>
                      <td className="p-4 text-slate-900 font-semibold">{item.servicePraised}</td>
                      <td className="p-4 text-emerald-700 font-bold">{item.officerName || '—'}</td>
                      <td className="p-4 text-amber-500 font-bold">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
                            <StarIcon key={i} className="w-3 h-3 text-amber-500" />
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-mono font-bold text-emerald-700">{item.upvotesCount}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteWhitelist(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-[10px] font-bold transition cursor-pointer"
                        >
                          ডিলিট
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
