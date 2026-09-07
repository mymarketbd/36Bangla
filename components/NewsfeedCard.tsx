'use client';

import React, { useState } from 'react';
import { BribeReport, CommunityComment } from '@/lib/types';
import { toBn } from '@/lib/format';
import { BookmarkIcon, ThreeDotsIcon, CloseIcon } from './Icons';

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const reportComments = comments.filter((c) => c.reportId === report.id);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/?report=${report.id}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(report.id, 'নাগরিক', newComment.trim());
    setNewComment('');
    setShowComments(true);
  };

  // Image to display
  const displayImage = report.spotPhotoUrl || 
    (report.images && report.images.length > 0 ? report.images[0] : null) ||
    report.evidenceFiles?.find(e => e.type === 'image' || e.type === 'accused_photo')?.url;

  const trueCount = report.trueVotesCount || report.confirmationsCount || 0;
  const falseCount = report.falseVotesCount || 0;
  const totalComments = reportComments.length || report.commentsCount || 0;

  // Format date
  const formatDate = (dStr: string) => {
    try {
      const d = new Date(dStr);
      return `${toBn(d.getDate())} সেপ্টেম্বর, ২০২৬`;
    } catch {
      return '৬ সেপ্টেম্বর, ২০২৬';
    }
  };

  const locationText = report.subDistrict 
    ? `${report.district} (${report.subDistrict})`
    : report.district;

  return (
    <article className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/70 space-y-3.5 transition-all">
      
      {/* 1. Header: Author Avatar + Name + Verified Badge + Timestamp & Location + Right Actions */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center shrink-0 font-bold text-sm shadow-xs">
            {report.authorAvatar ? (
              <img src={report.authorAvatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            )}
          </div>

          {/* Name & Meta */}
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                {report.officeName || report.authorName || 'নাগরিক ফোরাম সেল'}
              </h4>
              {/* Blue Verified Check */}
              <span className="w-4 h-4 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                ✓
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-400 mt-0.5">
              {formatDate(report.createdAt)} • {locationText}
            </p>
          </div>
        </div>

        {/* Top Right: Bookmark & Three Dots Menu */}
        <div className="flex items-center gap-1 relative">
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer ${
              isBookmarked ? 'text-[#4F46E5]' : 'text-slate-400 hover:text-slate-600'
            }`}
            title="বুকমার্ক করুন"
          >
            <BookmarkIcon size={16} />
          </button>

          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
            title="মেনু"
          >
            <ThreeDotsIcon size={16} />
          </button>

          {/* Menu Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-8 z-20 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 w-36 text-xs space-y-1">
              <button
                type="button"
                onClick={handleShare}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-50 text-slate-700 cursor-pointer"
              >
                🔗 লিংক কপি করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('রিপোর্টটি ফ্ল্যাগ করা হয়েছে। মডারেশন টিম এটি যাচাই করবে।');
                  setShowMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 cursor-pointer"
              >
                🚩 রিপোর্ট ফ্ল্যাগ করুন
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Post Title (Subject / Organization) */}
      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
        {report.service || report.officeName}
      </h3>

      {/* 3. Post Description */}
      <div className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
        <p>
          {isExpanded || report.description.length <= 160
            ? report.description
            : `${report.description.slice(0, 160)}...`}
          {report.description.length > 160 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#4F46E5] font-semibold ml-1 hover:underline cursor-pointer"
            >
              {isExpanded ? 'সংক্ষেপ করুন ↑' : 'আরও পড়ুন ↓'}
            </button>
          )}
        </p>
      </div>

      {/* 4. Post Media Image (16:9 Banner Photo) */}
      {displayImage && (
        <div className="w-full rounded-xl overflow-hidden border border-slate-200/80 bg-slate-100 relative max-h-[360px]">
          <img
            src={displayImage}
            alt={report.service || 'অভিযোগের ছবি'}
            className="w-full h-auto max-h-[360px] object-cover object-center"
            loading="lazy"
          />
        </div>
      )}

      {/* 5. Engagement Bar: Truth/False Voting on Left + Comments/Share on Right */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
        
        {/* Left: Truth (Green) & False (Red) Vote Pill Buttons */}
        <div className="flex items-center gap-2">
          {/* সত্য ভোট */}
          <button
            type="button"
            onClick={() => onTruthVote(report.id, 'TRUE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              userTruthVote === 'TRUE'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 border border-emerald-200/80'
            }`}
          >
            <span>👍</span>
            <span>সত্য</span>
            <span className="font-bold">{toBn(trueCount)}</span>
          </button>

          {/* মিথ্যা ভোট */}
          <button
            type="button"
            onClick={() => onTruthVote(report.id, 'FALSE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
              userTruthVote === 'FALSE'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 hover:bg-rose-100/80 text-rose-700 border border-rose-200/80'
            }`}
          >
            <span>👎</span>
            <span>মিথ্যা</span>
            <span className="font-bold">{toBn(falseCount)}</span>
          </button>
        </div>

        {/* Right: Comments & Share Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 text-xs font-medium text-slate-500">
          {/* মন্তব্য */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 hover:text-slate-900 transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{toBn(totalComments)} মন্তব্য</span>
          </button>

          {/* শেয়ার */}
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1 hover:text-slate-900 transition cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>শেয়ার</span>
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div className="p-2 bg-indigo-50 border border-indigo-200 text-[#4F46E5] text-xs font-semibold rounded-lg text-center animate-fade-in">
          ✓ পোস্টের লিংক ক্লিপবোর্ডে কপি করা হয়েছে!
        </div>
      )}

      {/* 6. Expandable Comments Section */}
      {showComments && (
        <div className="pt-3 border-t border-slate-100 space-y-3">
          {/* Comments List */}
          <div className="space-y-2 max-h-56 overflow-y-auto">
            {reportComments.length === 0 ? (
              <p className="text-xs text-slate-400 py-1 text-center">এখনও কোনো মন্তব্য নেই। আপনার মন্তব্য যোগ করুন।</p>
            ) : (
              reportComments.map((c) => (
                <div key={c.id} className="bg-slate-50 p-2.5 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold">
                    <span>{c.authorAlias}</span>
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                  <p className="text-slate-800 font-normal">{c.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="একটি মন্তব্য লিখুন..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              পোস্ট
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
