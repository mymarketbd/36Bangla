'use client';

import React from 'react';
import { IncidentCategory } from '@/lib/types';
import { BribeIcon, HospitalIcon, ExtortionIcon, FlameIcon } from './Icons';

interface HeroBannerProps {
  activeCategory: IncidentCategory | 'ALL';
  onSelectCategory: (cat: IncidentCategory | 'ALL') => void;
  counts: {
    all: number;
    bribe: number;
    hospital: number;
    extortion: number;
  };
}

export default function HeroBanner({
  activeCategory,
  onSelectCategory,
  counts
}: HeroBannerProps) {
  return (
    <section className="bg-white border-b border-slate-200 py-4 sm:py-5 px-4">
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            অনিয়ম ও দুর্নীতির তথ্যচিত্র — <span className="text-rose-600">জনগণের সোশ্যাল ফিড</span>
          </h1>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            সরকারি অফিসের ঘুষ, হাসপাতালের ভোগান্তি বা চাঁদাবাজির ছবি, প্রমাণ ও সত্যতা যাচাই।
          </p>
        </div>

        {/* Clean Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'ALL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FlameIcon size={13} className={activeCategory === 'ALL' ? 'text-white' : 'text-slate-500'} />
            <span>সব</span>
          </button>

          <button
            onClick={() => onSelectCategory('BRIBE')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'BRIBE'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BribeIcon size={13} className={activeCategory === 'BRIBE' ? 'text-white' : 'text-slate-500'} />
            <span>ঘুষের দাবি</span>
          </button>

          <button
            onClick={() => onSelectCategory('HOSPITAL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'HOSPITAL'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <HospitalIcon size={13} className={activeCategory === 'HOSPITAL' ? 'text-white' : 'text-slate-500'} />
            <span>হাসপাতাল</span>
          </button>

          <button
            onClick={() => onSelectCategory('EXTORTION')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
              activeCategory === 'EXTORTION'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ExtortionIcon size={13} className={activeCategory === 'EXTORTION' ? 'text-white' : 'text-slate-500'} />
            <span>চাঁদাবাজি</span>
          </button>
        </div>
      </div>
    </section>
  );
}
