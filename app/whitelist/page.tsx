'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhitelistModal from '@/components/WhitelistModal';
import ReportModal from '@/components/ReportModal';
import { loadStore, saveStore, Bangla36State } from '@/lib/store';
import { WhitelistOffice, DepartmentCategory } from '@/lib/types';
import {
  StarIcon,
  BuildingIcon,
  LocationPinIcon,
  UserIcon,
  ThumbUpIcon,
  SearchIcon,
  CloseIcon,
  CheckIcon
} from '@/components/Icons';

export default function WhitelistPage() {
  const [store, setStore] = useState<Bangla36State | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<DepartmentCategory | 'ALL'>('ALL');
  const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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

  const whitelist = store?.whitelist || [];
  const userVotes = store?.userVotes || [];

  const filteredWhitelist = whitelist.filter((item) => {
    const matchDept = selectedDept === 'ALL' || item.department === selectedDept;
    const matchSearch =
      !searchQuery.trim() ||
      item.officeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.servicePraised.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.positiveReview.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchSearch;
  });

  const handleUpvote = (itemId: string) => {
    const isVoted = userVotes.includes(itemId);
    updateStore((prev) => {
      const nextVotes = isVoted
        ? prev.userVotes.filter((id) => id !== itemId)
        : [...prev.userVotes, itemId];

      const nextList = prev.whitelist.map((w) => {
        if (w.id === itemId) {
          return {
            ...w,
            upvotesCount: isVoted ? w.upvotesCount - 1 : w.upvotesCount + 1
          };
        }
        return w;
      });

      return {
        ...prev,
        whitelist: nextList,
        userVotes: nextVotes
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 flex flex-col font-sans">
      <Header
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenWhitelist={() => setIsWhitelistModalOpen(true)}
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

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-amber-50/90 via-white to-slate-50 border border-amber-200/90 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span className="bg-amber-100 text-amber-800 border border-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
              <StarIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>সৎ ও ঘুষমুক্ত অফিসের স্বীকৃতি</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              যেসব দপ্তরে কোনো ঘুষ লাগে না — সততার হল অব ফেম
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              দুর্নীতির তথ্য প্রকাশের পাশাপাশি যেসব কর্মকর্তা ও অফিসে সম্পূর্ণ সততা ও আন্তরিকতার সাথে সেবা প্রদান করা হয়, তাদের প্রতি সামাজিক কৃতজ্ঞতা ও সম্মান প্রদর্শনের পাবলিক প্ল্যাটফর্ম।
            </p>
          </div>

          <button
            onClick={() => setIsWhitelistModalOpen(true)}
            className="smart-btn-emerald px-7 py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider shrink-0 cursor-pointer flex items-center gap-2"
          >
            <StarIcon className="w-4 h-4 text-amber-300" />
            <span>+ একটি সৎ অফিসের প্রশংসা করুন</span>
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 flex flex-col sm:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <SearchIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="অফিস, জেলা বা সেবার নাম দিয়ে সার্চ করুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 outline-none focus:border-amber-400 transition"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value as any)}
            className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs text-slate-700 font-bold outline-none focus:border-amber-400 transition"
          >
            <option value="ALL">সব সরকারি দপ্তর</option>
            <option value="পাসপোর্ট ও ইমিগ্রেশন">পাসপোর্ট ও ইমিগ্রেশন</option>
            <option value="ভূমি অফিস ও রেজিস্ট্রি">ভূমি অফিস ও রেজিস্ট্রি</option>
            <option value="পুলিশ ও ট্রাফিক">পুলিশ ও ট্রাফিক</option>
            <option value="বিআরটিএ (BRTA)">বিআরটিএ (BRTA)</option>
            <option value="বিচার বিভাগ ও আদালত">বিচার বিভাগ ও আদালত</option>
            <option value="পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা">পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা</option>
          </select>
        </div>

        {/* Whitelist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWhitelist.map((item) => {
            const isVoted = userVotes.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-amber-300 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-xs font-extrabold px-3 py-1 rounded-xl flex items-center gap-1.5">
                      <BuildingIcon className="w-3.5 h-3.5 text-amber-600" />
                      <span>{item.department}</span>
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      {Array.from({ length: Math.round(item.rating) }).map((_, i) => (
                        <StarIcon key={i} className="w-3 h-3 text-amber-500" />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 leading-snug">{item.officeName}</h3>
                    <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
                      <LocationPinIcon className="w-3 h-3 text-slate-400" />
                      <span>{item.district} জেলা</span>
                    </p>
                  </div>

                  {item.officerPhotoUrl && (
                    <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
                      <img src={item.officerPhotoUrl} alt="Honest Officer" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">সৎ কর্মকর্তা</span>
                        <strong className="text-xs text-slate-900 font-extrabold">{item.officerName || 'কর্মকর্তা'}</strong>
                        <span className="text-[10px] text-emerald-700 block">{item.officerDesignation}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1">
                    <div>
                      <span className="text-slate-500 font-medium">প্রশংসিত সেবা: </span>
                      <strong className="text-slate-900 font-bold">{item.servicePraised}</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic bg-amber-50/40 p-3 rounded-2xl border border-amber-100">
                    "{item.positiveReview}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition cursor-pointer ${
                      isVoted
                        ? 'bg-amber-500 text-white font-black shadow-sm'
                        : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-amber-300'
                    }`}
                  >
                    <ThumbUpIcon className="w-3.5 h-3.5" />
                    <span>সমর্থন জানাই</span>
                    <span className="text-[11px] font-mono font-black">{item.upvotesCount}</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-medium">
                    {new Date(item.createdAt).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Modals */}
      {isWhitelistModalOpen && (
        <WhitelistModal
          onClose={() => setIsWhitelistModalOpen(false)}
          onSubmit={(data) => {
            const newWl: WhitelistOffice = {
              id: 'wl-' + Date.now(),
              ...data,
              upvotesCount: 1,
              isVerified: true,
              moderationStatus: 'APPROVED',
              createdAt: new Date().toISOString()
            };
            updateStore((prev) => ({ ...prev, whitelist: [newWl, ...prev.whitelist] }));
            setIsWhitelistModalOpen(false);
            setToast('সৎ অফিসের প্রশংসা যুক্ত হয়েছে!');
          }}
        />
      )}

      {isReportModalOpen && (
        <ReportModal
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={() => setIsReportModalOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}
