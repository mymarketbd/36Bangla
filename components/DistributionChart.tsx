'use client';

import React from 'react';
import { BribeReport, IncidentCategory } from '@/lib/types';
import { ChartIcon, LightbulbIcon } from './Icons';
import { toBn } from '@/lib/format';

interface DistributionChartProps {
  reports: BribeReport[];
  activeCategory?: IncidentCategory | 'ALL';
}

export default function DistributionChart({ reports, activeCategory = 'ALL' }: DistributionChartProps) {
  const approvedReports = reports.filter((r) => {
    if (r.moderationStatus !== 'APPROVED') return false;
    if (activeCategory === 'ALL') return true;
    return (r.category || 'BRIBE') === activeCategory;
  });

  const totalReportsCount = approvedReports.length || 1;

  // Amount Ranges
  const tier1 = approvedReports.filter((r) => r.amount <= 2000).length;
  const tier2 = approvedReports.filter((r) => r.amount > 2000 && r.amount <= 10000).length;
  const tier3 = approvedReports.filter((r) => r.amount > 10000 && r.amount <= 50000).length;
  const tier4 = approvedReports.filter((r) => r.amount > 50000).length;

  // Outcomes
  const paidCount = approvedReports.filter((r) => r.outcome === 'PAID').length;
  const refusedCount = approvedReports.filter((r) => r.outcome === 'REFUSED').length;
  const pendingCount = approvedReports.filter((r) => r.outcome === 'PENDING').length;

  const totalAmountSum = approvedReports.reduce((acc, r) => acc + r.amount, 0);

  // Category specific title & labels
  const categoryTitle = 
    activeCategory === 'HOSPITAL'
      ? 'স্বাস্থ্য ও হাসপাতাল অ্যানালিটিক্স'
      : activeCategory === 'EXTORTION'
      ? 'চাঁদাবাজি ও দখলদারি পরিসংখ্যান'
      : activeCategory === 'UNIVERSITY'
      ? 'বিশ্ববিদ্যালয় দুর্নীতি ইনডেক্স'
      : activeCategory === 'BRIBE'
      ? 'ঘুষ দাবি ও লেনদেন লেজার'
      : 'স্বচ্ছতা লেজার ও পরিসংখ্যান';

  const insightText =
    activeCategory === 'HOSPITAL'
      ? 'হাসপাতাল সেবায় সচেতন নাগরিকরা ওষুধ ও আইসিইউ বেড দালাল সিন্ডিকেটের অন্যায্য দাবি প্রতিরোধ করছেন।'
      : activeCategory === 'EXTORTION'
      ? 'পরিবহন ও বাজারে নাগরিকরা চাঁদাবাজদের দাবি সরাসরি প্রত্যাখ্যান করে পাবলিক লেজারে তথ্য দিচ্ছেন।'
      : activeCategory === 'UNIVERSITY'
      ? 'ক্যাম্পাস ও আবাসিক হলে সিট দখল ও নিয়োগের অনিয়মের বিরুদ্ধে শিক্ষার্থীরা ঐক্যবদ্ধ প্রতিরোধ গড়ে তুলছেন।'
      : activeCategory === 'BRIBE'
      ? 'সরকারি দপ্তরে নামজারি ও সেবা গ্রহণে নাগরিকরা বাড়তি টাকা দিতে সরাসরি অস্বীকৃতি জানাচ্ছেন।'
      : 'মোট রিপোর্টের মধ্যে প্রায় এক-তৃতীয়াংশ ক্ষেত্রে নাগরিকরা ঘুষের অন্যায্য দাবি সরাসরি প্রত্যাখ্যান করেছেন।';

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '16px 16px 18px 16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        width: '100%',
        boxSizing: 'border-box'
      }}
      className="space-y-3.5 w-full overflow-hidden transition-all"
    >
      {/* Header */}
      <div className="border-b border-slate-100 pb-2.5">
        <div className="flex items-center justify-between gap-1.5 flex-wrap">
          <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 flex items-center gap-1.5 leading-tight">
            <ChartIcon size={15} className="text-[#5b3cf5]" />
            <span>{categoryTitle}</span>
          </h3>
          <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-full shrink-0">
            {activeCategory === 'ALL' ? 'সার্বিক লেজার' : 'ফিল্টার্ড'}
          </span>
        </div>
        <p className="text-[10.5px] text-slate-500 mt-1 font-normal leading-relaxed">
          দাবিকৃত অঙ্কের রেঞ্জ ও নাগরিক সিদ্ধান্তের রিয়েল-টাইম পরিসংখ্যান।
        </p>
      </div>

      {/* 1. Amount Distribution Range */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-800 text-[11.5px]">দাবিকৃত অঙ্কের পরিসর</span>
          <span className="text-amber-700 font-bold text-[10.5px]">
            মোট: ৳{toBn((totalAmountSum / 100000).toFixed(1))} লাখ+ ({toBn(approvedReports.length)} টি)
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Tier 1 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
              <span>ছোট অঙ্ক (৳১০০ - ২,০০০)</span>
              <span className="text-emerald-700 font-bold text-[10.5px]">
                {toBn(tier1)} টি ({toBn(Math.round((tier1 / totalReportsCount) * 100))}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, (tier1 / totalReportsCount) * 100)}%` }}
              />
            </div>
          </div>

          {/* Tier 2 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
              <span>মাঝারি (৳২,০০১ - ১০,০০০)</span>
              <span className="text-purple-700 font-bold text-[10.5px]">
                {toBn(tier2)} টি ({toBn(Math.round((tier2 / totalReportsCount) * 100))}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#5b3cf5] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, (tier2 / totalReportsCount) * 100)}%` }}
              />
            </div>
          </div>

          {/* Tier 3 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
              <span>বড় অঙ্ক (৳১০,০০১ - ৫০,০০০)</span>
              <span className="text-amber-700 font-bold text-[10.5px]">
                {toBn(tier3)} টি ({toBn(Math.round((tier3 / totalReportsCount) * 100))}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, (tier3 / totalReportsCount) * 100)}%` }}
              />
            </div>
          </div>

          {/* Tier 4 */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-[11px] text-slate-700 font-medium">
              <span>বিশাল অঙ্ক (৳৫০,০০০+)</span>
              <span className="text-rose-700 font-bold text-[10.5px]">
                {toBn(tier4)} টি ({toBn(Math.round((tier4 / totalReportsCount) * 100))}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, (tier4 / totalReportsCount) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Citizen Action & Outcomes */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <h4 className="text-[11.5px] font-extrabold text-slate-800">
          নাগরিকদের পদক্ষেপ ও ফলাফল
        </h4>

        <div className="grid grid-cols-3 gap-1.5 text-center">
          {/* Box 1: Paid */}
          <div
            style={{
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '10px',
              padding: '6px 4px'
            }}
            className="space-y-0.5 overflow-hidden"
          >
            <span className="text-[9px] font-bold text-rose-800 block leading-tight truncate">বাধ্য হয়ে প্রদান</span>
            <span className="font-extrabold text-base text-rose-700 block leading-none">{toBn(paidCount)}</span>
            <span className="text-[8.5px] text-rose-600 font-semibold block leading-tight">{toBn(Math.round((paidCount / totalReportsCount) * 100))}%</span>
          </div>

          {/* Box 2: Refused */}
          <div
            style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '10px',
              padding: '6px 4px'
            }}
            className="space-y-0.5 overflow-hidden"
          >
            <span className="text-[9px] font-bold text-emerald-800 block leading-tight truncate">প্রতিরোধ</span>
            <span className="font-extrabold text-base text-emerald-700 block leading-none">{toBn(refusedCount)}</span>
            <span className="text-[8.5px] text-emerald-600 font-semibold block leading-tight">{toBn(Math.round((refusedCount / totalReportsCount) * 100))}%</span>
          </div>

          {/* Box 3: Pending */}
          <div
            style={{
              backgroundColor: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '10px',
              padding: '6px 4px'
            }}
            className="space-y-0.5 overflow-hidden"
          >
            <span className="text-[9px] font-bold text-amber-800 block leading-tight truncate">আটকে আছে</span>
            <span className="font-extrabold text-base text-amber-700 block leading-none">{toBn(pendingCount)}</span>
            <span className="text-[8.5px] text-amber-600 font-semibold block leading-tight">{toBn(Math.round((pendingCount / totalReportsCount) * 100))}%</span>
          </div>
        </div>

        {/* Positive Highlight Note */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            padding: '8px 10px'
          }}
          className="text-[10px] text-slate-700 leading-relaxed flex items-start gap-1.5"
        >
          <LightbulbIcon size={13} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong className="text-purple-700">দিকনির্দেশনা:</strong> {insightText}
          </p>
        </div>
      </div>
    </div>
  );
}
