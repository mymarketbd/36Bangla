'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeedComposer from '@/components/FeedComposer';
import NewsfeedCard from '@/components/NewsfeedCard';
import SidebarNavigation from '@/components/SidebarNavigation';
import TrendingSidebar from '@/components/TrendingSidebar';
import ReportModal from '@/components/ReportModal';
import WhitelistModal from '@/components/WhitelistModal';
import DistributionChart from '@/components/DistributionChart';
import { loadStore, saveStore, Bangla36State } from '@/lib/store';
import { Division, IncidentCategory, BribeReport } from '@/lib/types';
import {
  ShieldCheckIcon,
  CloseIcon,
  CheckIcon,
  FeedIcon,
  PenIcon,
  SearchIcon,
  BribeIcon,
  HospitalIcon,
  ExtortionIcon,
  UniversityIcon
} from '@/components/Icons';

export default function HomePage() {
  const [store, setStore] = useState<Bangla36State | null>(null);
  const [activeCategory, setActiveCategory] = useState<IncidentCategory | 'ALL'>('ALL');
  const [selectedDivision, setSelectedDivision] = useState<Division | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
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
  const userTruthVotes = store?.userTruthVotes || {};

  // Filter Reports
  const approvedReports = reports.filter((r) => r.moderationStatus === 'APPROVED');

  const counts = {
    all: approvedReports.length,
    bribe: approvedReports.filter((r) => !r.category || r.category === 'BRIBE').length,
    hospital: approvedReports.filter((r) => r.category === 'HOSPITAL').length,
    extortion: approvedReports.filter((r) => r.category === 'EXTORTION').length,
    university: approvedReports.filter((r) => r.category === 'UNIVERSITY').length
  };

  const filteredReports = approvedReports.filter((r) => {
    const reportCat = r.category || 'BRIBE';
    const matchCategory = activeCategory === 'ALL' || reportCat === activeCategory;
    const matchDiv = selectedDivision === 'ALL' || r.division === selectedDivision;
    const matchVerified = !verifiedOnly || r.isVerified;
    const matchSearch =
      !searchQuery.trim() ||
      r.officeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.hospitalSection && r.hospitalSection.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.extortionSpot && r.extortionSpot.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.universityName && r.universityName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.universityDeptHall && r.universityDeptHall.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.officerName && r.officerName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCategory && matchDiv && matchVerified && matchSearch;
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
          // Already recorded as this vote type
          return r;
        }

        // Switch or new vote
        if (currentVote === 'TRUE') trueVotes = Math.max(0, trueVotes - 1);
        if (currentVote === 'FALSE') falseVotes = Math.max(0, falseVotes - 1);

        if (voteType === 'TRUE') trueVotes += 1;
        if (voteType === 'FALSE') falseVotes += 1;

        nextTruthVotes[reportId] = voteType;

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
    <div className="h-screen bg-[#f0f2f5] text-slate-900 flex flex-col font-sans antialiased selection:bg-purple-600 selection:text-white overflow-hidden">
      {/* 1. Fixed Header with Integrated Filter Bar */}
      <Header
        onOpenReport={() => handleOpenComposer('BRIBE')}
        onOpenWhitelist={() => setIsWhitelistModalOpen(true)}
        onResetHome={() => {
          setActiveCategory('ALL');
          setSearchQuery('');
          setSelectedDivision('ALL');
          setVerifiedOnly(false);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        selectedDivision={selectedDivision}
        onSelectDivision={setSelectedDivision}
        verifiedOnly={verifiedOnly}
        onToggleVerified={() => setVerifiedOnly(!verifiedOnly)}
        counts={counts}
        totalFilteredCount={filteredReports.length}
      />

      {/* 2. Main 12-Column Responsive Layout (Stationary Sidebars + Scrollable Newsfeed) */}
      <div
        style={{
          paddingTop: '18px',
          paddingBottom: '18px'
        }}
        className="flex-1 overflow-hidden w-full"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
            gap: '15px'
          }}
          className="max-w-7xl w-full mx-auto h-full px-3 sm:px-4 md:px-6 overflow-hidden items-start"
        >
          {/* Left Column (3 of 12 Grids = 25%) - FIXED / STATIONARY */}
          <aside
            style={{ minWidth: 0 }}
            className="sidebar-left-col h-full overflow-y-auto overflow-x-hidden scrollbar-none pb-20 pt-1.5 space-y-[15px]"
          >
            <SidebarNavigation
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              counts={counts}
            />
          </aside>

          {/* Center Newsfeed Column (6 of 12 Grids = 50%) - ONLY THIS NEWSFEED SCROLLS! */}
          <div
            style={{ minWidth: 0 }}
            className="newsfeed-center-col h-full overflow-y-auto scrollbar-none px-1 pt-1.5 space-y-[15px] pb-32"
          >
            {/* Success Alert Toast */}
            {successToast && (
              <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3.5 rounded-2xl text-xs font-normal flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <CheckIcon size={14} className="text-blue-600" />
                  <span>{successToast}</span>
                </div>
                <button onClick={() => setSuccessToast(null)} style={{ border: 'none' }} className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer">
                  <CloseIcon size={12} />
                </button>
              </div>
            )}

            {/* Anonymous Post Composer (At Top of Feed Column) */}
            <FeedComposer onOpenComposer={handleOpenComposer} />

            {/* Newsfeed Posts Stream */}
            <div className="space-y-[18px]">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <NewsfeedCard
                    key={report.id}
                    report={report}
                    comments={comments}
                    userTruthVote={userTruthVotes[report.id]}
                    onTruthVote={handleTruthVote}
                    onAddComment={handleAddComment}
                  />
                ))
              ) : (
                <div className="bg-white rounded-2xl p-8 text-center space-y-3 shadow-xs">
                  <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                    <FeedIcon size={20} />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900">এই বিভাগে কোনো অভিযোগ পাওয়া যায়নি</h3>
                  <p className="text-xs text-slate-500 font-normal max-w-sm mx-auto leading-relaxed">
                    আপনার কোনো অভিজ্ঞতা বা অভিযোগ থাকলে তথ্য ও ছবি দিয়ে প্রথম পোস্টটি করুন।
                  </p>
                  <button
                    onClick={() => handleOpenComposer(activeCategory === 'ALL' ? 'BRIBE' : activeCategory)}
                    style={{ border: 'none', background: 'linear-gradient(135deg, #633ef8, #5027eb)', color: '#ffffff', boxShadow: '0 3px 12px rgba(80, 39, 235, 0.3)' }}
                    className="hover:opacity-95 px-5 py-2.5 rounded-full text-xs font-bold mt-2 inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                  >
                    <PenIcon size={12} className="text-white" />
                    <span>নতুন অভিযোগ পোস্ট করুন</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (3 of 12 Grids = 25%) - FIXED / STATIONARY */}
          <aside
            style={{ minWidth: 0 }}
            className="sidebar-right-col h-full overflow-y-auto overflow-x-hidden scrollbar-none pb-16 space-y-[15px]"
          >
            <TrendingSidebar
              reports={approvedReports}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </aside>
        </div>
      </div>

      {/* Modals */}
      {isReportModalOpen && (
        <ReportModal
          initialCategory={modalCategory}
          initialPhoto={modalPhoto}
          onClose={() => {
            setIsReportModalOpen(false);
            setModalPhoto('');
          }}
          onSubmit={handleNewReportSubmit}
        />
      )}

      {isWhitelistModalOpen && (
        <WhitelistModal
          onClose={() => setIsWhitelistModalOpen(false)}
          onSubmit={() => setIsWhitelistModalOpen(false)}
        />
      )}
    </div>
  );
}


