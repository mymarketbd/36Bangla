'use client';

import React, { useState } from 'react';
import { BribeReport, CommunityComment } from '@/lib/types';
import { toBn } from '@/lib/format';
import { BookmarkIcon, ThreeDotsIcon } from './Icons';

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
  const displayImage =
    report.spotPhotoUrl ||
    (report.images && report.images.length > 0 ? report.images[0] : null) ||
    report.evidenceFiles?.find((e) => e.type === 'image' || e.type === 'accused_photo')?.url;

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
    <article
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '20px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      {/* 1. Header: Author Avatar + Name + Verified Badge + Timestamp & Location + Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Avatar (Solid Purple with Users Icon) */}
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '9999px',
              backgroundColor: '#5b3cf5',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(91, 60, 245, 0.25)',
              overflow: 'hidden'
            }}
          >
            {report.authorAvatar ? (
              <img src={report.authorAvatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            )}
          </div>

          {/* Name & Meta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                {report.officeName || report.authorName || 'বিশ্ববিদ্যালয় দুর্নীতি প্রতিরোধ সেল'}
              </h4>
              {/* Blue Verified Check */}
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '9999px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 900,
                  flexShrink: 0
                }}
                title="ভেরিফাইড সেল"
              >
                ✓
              </span>
            </div>
            <p style={{ fontSize: '11px', fontWeight: 500, color: '#64748b', marginTop: '3px', margin: 0 }}>
              {formatDate(report.createdAt)} • {locationText}
            </p>
          </div>
        </div>

        {/* Top Right: Bookmark & Three Dots Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: isBookmarked ? '#eef2ff' : '#ffffff',
              color: isBookmarked ? '#5b3cf5' : '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="বুকমার্ক করুন"
          >
            <BookmarkIcon size={15} />
          </button>

          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#ffffff',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="মেনু"
          >
            <ThreeDotsIcon size={15} />
          </button>

          {/* Menu Dropdown */}
          {showMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '36px',
                zIndex: 20,
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                padding: '6px',
                width: '150px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <button
                type="button"
                onClick={() => {
                  handleShare();
                  setShowMenu(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                🔗 লিংক কপি করুন
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('রিপোর্টটি ফ্ল্যাগ করা হয়েছে। মডারেশন টিম এটি যাচাই করবে।');
                  setShowMenu(false);
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  color: '#e11d48',
                  cursor: 'pointer'
                }}
              >
                🚩 রিপোর্ট ফ্ল্যাগ করুন
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. Post Title (Subject / Organization) */}
      <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
        {report.service || report.officeName}
      </h3>

      {/* 3. Post Description */}
      <div style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: 0 }}>
        <p style={{ margin: 0 }}>
          {isExpanded || report.description.length <= 160
            ? report.description
            : `${report.description.slice(0, 160)}...`}
          {report.description.length > 160 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#5b3cf5',
                fontWeight: 700,
                marginLeft: '6px',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              {isExpanded ? 'সংক্ষেপ করুন ↑' : 'আরও পড়ুন ⬇'}
            </button>
          )}
        </p>
      </div>

      {/* 4. Post Media Image (16:9 Banner Photo) */}
      {displayImage && (
        <div
          style={{
            width: '100%',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f1f5f9',
            maxHeight: '340px'
          }}
        >
          <img
            src={displayImage}
            alt={report.service || 'অভিযোগের ছবি'}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '340px',
              objectFit: 'cover',
              display: 'block'
            }}
            loading="lazy"
          />
        </div>
      )}

      {/* 5. Engagement Bar: Truth/False Voting on Left + Comments/Share on Right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          paddingTop: '10px',
          borderTop: '1px solid #f1f5f9'
        }}
      >
        {/* Left: Truth (Green) & False (Red) Vote Pill Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* সত্য ভোট */}
          <button
            type="button"
            onClick={() => onTruthVote(report.id, 'TRUE')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: userTruthVote === 'TRUE' ? '#059669' : '#ecfdf5',
              color: userTruthVote === 'TRUE' ? '#ffffff' : '#059669',
              border: '1px solid #a7f3d0',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <span>👍</span>
            <span>সত্য</span>
            <span style={{ fontWeight: 800 }}>{toBn(trueCount)}</span>
          </button>

          {/* মিথ্যা ভোট */}
          <button
            type="button"
            onClick={() => onTruthVote(report.id, 'FALSE')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              backgroundColor: userTruthVote === 'FALSE' ? '#e11d48' : '#fff1f2',
              color: userTruthVote === 'FALSE' ? '#ffffff' : '#e11d48',
              border: '1px solid #fecdd3',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <span>👎</span>
            <span>মিথ্যা</span>
            <span style={{ fontWeight: 800 }}>{toBn(falseCount)}</span>
          </button>
        </div>

        {/* Right: Comments & Share Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* মন্তব্য */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#64748b',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <svg style={{ width: '15px', height: '15px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>{toBn(totalComments)} মন্তব্য</span>
          </button>

          {/* শেয়ার */}
          <button
            type="button"
            onClick={handleShare}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#64748b',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <svg style={{ width: '15px', height: '15px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>শেয়ার</span>
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {shareToast && (
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: '#eef2ff',
            border: '1px solid #c7d2fe',
            color: '#5b3cf5',
            fontSize: '12px',
            fontWeight: 700,
            borderRadius: '10px',
            textAlign: 'center'
          }}
        >
          ✓ পোস্টের লিংক ক্লিপবোর্ডে কপি করা হয়েছে!
        </div>
      )}

      {/* 6. Expandable Comments Section */}
      {showComments && (
        <div style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Comments List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto' }}>
            {reportComments.length === 0 ? (
              <p style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '6px 0', margin: 0 }}>
                এখনও কোনো মন্তব্য নেই। আপনার মন্তব্য যোগ করুন।
              </p>
            ) : (
              reportComments.map((c) => (
                <div
                  key={c.id}
                  style={{
                    backgroundColor: '#f8fafc',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontWeight: 600 }}>
                    <span>{c.authorAlias}</span>
                    <span>{formatDate(c.createdAt)}</span>
                  </div>
                  <p style={{ color: '#1e293b', margin: 0, lineHeight: 1.4 }}>{c.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              placeholder="একটি মন্তব্য লিখুন..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '8px 12px',
                fontSize: '12px',
                color: '#0f172a',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#5b3cf5',
                color: '#ffffff',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              পোস্ট
            </button>
          </form>
        </div>
      )}
    </article>
  );
}
