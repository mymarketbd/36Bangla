'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportModal from '@/components/ReportModal';
import WhitelistModal from '@/components/WhitelistModal';
import { loadStore, saveStore, Bangla36State } from '@/lib/store';
import { FeatureRequestItem } from '@/lib/types';
import {
  LightbulbIcon,
  UserIcon,
  ChatIcon,
  CheckIcon,
  CloseIcon,
  PenIcon
} from '@/components/Icons';

export default function FeedbackPage() {
  const [store, setStore] = useState<Bangla36State | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Features' | 'Bugs' | 'Improvements'>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);

  // New Request Form
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCategory, setNewCategory] = useState<'Features' | 'Bugs' | 'Improvements'>('Features');
  const [authorName, setAuthorName] = useState('');

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

  const features = store?.features || [];
  const userVotes = store?.userVotes || [];

  const filteredFeatures = selectedCategory === 'All'
    ? features
    : features.filter((f) => f.category === selectedCategory);

  const handleVoteFeature = (featureId: string) => {
    const isVoted = userVotes.includes(featureId);
    updateStore((prev) => {
      const nextVotes = isVoted
        ? prev.userVotes.filter((id) => id !== featureId)
        : [...prev.userVotes, featureId];

      const updatedFeatures = prev.features.map((f) => {
        if (f.id === featureId) {
          return {
            ...f,
            votesCount: isVoted ? f.votesCount - 1 : f.votesCount + 1
          };
        }
        return f;
      });

      return {
        ...prev,
        features: updatedFeatures,
        userVotes: nextVotes
      };
    });
  };

  const handleFeatureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;

    const newReq: FeatureRequestItem = {
      id: 'feat-' + Date.now(),
      title: newTitle.trim(),
      body: newBody.trim(),
      category: newCategory,
      status: 'PENDING',
      votesCount: 1,
      commentsCount: 0,
      authorName: authorName.trim() || 'নাগরিক',
      createdAt: new Date().toISOString()
    };

    updateStore((prev) => ({
      ...prev,
      features: [newReq, ...prev.features]
    }));

    setIsSubmitModalOpen(false);
    setNewTitle('');
    setNewBody('');
    setAuthorName('');
  };

  const getStatusBadge = (status: FeatureRequestItem['status']) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1"><CheckIcon className="w-3 h-3 text-emerald-600" /> সম্পন্ন হয়েছে</span>;
      case 'PROGRESS':
        return <span className="bg-purple-50 text-purple-700 border border-purple-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">● কাজ চলছে</span>;
      case 'PLANNED':
        return <span className="bg-blue-50 text-blue-700 border border-blue-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">পরিকল্পনাধীন</span>;
      case 'REVIEW':
        return <span className="bg-amber-50 text-amber-700 border border-amber-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">পর্যালোচনায়</span>;
      default:
        return <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full">পেন্ডিং</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 flex flex-col font-sans">
      <Header
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenWhitelist={() => setIsWhitelistModalOpen(true)}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8 flex-1">
        {/* Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-amber-700 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <LightbulbIcon className="w-4 h-4 text-amber-500" />
              <span>পাবলিক ফিডব্যাক ও কমিউনিটি রোডম্যাপ</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 pt-1">
              ফিচার অনুরোধ ও পরামর্শ বোর্ড
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              36 Bangla প্ল্যাটফর্মের নতুন কোনো ফিচারের প্রয়োজনীয়তা প্রস্তাব করুন এবং অন্যদের প্রস্তাবে ভোট দিন
            </p>
          </div>

          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="smart-btn-emerald px-6 py-3 text-xs font-black uppercase tracking-wider shrink-0 shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <PenIcon className="w-3.5 h-3.5" />
            <span>+ নতুন প্রস্তাব</span>
          </button>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {['All', 'Features', 'Bugs', 'Improvements'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white font-black shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'সব প্রস্তাব' : cat}
            </button>
          ))}
        </div>

        {/* Feature Requests List */}
        <div className="space-y-4">
          {filteredFeatures.map((feat) => {
            const isVoted = userVotes.includes(feat.id);
            return (
              <div
                key={feat.id}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 flex items-start gap-4 transition shadow-sm hover:shadow-md"
              >
                {/* Vote Button */}
                <button
                  onClick={() => handleVoteFeature(feat.id)}
                  className={`flex flex-col items-center justify-center w-14 h-16 rounded-2xl border transition shrink-0 cursor-pointer ${
                    isVoted
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm font-black'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400 hover:text-amber-700'
                  }`}
                >
                  <span className="text-base">▲</span>
                  <span className="font-mono text-sm font-black">{feat.votesCount}</span>
                </button>

                {/* Content */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                      {feat.title}
                    </h3>
                    {getStatusBadge(feat.status)}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                    {feat.body}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <UserIcon className="w-3 h-3 text-slate-400" />
                      <span>{feat.authorName}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <ChatIcon className="w-3 h-3 text-slate-400" />
                      <span>{feat.commentsCount} মন্তব্য</span>
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(feat.createdAt).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* New Feature Modal */}
      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div
            className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900">নতুন ফিচার বা আইডিয়া প্রস্তাব</h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400 hover:text-slate-800 p-1">
                <CloseIcon className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFeatureSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">প্রস্তাবের শিরোনাম *</label>
                <input
                  type="text"
                  placeholder="যেমন: অডিও রেকর্ড প্রমাণের অপশন চালু করুন"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold outline-none"
                >
                  <option value="Features">নতুন ফিচার (Features)</option>
                  <option value="Improvements">উন্নতি বা সংস্কার (Improvements)</option>
                  <option value="Bugs">বাগ রিপোর্ট (Bugs)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">বিস্তারিত বিবরণ *</label>
                <textarea
                  rows={4}
                  placeholder="কেন এই ফিচারটি দরকার এবং কীভাবে এটি সাধারণ মানুষকে সাহায্য করবে তা ব্যাখ্যা করুন..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-xs text-slate-900 outline-none focus:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">আপনার নাম / ছদ্মনাম</label>
                <input
                  type="text"
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full smart-btn-emerald py-3 text-xs font-black uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>প্রস্তাব জমা দিন</span>
                <CheckIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

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
