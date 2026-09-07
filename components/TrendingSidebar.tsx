'use client';

import React from 'react';
import Link from 'next/link';

export default function TrendingSidebar() {
  const hotlines = [
    {
      name: 'দুদক',
      desc: 'দুর্নীতি ও অভিযোগ',
      phone: '106',
      icon: (
        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
      )
    },
    {
      name: 'জাতীয় জরুরি সেবা',
      desc: 'পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস',
      phone: '999',
      icon: (
        <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      )
    },
    {
      name: 'স্বাস্থ্য বাতায়ন',
      desc: 'হাসপাতাল সেবা ও তথ্য',
      phone: '16263',
      icon: (
        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      )
    }
  ];

  return (
    <aside className="w-full space-y-4">
      {/* 1. স্বচ্ছতা লেজার (সারাংশ) - Transparency Ledger Summary Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/70">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-slate-900">
            স্বচ্ছতা লেজার (সারাংশ)
          </h3>
          <Link
            href="/analytics"
            className="text-xs font-semibold text-[#4F46E5] hover:underline flex items-center gap-0.5"
          >
            <span>সব দেখুন</span>
            <span>→</span>
          </Link>
        </div>

        <div className="space-y-2.5">
          {/* Stat 1: মোট অভিযোগ */}
          <div className="bg-[#F8FAFC] border border-slate-100 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">মোট অভিযোগ</p>
                <p className="text-sm font-bold text-slate-900">১২,৮৪০</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              ↑ ১২%
            </span>
          </div>

          {/* Stat 2: দাবিকৃত অর্থ */}
          <div className="bg-[#F8FAFC] border border-slate-100 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-sm">
                ৳
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">দাবিকৃত অর্থ</p>
                <p className="text-sm font-bold text-slate-900">৳ ১৮.৬০ লাখ</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              ↑ ৮%
            </span>
          </div>

          {/* Stat 3: সমাধান হয়েছে */}
          <div className="bg-[#F8FAFC] border border-slate-100 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">সমাধান হয়েছে</p>
                <p className="text-sm font-bold text-slate-900">২,৯৪০</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              ↑ ২৪%
            </span>
          </div>

          {/* Stat 4: চলমান রয়েছে */}
          <div className="bg-[#F8FAFC] border border-slate-100 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-500">চলমান রয়েছে</p>
                <p className="text-sm font-bold text-slate-900">৮,৬৩০</p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
              ↓ ৫%
            </span>
          </div>
        </div>
      </div>

      {/* 2. জরুরি সরকারি হটলাইন - Emergency Government Hotlines Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/70">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-slate-900">
            জরুরি সরকারি হটলাইন
          </h3>
          <Link
            href="/press"
            className="text-xs font-semibold text-[#4F46E5] hover:underline flex items-center gap-0.5"
          >
            <span>সব দেখুন</span>
            <span>→</span>
          </Link>
        </div>

        <div className="space-y-3">
          {hotlines.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-normal mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${item.phone}`}
                className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-lg border border-emerald-200 transition"
              >
                <span>📞</span>
                <span>{item.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Inspirational Citizen Banner / Quote Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#EEF2FF] to-[#E0E7FF] rounded-2xl p-4 border border-indigo-100/80 shadow-xs flex items-center justify-between">
        <div className="relative z-10 space-y-1">
          <span className="text-xl font-serif text-[#4F46E5] leading-none">❝</span>
          <p className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">
            সচেতন নাগরিকই<br />
            গড়ে তোলে স্বচ্ছ বাংলাদেশ
          </p>
        </div>

        {/* Faint '36' Watermark graphic */}
        <div className="text-5xl sm:text-6xl font-black text-indigo-300/40 select-none pointer-events-none font-sans tracking-tighter">
          36
        </div>
      </div>
    </aside>
  );
}
