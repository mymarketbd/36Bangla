'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IncidentCategory } from '@/lib/types';
import {
  FeedIcon,
  StarIcon,
  MapIcon,
  ChartIcon,
  LightbulbIcon,
  FlameIcon
} from './Icons';

interface SidebarNavigationProps {
  activeCategory?: IncidentCategory | 'ALL';
  onSelectCategory?: (cat: IncidentCategory | 'ALL') => void;
  counts?: {
    all: number;
    bribe: number;
    hospital: number;
    extortion: number;
    university: number;
  };
}

export default function SidebarNavigation({
  activeCategory = 'ALL',
  onSelectCategory,
  counts
}: SidebarNavigationProps) {
  const pathname = usePathname() || '/';

  const navLinks = [
    {
      name: 'প্রধান অভিযোগ ফিড',
      desc: 'সর্বশেষ নাগরিক পোস্ট ও রিপোর্ট',
      href: '/',
      icon: FeedIcon,
      isActive: pathname === '/'
    },
    {
      name: '৬৪ জেলা করাপশন ম্যাপ',
      desc: 'জেলাভিত্তিক দুর্নীতির লাইভ মানচিত্র',
      href: '/map',
      icon: MapIcon,
      isActive: pathname === '/map'
    },
    {
      name: 'সৎ দপ্তর হল অব ফেম',
      desc: 'ঘুষমুক্ত ও প্রশংসিত অফিস তালিকা',
      href: '/whitelist',
      icon: StarIcon,
      isActive: pathname === '/whitelist'
    },
    {
      name: 'উন্মুক্ত ডেটা ও পরিসংখ্যান',
      desc: 'অ্যানালিটিক্স ও পাবলিক ডেটাসেট',
      href: '/analytics',
      icon: ChartIcon,
      isActive: pathname === '/analytics'
    },
    {
      name: 'ফিচার ও উন্নয়ন পরামর্শ',
      desc: 'নাগরিক মতামত ও অভিযোগ বক্স',
      href: '/feedback',
      icon: LightbulbIcon,
      isActive: pathname === '/feedback'
    }
  ];

  const trendingTopics = [
    { name: 'ভূমি অফিস নামজারি ও রেকর্ড', count: '২.২k রিপোর্ট' },
    { name: 'সরকারি হাসপাতাল আইসিইউ ও ওষুধ', count: '১.৮k রিপোর্ট' },
    { name: 'টার্মিনাল ও পরিবহন চাঁদাবাজি', count: '১.৪k রিপোর্ট' },
    { name: 'বিআরটিএ ড্রাইভিং লাইসেন্স', count: '৯৫২ রিপোর্ট' }
  ];

  return (
    <aside className="space-y-[15px] w-full">
      {/* 1. Main Platform Navigation Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="text-xs font-extrabold text-slate-900 tracking-wide flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#5b3cf5]" />
            <span>ন্যাভিগেশন চ্যানেল</span>
          </h3>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
            পাবলিক
          </span>
        </div>

        {/* Navigation Channels */}
        <nav className="space-y-1.5 text-xs">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  border: link.isActive ? '1px solid #ddd6fe' : '1px solid transparent',
                  background: link.isActive ? '#f3f0ff' : 'transparent',
                  color: link.isActive ? '#5027eb' : '#334155'
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left cursor-pointer ${
                  link.isActive
                    ? 'font-bold shadow-xs'
                    : 'hover:bg-slate-50 hover:text-slate-900 font-medium'
                }`}
              >
                <div
                  style={{
                    background: link.isActive ? 'linear-gradient(135deg, #633ef8 0%, #5027eb 100%)' : '#f1f5f9',
                    color: link.isActive ? '#ffffff' : '#64748b'
                  }}
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-xs"
                >
                  <Icon size={14} />
                </div>
                <div className="min-w-0">
                  <div className="leading-tight truncate text-[12px]">{link.name}</div>
                  <div className="text-[9.5px] text-slate-400 font-normal truncate mt-0.5">
                    {link.desc}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 2. Trending Hotspots Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center gap-1.5">
            <FlameIcon size={14} className="text-[#5b3cf5]" />
            <h3 className="text-xs font-extrabold text-slate-900">
              আলোচিত বিষয় ও হটস্পট
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">লাইভ</span>
        </div>

        <div className="space-y-2 text-xs">
          {trendingTopics.map((topic, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              <div className="min-w-0">
                <p className="font-bold text-[11.5px] text-slate-800 hover:text-[#5027eb] transition truncate leading-snug">
                  {topic.name}
                </p>
                <span className="text-[10px] text-slate-400 font-normal">
                  {topic.count}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-slate-100 text-center">
          <Link href="/analytics" className="text-xs font-bold text-[#5027eb] hover:underline">
            বিস্তারিত রিপোর্ট দেখুন →
          </Link>
        </div>
      </div>
    </aside>
  );
}
