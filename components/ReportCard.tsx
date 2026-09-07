'use client';

import React, { useState } from 'react';
import { BribeReport, CommunityComment } from '@/lib/types';

interface ReportCardProps {
  report: BribeReport;
  comments: CommunityComment[];
  isConfirmedByUser: boolean;
  onConfirm: (reportId: string) => void;
  onAddComment: (reportId: string, author: string, text: string) => void;
}

export default function ReportCard({
  report,
  comments,
  isConfirmedByUser,
  onConfirm,
  onAddComment
}: ReportCardProps) {
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [authorAlias, setAuthorAlias] = useState('');
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);

  const reportComments = comments.filter((c) => c.reportId === report.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(report.id, authorAlias.trim() || 'বেনামী নাগরিক', newComment.trim());
    setNewComment('');
  };

  return (
    <article className="smart-ledger-card group">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/8 pb-4">
        {/* Left Side: Category Badge, Location, Office Name */}
        <div className="space-y-2.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="smart-badge-dept">
              <span>🏛️</span> {report.department}
            </span>
            <span className="smart-badge-location">
              <span>📍</span> {report.district} {report.subDistrict ? `(${report.subDistrict})` : ''}
            </span>
            {report.isVerified && (
              <span className="smart-badge-verified">
                <span>🛡️</span> ভেরিফাইড প্রমাণপত্র
              </span>
            )}
          </div>

          <div>
            <h3 className="text-base sm:text-xl font-black text-white leading-snug group-hover:text-emerald-300 transition-colors">
              {report.officeName}
            </h3>
            {report.locationDetails && (
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                📍 {report.locationDetails}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Bribe Amount Spotlight Box */}
        <div className="sm:text-right bg-[#090e1a] sm:bg-transparent p-3.5 sm:p-0 rounded-2xl sm:rounded-none border border-white/5 sm:border-none shrink-0 flex flex-row sm:flex-col justify-between items-center sm:items-end gap-2">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
              দাবিকৃত ঘুষের পরিমাণ
            </span>
            <span className="font-mono font-black text-2xl sm:text-3xl text-amber-400 block tracking-tight">
              ৳ {report.amount.toLocaleString('en-BD')}
            </span>
          </div>

          <div>
            {report.outcome === 'PAID' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/35 px-3 py-1 rounded-full shadow-sm">
                <span>🔴</span> বাধ্য হয়ে প্রদান
              </span>
            ) : report.outcome === 'REFUSED' ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/35 px-3 py-1 rounded-full shadow-sm">
                <span>🟢</span> প্রত্যাখ্যান ও প্রতিরোধ
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/35 px-3 py-1 rounded-full shadow-sm">
                <span>🟡</span> কাজ আটকে আছে
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Meta Information Details Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
        <div className="bg-[#090e1a] px-3.5 py-2.5 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-slate-400 font-medium">📋 কাঙ্ক্ষিত সেবা:</span>
          <span className="text-white font-extrabold">{report.service}</span>
        </div>
        <div className="bg-[#090e1a] px-3.5 py-2.5 rounded-xl border border-white/5 flex items-center justify-between">
          <span className="text-slate-400 font-medium">👤 অভিযুক্তের পদবি:</span>
          <span className="text-amber-300 font-extrabold">{report.officerDesignation || 'অফিস সহকারী / দালাল চক্র'}</span>
        </div>
      </div>

      {/* Citizen's Incident Narrative */}
      <div className="citizen-quote-box">
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
          "{report.description}"
        </p>
      </div>

      {/* Attached Evidence Thumbnails */}
      {report.evidenceFiles && report.evidenceFiles.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <span>📎</span> সংযুক্ত প্রমাণপত্র ({report.evidenceFiles.length}টি ফাইল)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {report.evidenceFiles.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvidence(ev.url)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#141e33] hover:bg-slate-700/80 border border-white/10 text-xs font-bold text-slate-200 transition"
              >
                <span>{ev.type === 'image' ? '📸' : ev.type === 'audio' ? '🎙️' : '📄'}</span>
                <span className="truncate max-w-[200px]">{ev.label}</span>
                <span className="text-[10px] text-emerald-400 font-black bg-emerald-500/10 px-1.5 py-0.5 rounded">প্রিভিউ ↗</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-white/8 text-xs flex-wrap gap-3">
        <div className="flex items-center gap-2.5">
          {/* 1-Click Confirmation Button */}
          <button
            onClick={() => onConfirm(report.id)}
            className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition ${
              isConfirmedByUser
                ? 'bg-emerald-500 text-black font-black shadow-md'
                : 'bg-[#121c2e] border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/50'
            }`}
          >
            <span>{isConfirmedByUser ? '✓ নিশ্চিত করেছেন' : '👍 আমিও নিশ্চিত করছি'}</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full font-mono font-black ${
              isConfirmedByUser ? 'bg-black/20 text-black' : 'bg-slate-800 text-emerald-400'
            }`}>
              {report.confirmationsCount}
            </span>
          </button>

          {/* Comments Trigger */}
          <button
            onClick={() => setShowCommentsModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#121c2e] border border-white/10 text-slate-300 hover:text-white flex items-center gap-2 transition font-bold hover:border-white/20"
          >
            <span>💬 অভিজ্ঞতা ও মন্তব্য</span>
            <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 font-mono">
              {reportComments.length}
            </span>
          </button>
        </div>

        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
          <span>🕒</span>
          {new Date(report.createdAt).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </span>
      </div>

      {/* Lightbox for Evidence */}
      {selectedEvidence && (
        <div
          className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
          onClick={() => setSelectedEvidence(null)}
        >
          <div
            className="bg-[#0e1628] border border-white/10 rounded-2xl p-5 max-w-xl w-full space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 className="font-bold text-sm text-white">সংযুক্ত প্রমাণপত্রের প্রিভিউ</h4>
              <button onClick={() => setSelectedEvidence(null)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>
            <div className="rounded-xl overflow-hidden bg-black max-h-[70vh] flex items-center justify-center">
              <img src={selectedEvidence} alt="Evidence document" className="max-h-[65vh] w-auto object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* Comments Thread Drawer Modal */}
      {showCommentsModal && (
        <div
          className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
          onClick={() => setShowCommentsModal(false)}
        >
          <div
            className="bg-[#0e1628] border border-white/10 rounded-2xl p-6 max-w-lg w-full space-y-4 max-h-[85vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-black text-sm text-white flex items-center gap-2">
                <span>💬 নাগরিক মন্তব্য ও অভিজ্ঞতা</span>
                <span className="text-xs text-slate-400 font-normal">({reportComments.length} টি মন্তব্য)</span>
              </h4>
              <button onClick={() => setShowCommentsModal(false)} className="text-slate-400 hover:text-white text-base">✕</button>
            </div>

            {/* Comment List */}
            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {reportComments.length > 0 ? (
                reportComments.map((c) => (
                  <div key={c.id} className="bg-[#121c2e] p-3.5 rounded-xl border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <span>👤</span> {c.authorAlias}
                      </span>
                      <span className="text-slate-500">
                        {new Date(c.createdAt).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{c.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 text-center py-6">
                  এখনো কোনো মন্তব্য নেই। আপনার অভিজ্ঞতা বা মতামত শেয়ার করুন।
                </p>
              )}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-2.5 pt-2 border-t border-white/10">
              <input
                type="text"
                placeholder="আপনার নাম বা ছদ্মনাম (ঐচ্ছিক)"
                value={authorAlias}
                onChange={(e) => setAuthorAlias(e.target.value)}
                className="w-full bg-[#080d17] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-400"
              />
              <textarea
                placeholder="এই দপ্তরে আপনার অভিজ্ঞতা বা তথ্য লিখুন..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={2}
                required
                className="w-full bg-[#080d17] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-emerald-400 resize-none"
              />
              <button
                type="submit"
                className="w-full smart-btn-emerald py-2.5 text-xs font-black uppercase tracking-wider"
              >
                মন্তব্য পোস্ট করুন
              </button>
            </form>
          </div>
        </div>
      )}
    </article>
  );
}
