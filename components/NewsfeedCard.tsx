'use client';

import React, { useState, useEffect } from 'react';
import { BribeReport, CommunityComment } from '@/lib/types';
import { toBn } from '@/lib/format';
import {
  UsersIcon,
  CalendarIcon,
  LocationPinIcon,
  BookmarkIcon,
  ThreeDotsIcon,
  VoteBarsIcon,
  ChatIcon,
  ShareIcon,
  SmileIcon,
  CheckIcon,
  CloseIcon,
  UserIcon
} from './Icons';

interface NewsfeedCardProps {
  report: BribeReport;
  comments: CommunityComment[];
  userTruthVote?: 'TRUE' | 'FALSE';
  onTruthVote: (reportId: string, vote: 'TRUE' | 'FALSE') => void;
  onAddComment: (reportId: string, author: string, text: string) => void;
}

export default function NewsfeedCard({
  report,
  comments,
  userTruthVote,
  onTruthVote,
  onAddComment
}: NewsfeedCardProps) {
  const [showInlineComments, setShowInlineComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPollVote, setSelectedPollVote] = useState<'TRUE' | 'FALSE'>(userTruthVote || 'TRUE');
  
  // 1. Initial state: Closed by default. Opens on click "ভোট দিন", auto-closes 1s after voting.
  const [showPollBox, setShowPollBox] = useState(false);
  const [voteSubmittedToast, setVoteSubmittedToast] = useState(false);

  useEffect(() => {
    if (userTruthVote) {
      setSelectedPollVote(userTruthVote);
    }
  }, [userTruthVote]);

  const reportComments = comments.filter((c) => c.reportId === report.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(report.id, 'বেনামী নাগরিক', newComment.trim());
    setNewComment('');
    setShowInlineComments(true);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/?report=${report.id}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handleConfirmVote = () => {
    onTruthVote(report.id, selectedPollVote);
    setVoteSubmittedToast(true);
    setTimeout(() => setVoteSubmittedToast(false), 3000);
    
    // Auto-close poll box 1 second after voting
    setTimeout(() => {
      setShowPollBox(false);
    }, 1000);
  };

  // Images to display
  const displayImages = report.images && report.images.length > 0 
    ? report.images 
    : report.spotPhotoUrl 
    ? [report.spotPhotoUrl]
    : report.evidenceFiles?.filter(e => e.type === 'image' || e.type === 'accused_photo').map(e => e.url) || [];

  // Truth voting calculation
  const trueCount = report.trueVotesCount || report.confirmationsCount || 0;
  const falseCount = report.falseVotesCount || 0;
  const totalVotes = trueCount + falseCount || 1;
  const truePercent = Math.round((trueCount / totalVotes) * 100);
  const falsePercent = 100 - truePercent;

  return (
    <article
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '22px',
        padding: '24px 22px 28px 22px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)'
      }}
      className="space-y-4 transition-all"
    >
      {/* 1. TOP HEADER: Vibrant Purple Avatar + Title with Verified Tick + Date/Location + Bookmark/Menu */}
      <div className="flex items-start justify-between gap-3.5">
        <div className="flex items-center gap-3 min-w-0">
          {/* Vibrant Purple Avatar with Group/Users Icon */}
          <div
            style={{
              width: '44px',
              height: '44px',
              background: 'linear-gradient(135deg, #633ef8 0%, #5027eb 100%)',
              color: '#ffffff',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 3px 10px rgba(80, 39, 235, 0.28)'
            }}
          >
            <UsersIcon size={22} className="text-white" />
          </div>

          <div className="min-w-0">
            {/* Title + Verified Tick Badge */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                {report.category === 'HOSPITAL'
                  ? 'স্বাস্থ্য সেবা ও হাসপাতাল ফোরাম'
                  : report.category === 'EXTORTION'
                  ? 'চাঁদাবাজি বিরোধী নাগরিক ঐক্য'
                  : report.category === 'UNIVERSITY'
                  ? 'বিশ্ববিদ্যালয় দুর্নীতি প্রতিরোধ সেল'
                  : '36 Bangla পাবলিক ফোরাম'}
              </h3>
              {/* Purple Filled Verified Tick Badge */}
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#5b3cf5',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <CheckIcon size={10} />
              </div>
            </div>

            {/* Date with Calendar Icon + Location with Pin Icon */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-normal mt-0.5 flex-wrap">
              <span className="flex items-center gap-1">
                <CalendarIcon size={12} className="text-slate-400" />
                <span>
                  {new Date(report.createdAt).toLocaleDateString('bn-BD', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-500">
                <LocationPinIcon size={12} className="text-slate-400" />
                <span>{report.district} {report.subDistrict ? `(${report.subDistrict})` : ''}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Top Right: Bookmark & Three Dots Menu */}
        <div className="flex items-center gap-1 text-slate-400 shrink-0">
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            style={{
              border: 'none',
              background: isBookmarked ? '#f3f0ff' : 'transparent',
              color: isBookmarked ? '#5027eb' : '#94a3b8',
              borderRadius: '9999px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="সংরক্ষণ করুন"
          >
            <BookmarkIcon size={18} />
          </button>
          <button
            type="button"
            onClick={handleShare}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#94a3b8',
              borderRadius: '9999px',
              padding: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="আরও অপশন"
          >
            <ThreeDotsIcon size={18} />
          </button>
        </div>
      </div>

      {/* 2. INCIDENT TITLE & DESCRIPTION */}
      <div className="space-y-1.5">
        <h4 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">
          {report.officeName}
        </h4>

        <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
          {isExpanded || report.description.length < 150
            ? report.description
            : `${report.description.slice(0, 150)}....`}
          {report.description.length >= 150 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                border: 'none',
                background: 'transparent',
                color: '#5b3cf5',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '2px',
                marginLeft: '4px'
              }}
            >
              {isExpanded ? 'সংক্ষিপ্ত করুন ⌃' : 'আরও পড়ুন ⌵'}
            </button>
          )}
        </p>
      </div>

      {/* 3. CENTERED ROUNDED EVIDENCE PHOTO CONTAINER */}
      {displayImages.length > 0 && (
        <div className="pt-1">
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              maxHeight: '420px'
            }}
            onClick={() => setSelectedEvidence(displayImages[0])}
          >
            <img
              src={displayImages[0]}
              alt="Incident evidence photo"
              style={{
                width: '100%',
                maxHeight: '420px',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '16px',
                display: 'block'
              }}
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* 4. ACTION BAR: [📊 ভোট দিন] + [🟢 সত্য ১৭৩  🔴 মিথ্যা ৮]  |  [💬 ১ মন্তব্য]  [↗️ শেয়ার] */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
          borderTop: '1px solid #f1f5f9',
          gap: '8px',
          flexWrap: 'wrap'
        }}
        className="text-xs sm:text-sm text-slate-600"
      >
        {/* Left: Vote Pill Button + Small Results Summary Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setShowPollBox(!showPollBox)}
            style={{
              border: 'none',
              backgroundColor: showPollBox ? '#5b3cf5' : '#f3f0ff',
              color: showPollBox ? '#ffffff' : '#5027eb',
              fontWeight: 700,
              padding: '7px 14px',
              borderRadius: '9999px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              fontSize: '0.8125rem',
              boxShadow: showPollBox ? '0 2px 8px rgba(91, 60, 245, 0.3)' : 'none'
            }}
          >
            <VoteBarsIcon size={15} />
            <span>{showPollBox ? 'পোল বন্ধ করুন' : 'ভোট দিন'}</span>
          </button>

          {/* Live Mini Vote Badges (Right side of vote button) */}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold">
            {/* সত্য Vote Count */}
            <span
              style={{
                backgroundColor: '#ecfdf5',
                color: '#065f46',
                border: '1px solid #a7f3d0',
                borderRadius: '9999px',
                padding: '2.5px 8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title={`সত্য ভোট: ${toBn(trueCount)} (${toBn(truePercent)}%)`}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10b981', display: 'inline-block' }} />
              <span>সত্য {toBn(trueCount)}</span>
            </span>

            {/* মিথ্যা Vote Count */}
            <span
              style={{
                backgroundColor: '#fff1f2',
                color: '#9f1239',
                border: '1px solid #fecdd3',
                borderRadius: '9999px',
                padding: '2.5px 8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title={`মিথ্যা ভোট: ${toBn(falseCount)} (${toBn(falsePercent)}%)`}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#ef4444', display: 'inline-block' }} />
              <span>মিথ্যা {toBn(falseCount)}</span>
            </span>
          </div>
        </div>

        {/* Right Action Icons: Comments & Share */}
        <div className="flex items-center gap-2">
          {/* Middle: Comments Count */}
          <button
            type="button"
            onClick={() => setShowInlineComments(!showInlineComments)}
            style={{
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#475569',
              fontWeight: 500,
              padding: '6px 8px'
            }}
          >
            <ChatIcon size={16} className="text-slate-500" />
            <span>{reportComments.length > 0 ? `${reportComments.length} মন্তব্য` : '১ মন্তব্য'}</span>
          </button>

          {/* Right: Share Button */}
          <button
            type="button"
            onClick={handleShare}
            style={{
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              color: '#475569',
              fontWeight: 500,
              padding: '6px 8px'
            }}
          >
            <ShareIcon size={16} className="text-slate-500" />
            <span>শেয়ার</span>
          </button>
        </div>
      </div>

      {/* 5. INTERACTIVE TRUTH/FALSE POLL BOX ("আপনার মতে তথ্যটি সত্য না মিথ্যা?") */}
      {showPollBox && (
        <div
          style={{
            backgroundColor: '#f9f8ff',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #e9e3ff'
          }}
          className="space-y-3.5"
        >
          {/* Poll Box Header with Poll Icon */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VoteBarsIcon size={20} className="text-[#5b3cf5]" />
              <h5 className="font-extrabold text-sm sm:text-base text-slate-900 leading-tight">
                আপনার মতে তথ্যটি সত্য না মিথ্যা?
              </h5>
            </div>
            <span
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #ddd6fe',
                borderRadius: '9999px',
                padding: '3px 10px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#5027eb',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
              }}
            >
              {toBn(truePercent)}% সত্য ({toBn(trueCount)} ভোট)
            </span>
          </div>

          {/* 2 Big Choice Cards (সত্য / মিথ্যা) */}
          <div className="grid grid-cols-2 gap-3">
            {/* Card 1: সত্য (True - Mint Green) */}
            <div
              onClick={() => setSelectedPollVote('TRUE')}
              style={{
                backgroundColor: '#e6f9f0',
                border: selectedPollVote === 'TRUE' ? '2px solid #10b981' : '1.5px solid #a3e9c7',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: selectedPollVote === 'TRUE' ? '0 0 0 3px rgba(16, 185, 129, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
              className={`poll-card-truth ${selectedPollVote === 'TRUE' ? 'selected' : ''}`}
            >
              {/* Green Circle Check Badge */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '9999px',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <CheckIcon size={14} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#0f5132' }}>
                সত্য
              </span>
            </div>

            {/* Card 2: মিথ্যা (False - Soft Pink/Red) */}
            <div
              onClick={() => setSelectedPollVote('FALSE')}
              style={{
                backgroundColor: '#ffebee',
                border: selectedPollVote === 'FALSE' ? '2px solid #ef4444' : '1.5px solid #ffcdd2',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: selectedPollVote === 'FALSE' ? '0 0 0 3px rgba(239, 68, 68, 0.25)' : 'none',
                transition: 'all 0.15s ease'
              }}
              className={`poll-card-false ${selectedPollVote === 'FALSE' ? 'selected' : ''}`}
            >
              {/* Red Circle Cross Badge */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '9999px',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <CloseIcon size={14} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: '#842029' }}>
                মিথ্যা
              </span>
            </div>
          </div>

          {/* Big Purple Confirm Vote Button */}
          <button
            type="button"
            onClick={handleConfirmVote}
            style={{
              border: 'none',
              background: 'linear-gradient(135deg, #633ef8 0%, #5027eb 100%)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.95rem',
              padding: '12px 16px',
              borderRadius: '14px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(80, 39, 235, 0.35)',
              transition: 'all 0.15s ease'
            }}
            className="hover:opacity-95 active:scale-98"
          >
            <span>ভোট নিশ্চিত করুন</span>
            <span style={{ fontSize: '1.1rem' }}>→</span>
          </button>
        </div>
      )}

      {/* 6. BOTTOM COMMENT COMPOSER (Avatar + Pill Input + Emoji/Send) */}
      <div className="pt-3 pb-2 flex items-center gap-2.5">
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '9999px',
            backgroundColor: '#e2e8f0',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <UserIcon size={16} />
        </div>

        <form
          onSubmit={handleCommentSubmit}
          style={{
            backgroundColor: '#f0f2f5',
            borderRadius: '9999px',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            gap: '8px'
          }}
        >
          <input
            type="text"
            placeholder="আপনার মন্তব্য লিখুন..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: '100%',
              fontSize: '0.875rem',
              color: '#0f172a'
            }}
            className="placeholder-slate-400 font-normal"
          />
          {newComment.trim() ? (
            <button
              type="submit"
              style={{
                border: 'none',
                background: 'linear-gradient(135deg, #633ef8 0%, #5027eb 100%)',
                color: '#ffffff',
                padding: '4px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              পোস্ট
            </button>
          ) : (
            <button
              type="button"
              style={{
                border: 'none',
                background: 'transparent',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px'
              }}
            >
              <SmileIcon size={18} />
            </button>
          )}
        </form>
      </div>

      {/* Inline Comments Thread */}
      {showInlineComments && reportComments.length > 0 && (
        <div className="pt-2 space-y-2 max-h-56 overflow-y-auto pr-1">
          {reportComments.map((c) => (
            <div key={c.id} className="flex items-start gap-2">
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '9999px',
                  backgroundColor: '#e2e8f0',
                  color: '#475569',
                  fontSize: '10px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                {c.authorAlias.slice(0, 1)}
              </div>
              <div
                style={{
                  backgroundColor: '#f0f2f5',
                  borderRadius: '16px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  maxWidth: '88%'
                }}
                className="space-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{c.authorAlias}</span>
                  <span className="text-[9px] font-normal text-slate-400">
                    {new Date(c.createdAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-slate-700 font-normal leading-relaxed">{c.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Toasts */}
      {shareToast && (
        <div
          style={{
            backgroundColor: '#f3f0ff',
            border: '1px solid #ddd6fe',
            color: '#5027eb',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          <CheckIcon size={12} className="text-[#5027eb]" />
          <span>পোস্টের লিংক ক্লিপবোর্ডে কপি করা হয়েছে!</span>
        </div>
      )}

      {voteSubmittedToast && (
        <div
          style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #a7f3d0',
            color: '#065f46',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
          }}
        >
          <CheckIcon size={12} className="text-emerald-600" />
          <span>আপনার ভোট সফলভাবে নথিভুক্ত হয়েছে!</span>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedEvidence && (
        <div
          className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
          onClick={() => setSelectedEvidence(null)}
        >
          <div
            className="bg-white border border-slate-200 rounded-2xl p-4 max-w-2xl w-full space-y-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="font-bold text-xs text-slate-900">ছবির সম্পূর্ণ প্রিভিউ</h4>
              <button onClick={() => setSelectedEvidence(null)} style={{ border: 'none', background: 'transparent' }} className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer">
                <CloseIcon size={16} />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden bg-slate-950 max-h-[70vh] flex items-center justify-center">
              <img src={selectedEvidence} alt="Evidence preview" className="max-h-[65vh] w-auto object-contain" />
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
