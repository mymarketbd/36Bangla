'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Division, IncidentCategory } from '@/lib/types';
import {
  FeedIcon,
  SearchIcon,
  PenIcon,
  BribeIcon,
  HospitalIcon,
  ExtortionIcon,
  UniversityIcon,
  CloseIcon
} from './Icons';

interface HeaderProps {
  onOpenReport: () => void;
  onOpenWhitelist: () => void;
  onResetHome?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  activeCategory?: IncidentCategory | 'ALL';
  onSelectCategory?: (cat: IncidentCategory | 'ALL') => void;
  selectedDivision?: Division | 'ALL';
  onSelectDivision?: (div: Division | 'ALL') => void;
  verifiedOnly?: boolean;
  onToggleVerified?: () => void;
  counts?: {
    all: number;
    bribe: number;
    hospital: number;
    extortion: number;
    university: number;
  };
  totalFilteredCount?: number;
}

export default function Header({
  onOpenReport,
  onOpenWhitelist,
  onResetHome,
  searchQuery = '',
  onSearchChange,
  activeCategory = 'ALL',
  onSelectCategory,
  selectedDivision = 'ALL',
  onSelectDivision,
  verifiedOnly = false,
  onToggleVerified,
  counts,
  totalFilteredCount
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const showFilters = Boolean(onSelectCategory && counts);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const searchPhrases = [
    'পাসপোর্ট অফিস ও সেবা...',
    'বিআরটিএ ড্রাইভিং লাইসেন্স...',
    'ভূমি নামজারি ও রেকর্ড...',
    'সরকারি হাসপাতাল ও ওষুধ...',
    'গাবতলী টার্মিনাল চাঁদাবাজি...',
    'তিতাস গ্যাস ও বিদ্যুৎ লাইন...',
    'পাবলিক বিশ্ববিদ্যালয় অনিয়ম...',
    'চট্টগ্রাম কাস্টমস ও ভ্যাট...'
  ];

  useEffect(() => {
    const currentPhrase = searchPhrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1600);
      }
    } else {
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentPhrase.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % searchPhrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onResetHome) {
      onResetHome();
    }
    if (pathname === '/') {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/');
        const newsfeed = document.querySelector('.newsfeed-center-col');
        if (newsfeed) newsfeed.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.push('/');
    }
  };

  return (
    <header
      style={{
        background: 'linear-gradient(135deg, #633ef8 0%, #5027eb 100%)',
        boxShadow: '0 4px 20px rgba(80, 39, 235, 0.2)'
      }}
      className="w-full sticky top-0 z-50 transition-all text-white border-b border-purple-800/30"
    >
      {/* 1. TOP ROW: Brand (Logo Only), Animated Search Bar & New Report CTA */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* Left: Brand Identity (36Bangla Logo) */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="flex items-center group cursor-pointer select-none py-0.5"
            title="36 Bangla — হোমপেজে যান"
          >
            <img
              src="/logo.png"
              alt="36 Bangla Logo"
              style={{
                height: '44px',
                width: 'auto',
                maxWidth: '185px',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.25))'
              }}
              className="group-hover:scale-105 transition duration-200"
            />
          </Link>
        </div>

        {/* Center: Dynamic Search Bar with Typewriter Animation Placeholder */}
        {onSearchChange && (
          <div className="flex-1 max-w-xl hidden sm:flex items-center gap-2.5">
            {/* White Pill Search Bar Container */}
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '9999px',
                padding: '3px 4px 3px 18px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)'
              }}
              className="flex-1 flex items-center gap-2 transition-all focus-within:ring-2 focus-within:ring-purple-300"
            >
              <input
                type="text"
                placeholder={searchQuery ? '' : `খুঁজুন যেমন: ${displayedText}`}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  width: '100%',
                  fontSize: '0.85rem',
                  color: '#1e293b'
                }}
                className="placeholder-slate-400 font-normal"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  style={{ border: 'none', background: 'transparent' }}
                  className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer shrink-0"
                >
                  <CloseIcon size={12} />
                </button>
              )}

              {/* Right Purple Circular Search Icon Button */}
              <button
                type="button"
                style={{
                  width: '34px',
                  height: '34px',
                  minWidth: '34px',
                  minHeight: '34px',
                  borderRadius: '9999px',
                  backgroundColor: '#5b3cf5',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(91, 60, 245, 0.4)'
                }}
                className="hover:opacity-95 active:scale-95 transition"
                title="Search"
              >
                <SearchIcon size={15} />
              </button>
            </div>

            {/* Division Selector */}
            {onSelectDivision && (
              <select
                value={selectedDivision}
                onChange={(e) => onSelectDivision(e.target.value as any)}
                style={{
                  border: 'none',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
                }}
                className="shrink-0 transition"
              >
                <option value="ALL">সকল বিভাগ (৮টি)</option>
                <option value="Dhaka">ঢাকা বিভাগ</option>
                <option value="Chattogram">চট্টগ্রাম বিভাগ</option>
                <option value="Rajshahi">রাজশাহী বিভাগ</option>
                <option value="Khulna">খুলনা বিভাগ</option>
                <option value="Sylhet">সিলেট বিভাগ</option>
                <option value="Barishal">বরিশাল বিভাগ</option>
                <option value="Rangpur">রংপুর বিভাগ</option>
                <option value="Mymensingh">ময়মনসিংহ বিভাগ</option>
              </select>
            )}
          </div>
        )}

        {/* Right: Actions & New Report Button */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* + New Report Button (White Pill with Purple Text) */}
          <button
            onClick={onOpenReport}
            style={{
              border: 'none',
              backgroundColor: '#ffffff',
              color: '#5027eb',
              boxShadow: '0 3px 12px rgba(0, 0, 0, 0.18)'
            }}
            className="px-4 py-2 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition hover:bg-purple-50 active:scale-98 cursor-pointer"
          >
            <PenIcon size={13} className="text-[#5027eb]" />
            <span>+ নতুন অভিযোগ</span>
          </button>
        </div>
      </div>

      {/* 2. SUB-BAR: CENTERED CATEGORY OPTIONS */}
      {showFilters && onSelectCategory && counts && (
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)'
          }}
          className="py-1.5 sm:py-2 px-3 sm:px-4 md:px-6"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none">
            {/* Quick Category Filter Pills - Center Aligned */}
            <button
              type="button"
              onClick={() => onSelectCategory('ALL')}
              style={{
                border: 'none',
                backgroundColor: activeCategory === 'ALL' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeCategory === 'ALL' ? '#5027eb' : '#ffffff',
                boxShadow: activeCategory === 'ALL' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
              }}
              className="shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 hover:bg-white/30 backdrop-blur-xs"
            >
              <FeedIcon size={12} className={activeCategory === 'ALL' ? 'text-[#5027eb]' : 'text-purple-200'} />
              <span>সব</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('BRIBE')}
              style={{
                border: 'none',
                backgroundColor: activeCategory === 'BRIBE' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeCategory === 'BRIBE' ? '#5027eb' : '#ffffff',
                boxShadow: activeCategory === 'BRIBE' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
              }}
              className="shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 hover:bg-white/30 backdrop-blur-xs"
            >
              <BribeIcon size={12} className={activeCategory === 'BRIBE' ? 'text-[#5027eb]' : 'text-purple-200'} />
              <span>ঘুষের দাবি</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('HOSPITAL')}
              style={{
                border: 'none',
                backgroundColor: activeCategory === 'HOSPITAL' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeCategory === 'HOSPITAL' ? '#5027eb' : '#ffffff',
                boxShadow: activeCategory === 'HOSPITAL' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
              }}
              className="shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 hover:bg-white/30 backdrop-blur-xs"
            >
              <HospitalIcon size={12} className={activeCategory === 'HOSPITAL' ? 'text-[#5027eb]' : 'text-purple-200'} />
              <span>হাসপাতাল</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('EXTORTION')}
              style={{
                border: 'none',
                backgroundColor: activeCategory === 'EXTORTION' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeCategory === 'EXTORTION' ? '#5027eb' : '#ffffff',
                boxShadow: activeCategory === 'EXTORTION' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
              }}
              className="shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 hover:bg-white/30 backdrop-blur-xs"
            >
              <ExtortionIcon size={12} className={activeCategory === 'EXTORTION' ? 'text-[#5027eb]' : 'text-purple-200'} />
              <span>চাঁদাবাজি</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectCategory('UNIVERSITY')}
              style={{
                border: 'none',
                backgroundColor: activeCategory === 'UNIVERSITY' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeCategory === 'UNIVERSITY' ? '#5027eb' : '#ffffff',
                boxShadow: activeCategory === 'UNIVERSITY' ? '0 2px 8px rgba(0, 0, 0, 0.15)' : 'none'
              }}
              className="shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 hover:bg-white/30 backdrop-blur-xs"
            >
              <UniversityIcon size={12} className={activeCategory === 'UNIVERSITY' ? 'text-[#5027eb]' : 'text-purple-200'} />
              <span>বিশ্ববিদ্যালয়</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
