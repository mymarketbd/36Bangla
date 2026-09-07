'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CategoryPills from '@/components/CategoryPills';
import FeedComposer from '@/components/FeedComposer';
import NewsfeedCard from '@/components/NewsfeedCard';
import SidebarNavigation from '@/components/SidebarNavigation';
import TrendingSidebar from '@/components/TrendingSidebar';
import ReportModal from '@/components/ReportModal';
import WhitelistModal from '@/components/WhitelistModal';
import { loadStore, saveStore, Bangla36State } from '@/lib/store';
import { Division, IncidentCategory, BribeReport } from '@/lib/types';

export default function HomePage() {
  const [store, setStore] = useState<Bangla36State | null>(null);
  const [activeCategory, setActiveCategory] = useState<IncidentCategory | 'ALL' | string>('ALL');
  const [selectedDivision, setSelectedDivision] = useState<Division | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);
  const [modalCategory, setModalCategory] = useState<IncidentCategory>('BRIBE');
  const [modalPhoto, setModalPhoto] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    setStore(loadStore());
  }, []);

  // Update store helper
  const updateStore = (updater: (prev: Bangla36State) => Bangla36State) => {
    setStore((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      saveStore(next);
      return next;
    });
  };

  const reports = store?.reports || [];
  const comments = store?.comments || [];

  // Filter Reports
  const approvedReports = reports.filter((r) => r.moderationStatus === 'APPROVED');

  const filteredReports = approvedReports.filter((r) => {
    // Category match
    let matchCategory = true;
    if (activeCategory !== 'ALL') {
      if (activeCategory === 'BRIBE') matchCategory = r.category === 'BRIBE';
      else if (activeCategory === 'HOSPITAL') matchCategory = r.category === 'HOSPITAL';
      else if (activeCategory === 'EXTORTION') matchCategory = r.category === 'EXTORTION';
      else if (activeCategory === 'UNIVERSITY') matchCategory = r.category === 'UNIVERSITY';
      else if (activeCategory === 'LAND') matchCategory = r.department.includes('ভূমি');
      else if (activeCategory === 'OTHER') matchCategory = !['BRIBE', 'HOSPITAL', 'EXTORTION', 'UNIVERSITY'].includes(r.category || '') && !r.department.includes('ভূমি');
    }

    // Division match
    const matchDiv = selectedDivision === 'ALL' || r.division === selectedDivision;

    // Search query match
    const matchSearch =
      !searchQuery.trim() ||
      (r.officeName && r.officeName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.district && r.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.service && r.service.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.description && r.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.hospitalSection && r.hospitalSection.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.extortionSpot && r.extortionSpot.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.universityName && r.universityName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.officerName && r.officerName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchDiv && matchSearch;
  });

  // Truth / False Voting Handler
  const handleTruthVote = (reportId: string, voteType: 'TRUE' | 'FALSE') => {
    updateStore((prev) => {
      const currentVote = prev.userTruthVotes?.[reportId];
      const nextTruthVotes = { ...(prev.userTruthVotes || {}) };

      const updatedReports = prev.reports.map((r) => {
        if (r.id !== reportId) return r;

        let trueVotes = r.trueVotesCount || r.confirmationsCount || 0;
        let falseVotes = r.falseVotesCount || 0;

        if (currentVote === voteType) {
          // Unvote
          if (voteType === 'TRUE') trueVotes = Math.max(0, trueVotes - 1);
          if (voteType === 'FALSE') falseVotes = Math.max(0, falseVotes - 1);
          delete nextTruthVotes[reportId];
        } else {
          // Switch or new vote
          if (currentVote === 'TRUE') trueVotes = Math.max(0, trueVotes - 1);
          if (currentVote === 'FALSE') falseVotes = Math.max(0, falseVotes - 1);

          if (voteType === 'TRUE') trueVotes += 1;
          if (voteType === 'FALSE') falseVotes += 1;
          nextTruthVotes[reportId] = voteType;
        }

        return {
          ...r,
          trueVotesCount: trueVotes,
          falseVotesCount: falseVotes,
          confirmationsCount: trueVotes
        };
      });

      return {
        ...prev,
        reports: updatedReports,
        userTruthVotes: nextTruthVotes
      };
    });
  };

  const handleAddComment = (reportId: string, author: string, text: string) => {
    const newComm = {
      id: 'c-' + Date.now(),
      reportId,
      authorAlias: author,
      comment: text,
      createdAt: new Date().toISOString()
    };
    updateStore((prev) => ({
      ...prev,
      comments: [newComm, ...prev.comments]
    }));
  };

  const handleOpenComposer = (cat?: IncidentCategory, preloadedImage?: string) => {
    setModalCategory(cat || 'BRIBE');
    setModalPhoto(preloadedImage || '');
    setIsReportModalOpen(true);
  };

  const handleQuickPost = (text: string) => {
    const newReport: BribeReport = {
      id: 'rep-' + Date.now(),
      category: 'BRIBE',
      department: 'অন্যান্য সরকারি দপ্তর ও খাত',
      service: 'নাগরিক প্রত্যক্ষ অনিয়ম অভিযোগ',
      division: selectedDivision !== 'ALL' ? selectedDivision : 'Dhaka',
      district: 'ঢাকা',
      officeName: 'নাগরিক অভিযোগ',
      amount: 0,
      outcome: 'PENDING',
      description: text,
      evidenceFiles: [],
      confirmationsCount: 1,
      trueVotesCount: 1,
      falseVotesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      authorName: 'বেনামী নাগরিক',
      isVerified: false,
      moderationStatus: 'APPROVED',
      createdAt: new Date().toISOString()
    };

    updateStore((prev) => ({
      ...prev,
      reports: [newReport, ...prev.reports]
    }));

    setSuccessToast('আপনার অভিযোগটি সফলভাবে নিউজফিডে পোস্ট হয়েছে।');
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleNewReportSubmit = (data: any) => {
    const newReport: BribeReport = {
      id: 'rep-' + Date.now(),
      ...data,
      confirmationsCount: 1,
      trueVotesCount: 1,
      falseVotesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      authorName: 'বেনামী নাগরিক',
      isVerified: false,
      moderationStatus: 'APPROVED',
      createdAt: new Date().toISOString()
    };

    updateStore((prev) => ({
      ...prev,
      reports: [newReport, ...prev.reports]
    }));

    setIsReportModalOpen(false);
    setModalPhoto('');
    setSuccessToast('আপনার অভিযোগটি সফলভাবে নিউজফিডে পোস্ট হয়েছে।');
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-slate-900 flex flex-col font-sans antialiased selection:bg-[#4F46E5] selection:text-white">
      {/* 1. Clean White Sticky Header */}
      <Header
        onOpenReport={() => handleOpenComposer('BRIBE')}
        onResetHome={() => {
          setActiveCategory('ALL');
          setSearchQuery('');
          setSelectedDivision('ALL');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDivision={selectedDivision}
        onSelectDivision={setSelectedDivision}
      />

      {/* 2. Top Category Pills Filter Bar */}
      <div className="bg-[#F4F6FB] border-b border-slate-200/50 pt-2 pb-1">
        <div className="max-w-7xl mx-auto px-4">
          <CategoryPills
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
      </div>

      {/* 3. Main 3-Column Grid Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-5 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* Left Column: Navigation & Trending Topics (3 Cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-20">
            <SidebarNavigation
              onSelectTopic={(topic) => {
                setSearchQuery(topic);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Center Column: Main Feed Composer & Post Cards (6 Cols) */}
          <div className="col-span-1 lg:col-span-6 space-y-4">
            
            {/* Feed Composer Box */}
            <FeedComposer
              onOpenComposer={handleOpenComposer}
              onSubmitQuickPost={handleQuickPost}
            />

            {/* Success Toast */}
            {successToast && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold flex items-center justify-between shadow-xs animate-fade-in">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>{successToast}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccessToast(null)}
                  className="text-emerald-600 hover:text-emerald-900 p-0.5 cursor-pointer"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Feed Posts List */}
            {filteredReports.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200/70 shadow-xs space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-[#4F46E5] mx-auto flex items-center justify-center text-xl">
                  🔍
                </div>
                <h4 className="text-base font-bold text-slate-900">কোনো অভিযোগ পাওয়া যায়নি</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  আপনার অনুসন্ধান ফিল্টারের সাথে মিলে এমন কোনো পোস্ট পাওয়া যায়নি। ফিল্টার রিসেট করুন।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('ALL');
                    setSelectedDivision('ALL');
                    setSearchQuery('');
                  }}
                  className="px-4 py-1.5 rounded-xl bg-[#4F46E5] text-white text-xs font-semibold hover:bg-[#4338CA] transition cursor-pointer"
                >
                  ফিল্টার রিসেট করুন
                </button>
              </div>
            ) : (
              filteredReports.map((report) => (
                <NewsfeedCard
                  key={report.id}
                  report={report}
                  comments={comments}
                  userTruthVote={store?.userTruthVotes?.[report.id]}
                  onTruthVote={handleTruthVote}
                  onAddComment={handleAddComment}
                />
              ))
            )}
          </div>

          {/* Right Column: Ledger Summary, Hotlines, Citizen Banner (3 Cols) */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            <TrendingSidebar />
          </div>

        </div>
      </main>

      {/* Report Modal */}
      {isReportModalOpen && (
        <ReportModal
          initialCategory={modalCategory}
          preloadedImage={modalPhoto}
          onClose={() => {
            setIsReportModalOpen(false);
            setModalPhoto('');
          }}
          onSubmit={handleNewReportSubmit}
        />
      )}

      {/* Whitelist Modal */}
      {isWhitelistModalOpen && (
        <WhitelistModal
          onClose={() => setIsWhitelistModalOpen(false)}
          onSubmit={(data) => {
            updateStore((prev) => ({
              ...prev,
              whitelist: [
                {
                  id: 'w-' + Date.now(),
                  ...data,
                  upvotesCount: 1,
                  isVerified: true,
                  moderationStatus: 'APPROVED',
                  createdAt: new Date().toISOString()
                },
                ...prev.whitelist
              ]
            }));
            setIsWhitelistModalOpen(false);
            setSuccessToast('সৎ কর্মকর্তা/দপ্তরের তথ্য সফলভাবে যুক্ত হয়েছে।');
            setTimeout(() => setSuccessToast(null), 4000);
          }}
        />
      )}
    </div>
  );
}
