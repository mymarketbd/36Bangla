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
    <div style={{ minHeight: '100vh', backgroundColor: '#f4f6fb', display: 'flex', flexDirection: 'column' }}>
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

      {/* 2. Top Category Pills Filter Bar (Sticky below Header) */}
      <div
        style={{
          backgroundColor: '#f4f6fb',
          borderBottom: '1px solid #e9ecef',
          paddingTop: '8px',
          paddingBottom: '4px',
          position: 'sticky',
          top: '56px',
          zIndex: 40
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <CategoryPills
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
      </div>

      {/* 3. Main 3-Column Grid Container */}
      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            alignItems: 'start'
          }}
          className="main-grid-layout"
        >
          {/* Left Column: Navigation & Trending Topics (Sticky) */}
          <div className="left-sidebar-col no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <SidebarNavigation
              onSelectTopic={(topic) => {
                setSearchQuery(topic);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>

          {/* Center Column: Main Feed Composer & Post Cards */}
          <div className="center-feed-col" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Feed Composer Box */}
            <FeedComposer
              onOpenComposer={handleOpenComposer}
              onSubmitQuickPost={handleQuickPost}
            />

            {/* Success Toast */}
            {successToast && (
              <div
                style={{
                  backgroundColor: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#065f46',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>✓</span>
                  <span>{successToast}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSuccessToast(null)}
                  style={{ background: 'transparent', border: 'none', color: '#059669', cursor: 'pointer', padding: '2px' }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* Feed Posts List */}
            {filteredReports.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '18px',
                  padding: '36px',
                  textAlign: 'center',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '9999px',
                    backgroundColor: '#eef2ff',
                    color: '#5b3cf5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}
                >
                  🔍
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: 0 }}>কোনো অভিযোগ পাওয়া যায়নি</h4>
                <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '360px', margin: 0 }}>
                  আপনার অনুসন্ধান ফিল্টারের সাথে মিলে এমন কোনো পোস্ট পাওয়া যায়নি। ফিল্টার রিসেট করুন।
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('ALL');
                    setSelectedDivision('ALL');
                    setSearchQuery('');
                  }}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '10px',
                    backgroundColor: '#5b3cf5',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    marginTop: '4px'
                  }}
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

          {/* Right Column: Ledger Summary, Hotlines, Citizen Banner (Sticky) */}
          <div className="right-sidebar-col no-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
