'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Division } from '@/lib/types';
import { SearchIcon, CloseIcon } from './Icons';

interface HeaderProps {
  onOpenReport: () => void;
  onOpenWhitelist?: () => void;
  onResetHome?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  selectedDivision?: Division | 'ALL';
  onSelectDivision?: (div: Division | 'ALL') => void;
}

export default function Header({
  onOpenReport,
  onResetHome,
  searchQuery = '',
  onSearchChange,
  selectedDivision = 'ALL',
  onSelectDivision
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onResetHome) {
      onResetHome();
    }
    if (pathname === '/') {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.push('/');
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* 1. Left: Brand Identity (36 Bangla Logo & Tagline) */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group cursor-pointer select-none py-0.5"
            title="36 Bangla — হোমপেজে যান"
          >
            {/* Logo Graphic + Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-2xl sm:text-[26px] font-black tracking-tight text-[#4F46E5] font-sans">
                  36
                </span>
                <span className="text-xl sm:text-[22px] font-bold text-slate-900 tracking-tight font-sans">
                  Bangla
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 mt-0.5 tracking-normal">
                জনগণের কথা, স্বচ্ছ বাংলাদেশের জন্য
              </span>
            </div>
          </Link>
        </div>

        {/* 2. Center: Search Bar with Division Filter */}
        {onSearchChange && (
          <div className="flex-1 max-w-2xl hidden md:flex items-center">
            <div className="w-full bg-[#F1F5F9] hover:bg-slate-200/70 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 border border-transparent rounded-full px-4 py-1.5 flex items-center gap-2 transition-all">
              
              {/* Search Icon */}
              <SearchIcon size={16} className="text-slate-400 shrink-0" />
              
              {/* Search Input */}
              <input
                type="text"
                placeholder="খুঁজুন: বিভাগ, জেলা, বিষয় বা কীওয়ার্ড..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-normal"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="text-slate-400 hover:text-slate-700 p-0.5 cursor-pointer shrink-0"
                >
                  <CloseIcon size={14} />
                </button>
              )}

              {/* Vertical Divider */}
              <div className="h-4 w-px bg-slate-300 mx-1 shrink-0" />

              {/* Division Selector Dropdown */}
              {onSelectDivision && (
                <div className="relative shrink-0 flex items-center">
                  <select
                    value={selectedDivision}
                    onChange={(e) => onSelectDivision(e.target.value as any)}
                    className="bg-transparent border-none text-xs sm:text-sm font-medium text-slate-700 outline-none cursor-pointer pr-4 hover:text-indigo-600 transition"
                  >
                    <option value="ALL">সকল বিভাগ</option>
                    <option value="Dhaka">ঢাকা বিভাগ</option>
                    <option value="Chattogram">চট্টগ্রাম বিভাগ</option>
                    <option value="Rajshahi">রাজশাহী বিভাগ</option>
                    <option value="Khulna">খুলনা বিভাগ</option>
                    <option value="Sylhet">সিলেট বিভাগ</option>
                    <option value="Barishal">বরিশাল বিভাগ</option>
                    <option value="Rangpur">রংপুর বিভাগ</option>
                    <option value="Mymensingh">ময়মনসিংহ বিভাগ</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Right: Notification Bell & + অভিযোগ করুন Button (No user account) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Notification Bell */}
          <button
            type="button"
            className="w-9 h-9 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition relative cursor-pointer"
            title="বিজ্ঞপ্তি"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Red Dot Indicator */}
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* + অভিযোগ করুন (CTA Button) */}
          <button
            type="button"
            onClick={onOpenReport}
            className="bg-[#4F46E5] hover:bg-[#4338CA] active:scale-98 text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm hover:shadow transition cursor-pointer shrink-0"
          >
            <span className="text-base font-bold leading-none">+</span>
            <span>অভিযোগ করুন</span>
          </button>
        </div>

      </div>
    </header>
  );
}
