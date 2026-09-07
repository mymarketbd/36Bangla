'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavigationProps {
  onSelectTopic?: (topic: string) => void;
}

export default function SidebarNavigation({ onSelectTopic }: SidebarNavigationProps) {
  const pathname = usePathname() || '/';
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const navLinks = [
    {
      name: 'প্রধান ফিড',
      href: '/',
      isActive: pathname === '/',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'জেলা মানচিত্র',
      href: '/map',
      isActive: pathname === '/map',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      name: 'দপ্তর হল অব ফেম',
      href: '/whitelist',
      isActive: pathname === '/whitelist',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      name: 'ডেটা ও পরিসংখ্যান',
      href: '/analytics',
      isActive: pathname === '/analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: 'ফিচার ও উন্নয়ন পরামর্শ',
      href: '/feedback',
      isActive: pathname === '/feedback',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const trendingTopics = [
    { id: 1, name: 'ভূমি অফিস নামজারি', count: '২.২k রিপোর্ট', color: 'bg-blue-50 text-blue-600' },
    { id: 2, name: 'সরকারি হাসপাতাল', count: '১.৮k রিপোর্ট', color: 'bg-amber-50 text-amber-600' },
    { id: 3, name: 'টেন্ডার ও পরিষেবা', count: '১.৪k রিপোর্ট', color: 'bg-indigo-50 text-indigo-600' },
    { id: 4, name: 'বিশ্ববিদ্যালয় অনিয়ম', count: '১.০k রিপোর্ট', color: 'bg-slate-100 text-slate-600' },
    { id: 5, name: 'নিয়োগ বাণিজ্য', count: '৯৩২ রিপোর্ট', color: 'bg-slate-100 text-slate-600' }
  ];

  return (
    <aside className="w-full space-y-4">
      {/* 1. Main Navigation Card */}
      <div className="bg-white rounded-2xl p-2.5 shadow-xs border border-slate-200/70">
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const isActive = link.isActive;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer select-none ${
                  isActive
                    ? 'bg-indigo-50/80 text-[#4F46E5] font-bold border-l-4 border-[#4F46E5] pl-2.5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span className={isActive ? 'text-[#4F46E5]' : 'text-slate-500'}>
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* FAQ Item */}
          <button
            type="button"
            onClick={() => setIsFaqOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer text-left"
          >
            <span className="text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
          </button>
        </nav>
      </div>

      {/* 2. Trending Topics Card */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/70">
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-slate-900">
            ট্রেন্ডিং বিষয়
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
          {trendingTopics.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTopic && onSelectTopic(item.name)}
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 transition cursor-pointer group"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${item.color}`}>
                  {item.id}
                </span>
                <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#4F46E5] transition">
                  {item.name}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Modal */}
      {isFaqOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>❓</span>
                <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsFaqOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">১. এখানে অভিযোগ করলে আমার পরিচয় কি গোপন থাকবে?</p>
                <p>হ্যাঁ, সম্পূর্ণ বেনামী। কোনো ফোন নম্বর, ইমেইল বা পরিচয় প্রকাশ করা হয় না।</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">২. ছবি বা ভিডিও প্রমাণ দেওয়া কি বাধ্যতামূলক?</p>
                <p>প্রমাণ দিলে পোস্টটি দ্রুত ভেরিফাইড ব্যাজ পায় এবং দুদকের নজরে আসে।</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-900">৩. সত্য/মিথ্যা ভোটিং কীভাবে কাজ করে?</p>
                <p>অন্যান্য নাগরিকরা ঘটনার সত্যতা নিশ্চিত করতে সত্য বা মিথ্যা ভোট দিতে পারেন।</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsFaqOpen(false)}
              className="w-full py-2 rounded-xl bg-[#4F46E5] text-white text-xs font-bold hover:bg-[#4338CA] transition cursor-pointer"
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
