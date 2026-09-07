'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BribeReport, IncidentCategory } from '@/lib/types';
import DistributionChart from './DistributionChart';
import { toBn } from '@/lib/format';
import {
  PhoneIcon,
  CheckIcon,
  ShieldCheckIcon,
  StarIcon,
  BuildingIcon
} from './Icons';

interface TrendingSidebarProps {
  reports: BribeReport[];
  activeCategory?: IncidentCategory | 'ALL';
  onSelectCategory?: (cat: IncidentCategory | 'ALL') => void;
}

export default function TrendingSidebar({
  reports,
  activeCategory = 'ALL',
  onSelectCategory
}: TrendingSidebarProps) {
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Category-Specific Emergency Hotlines Data
  const hotlinesByCategory: Record<string, Array<{ id: string; name: string; desc: string; phone: string; badge: string; initials: string }>> = {
    HOSPITAL: [
      { id: 'h-h1', name: 'স্বাস্থ্য বাতায়ন (DGHS)', desc: 'হাসপাতাল সেবা ও অভিযোগ', phone: '১৬২৬৩', badge: '২৪/৭ খোলা', initials: 'স্বাস্থ্য' },
      { id: 'h-h2', name: 'জরুরি অ্যাম্বুলেন্স সেবা', desc: 'তাৎক্ষণিক সরকারি অ্যাম্বুলেন্স', phone: '৯৯৯', badge: 'টোল ফ্রি', initials: '৯৯৯' },
      { id: 'h-h3', name: 'ঔষধ প্রশাসন অধিদপ্তর', desc: 'ওষুধের অতিরিক্ত মূল্য ও নকল', phone: '০২-৯৫৮২৩০৭', badge: 'সরকারি', initials: 'ঔষধ' },
      { id: 'h-h4', name: 'দুদক স্বাস্থ্য সেক্টর সেল', desc: 'হাসপাতাল অনিয়ম ও টেস্ট কমিশন', phone: '১০৬', badge: 'হটলাইন', initials: 'দুদক' }
    ],
    EXTORTION: [
      { id: 'h-e1', name: 'চাঁদাবাজি ও ক্রাইম রিপোর্ট', desc: 'দখলদারি ও সন্ত্রাস দমন', phone: '৯৯৯', badge: 'জরুরি', initials: '৯৯৯' },
      { id: 'h-e2', name: 'র‍্যাব হটলাইন (RAB)', desc: 'চাঁদাবাজি ও সিন্ডিকেট সেল', phone: '০১৭৭৭৭২০০২৯', badge: '২৪/৭', initials: 'র‍্যাব' },
      { id: 'h-e3', name: 'ভোক্তা অধিকার সংরক্ষণ', desc: 'বাজার ও পরিবহন অতিরিক্ত টোল', phone: '১৬১২১', badge: 'টোল ফ্রি', initials: 'ভোক্তা' },
      { id: 'h-e4', name: 'দুদক সিন্ডিকেট সেল', desc: 'পাবলিক স্পেস দখল ও তোল্লা', phone: '১০৬', badge: 'সক্রিয়', initials: 'দুদক' }
    ],
    UNIVERSITY: [
      { id: 'h-u1', name: 'ইউজিসি ভিজিল্যান্স সেল', desc: 'বিশ্ববিদ্যালয় দুর্নীতি ও অভিযোগ', phone: '০২-৫৮১৬০৪১৮', badge: 'ইউজিসি', initials: 'UGC' },
      { id: 'h-u2', name: 'শিক্ষা মন্ত্রণালয় হটলাইন', desc: 'উচ্চশিক্ষা ও ভর্তি অনিয়ম', phone: '১৬১০৩', badge: 'টোল ফ্রি', initials: 'শিক্ষা' },
      { id: 'h-u3', name: 'দুদক শিক্ষা ও নিয়োগ সেল', desc: 'নিয়োগ ও উন্নয়ন বাজেট কেলেঙ্কারি', phone: '১০৬', badge: 'হটলাইন', initials: 'দুদক' },
      { id: 'h-u4', name: 'জাতীয় আইনি সহায়তা', desc: 'শিক্ষার্থী অধিকার ও আইনি সুরক্ষা', phone: '১৬৪৩০', badge: 'বিনামূল্যে', initials: 'আইন' }
    ],
    BRIBE: [
      { id: 'h-b1', name: 'দুদক অভিযোগ সেল (ACC)', desc: 'ঘুষ দাবি ও ফাঁদ অভিযান', phone: '১০৬', badge: 'টোল ফ্রি', initials: 'দুদক' },
      { id: 'h-b2', name: 'জনপ্রশাসন সেল', desc: 'কর্মকর্তা দুর্নীতি ও সেবা হয়রানি', phone: '০২-৯৫৪৫৮৪৫', badge: 'সরকারি', initials: 'প্রশাসন' },
      { id: 'h-b3', name: 'জাতীয় জরুরি সেবা', desc: 'ঘুষে তাৎক্ষণিক হয়রানি', phone: '৯৯৯', badge: '২৪/৭', initials: '৯৯৯' },
      { id: 'h-b4', name: 'জেলা ম্যাজিস্ট্রেট হটলাইন', desc: 'ভূমি ও নাগরিক প্রশাসনিক সেবা', phone: '৩৩৩', badge: 'সক্রিয়', initials: '৩৩৩' }
    ],
    ALL: [
      { id: 'h-a1', name: 'দুদক হটলাইন সেল (ACC)', desc: 'দুর্নীতি ও ঘুষের অভিযোগ', phone: '১০৬', badge: '২৪/৭ খোলা', initials: 'দুদক' },
      { id: 'h-a2', name: 'জাতীয় জরুরি সেবা (৯৯৯)', desc: 'পুলিশ, অ্যাম্বুলেন্স ও ফায়ার', phone: '৯৯৯', badge: 'টোল ফ্রি', initials: '৯৯৯' },
      { id: 'h-a3', name: 'স্বাস্থ্য বাতায়ন (DGHS)', desc: 'হাসপাতাল সেবা ও চিকিৎসা', phone: '১৬২৬৩', badge: 'সক্রিয়', initials: 'স্বাস্থ্য' },
      { id: 'h-a4', name: 'ভোক্তা অধিকার সংরক্ষণ', desc: 'চাঁদাবাজি ও অতিরিক্ত মূল্য', phone: '১৬১২১', badge: 'সক্রিয়', initials: 'ভোক্তা' }
    ]
  };

  // 2. Category-Specific Top Reported Sectors & Hotspots Data
  const topSectorsByCategory: Record<string, Array<{ name: string; count: number; percent: number; district: string }>> = {
    HOSPITAL: [
      { name: 'জরুরি বিভাগ ও আইসিইউ বেড দালাল', count: 32, percent: 88, district: 'ঢামেক, শমেক, সিএমসিএইচ' },
      { name: 'সরকারি ওষুধ বাইরে বিক্রি ও টেস্ট কমিশন', count: 26, percent: 72, district: 'মিটফোর্ড, রামেক, বমেক' },
      { name: 'ওয়ার্ডবয় ট্রলি ও বেড বকশিশ', count: 21, percent: 58, district: 'শহীদ সোহরাওয়ার্দী, চমেক' },
      { name: 'জরুরি অ্যাম্বুলেন্স সিন্ডিকেট', count: 16, percent: 45, district: 'পঙ্গু হাসপাতাল, সোহরাওয়ার্দী' }
    ],
    EXTORTION: [
      { name: 'বাস টার্মিনাল ও পরিবহন জিপি', count: 38, percent: 92, district: 'গাবতলী, সায়েদাবাদ, মহাখালী' },
      { name: 'ফুটপাত ও কাঁচাবাজার দৈনিক লাইনম্যান তোল্লা', count: 34, percent: 84, district: 'কারওয়ান বাজার, নিউমার্কেট, চকবাজার' },
      { name: 'ভবন নির্মাণ ও বালু সাপ্লাই সিন্ডিকেট', count: 27, percent: 66, district: 'উত্তরা, বসুন্ধরা, পূর্বাচল' },
      { name: 'অটো ও লেগুনা স্ট্যান্ড চাঁদা', count: 21, percent: 52, district: 'মিরপুর ১০, যাত্রাবাড়ী, টঙ্গী' }
    ],
    UNIVERSITY: [
      { name: 'আবাসিক হল দখল ও গণরুম সিট বাণিজ্য', count: 35, percent: 89, district: 'ঢাকা বিশ্ববিদ্যালয়, রাবি, চবি' },
      { name: 'শিক্ষক ও কর্মকর্তা নিয়োগ বাণিজ্য', count: 29, percent: 75, district: 'জাবি, বেরোবি, ইবি' },
      { name: 'গবেষণা ও উন্নয়ন বাজেট আত্মসাৎ', count: 23, percent: 58, district: 'বিভিন্ন পাবলিক বিশ্ববিদ্যালয়' },
      { name: 'ডাইনিং ও ক্যান্টিন সিন্ডিকেট', count: 18, percent: 46, district: 'বুয়েট, ঢাবি, কুয়েট' }
    ],
    BRIBE: [
      { name: 'ভূমি অফিস (নামজারি ও মিসকেস)', count: 42, percent: 95, district: 'তেজগাঁও, সাভার, কেরানীগঞ্জ' },
      { name: 'বিআরটিএ (ড্রাইভিং লাইসেন্স ও ফিটনেস)', count: 36, percent: 82, district: 'মিরপুর, ইকুরিয়া, চট্টগ্রাম' },
      { name: 'পাসপোর্ট অফিস (ভেরিফিকেশন)', count: 31, percent: 76, district: 'আগারগাঁও, যাত্রাবাড়ী, উত্তরা' },
      { name: 'তিতাস গ্যাস ও বিদ্যুৎ সংযোগ', count: 25, percent: 64, district: 'নারায়ণগঞ্জ, গাজীপুর, সাভার' }
    ],
    ALL: [
      { name: 'ভূমি ও সাব-রেজিস্ট্রি অফিস', count: 42, percent: 95, district: 'ঢাকা, চট্টগ্রাম, সিলেট' },
      { name: 'বিআরটিএ (লাইসেন্স ও ফিটনেস)', count: 36, percent: 82, district: 'মিরপুর, ইকুরিয়া, কুমিল্লা' },
      { name: 'সরকারি হাসপাতাল ও ডায়াগনস্টিক', count: 32, percent: 75, district: 'ঢামেক, শমেক, রামেক' },
      { name: 'বিশ্ববিদ্যালয় দুর্নীতি ও সিট বাণিজ্য', count: 29, percent: 68, district: 'ঢাবি, রাবি, জাবি' }
    ]
  };

  // 3. Category-Specific Honest Officers (Clean Abstract Badges)
  const honestOfficersByCategory: Record<string, Array<{ id: string; name: string; role: string; praise: string; initial: string }>> = {
    HOSPITAL: [
      { id: 'o-h1', name: 'ডা: অনীকা রহমান', role: 'সহকারী অধ্যাপক, ঢামেক', praise: '১৪২ নাগরিক প্রশংসা', initial: 'অ' },
      { id: 'o-h2', name: 'ডা: মাহমুদুল হাসান', role: 'মেডিকেল অফিসার, সলিমুল্লাহ', praise: '১১৮ নাগরিক প্রশংসা', initial: 'ম' },
      { id: 'o-h3', name: 'নার্স রেহানা পারভীন', role: 'সিনিয়র স্টাফ নার্স, শমেক', praise: '৯৫ নাগরিক প্রশংসা', initial: 'র' }
    ],
    EXTORTION: [
      { id: 'o-e1', name: 'তানভীর আহমেদ', role: 'নির্বাহী ম্যাজিস্ট্রেট (টার্মিনাল অভিযান)', praise: '১৬৫ নাগরিক প্রশংসা', initial: 'ত' },
      { id: 'o-e2', name: 'কাজী আরিফুল হক', role: 'উপ-কমিশনার, ডিএমপি', praise: '১২৪ নাগরিক প্রশংসা', initial: 'ক' },
      { id: 'o-e3', name: 'এসআই ফয়সাল আহমেদ', role: 'ট্রাফিক বিভাগ (জিপি মুক্ত স্ট্যান্ড)', praise: '৮৯ নাগরিক প্রশংসা', initial: 'ফ' }
    ],
    UNIVERSITY: [
      { id: 'o-u1', name: 'অধ্যাপক ড. সাজিদ হোসেন', role: 'বিভাগীয় প্রধান, ঢাবি (স্বচ্ছ নিয়োগ)', praise: '১৩৬ নাগরিক প্রশংসা', initial: 'স' },
      { id: 'o-u2', name: 'ড. ফারহানা চৌধুরী', role: 'প্রভোস্ট, রোকেয়া হল (মেধাভিত্তিক সিট)', praise: '১২১ নাগরিক প্রশংসা', initial: 'ফ' },
      { id: 'o-u3', name: 'জামিল মোস্তফা', role: 'পরীক্ষা শাখা (দালালহীন সনদ)', praise: '৯২ নাগরিক প্রশংসা', initial: 'জ' }
    ],
    BRIBE: [
      { id: 'o-b1', name: 'তানভীর আহমেদ', role: 'সহকারী কমিশনার (ভূমি), ঢাকা', praise: '১৮০ নাগরিক প্রশংসা', initial: 'ত' },
      { id: 'o-b2', name: 'রফিকুল ইসলাম', role: 'সহকারী পরিচালক, বিআরটিএ', praise: '১৫৩ নাগরিক প্রশংসা', initial: 'র' },
      { id: 'o-b3', name: 'শারমিন আক্তার', role: 'সহকারী পরিচালক, পাসপোর্ট অফিস', praise: '১০৮ নাগরিক প্রশংসা', initial: 'শ' }
    ],
    ALL: [
      { id: 'o-a1', name: 'ডা: অনীকা রহমান', role: 'সহকারী অধ্যাপক, ঢামেক', praise: '১৪২ নাগরিক প্রশংসা', initial: 'অ' },
      { id: 'o-a2', name: 'তানভীর আহমেদ', role: 'সহকারী কমিশনার (ভূমি), ঢাকা', praise: '১৮০ নাগরিক প্রশংসা', initial: 'ত' },
      { id: 'o-a3', name: 'রফিকুল ইসলাম', role: 'সহকারী পরিচালক, বিআরটিএ', praise: '১৫৩ নাগরিক প্রশংসা', initial: 'র' }
    ]
  };

  // 4. Category-Specific Citizen Rights & Privacy Guides
  const guideByCategory: Record<string, { title: string; text: string }> = {
    HOSPITAL: {
      title: 'স্বাস্থ্যসেবা ও রোগী অধিকার',
      text: 'সরকারি হাসপাতালে টিকিট কাটা ও জরুরি সেবা গ্রহণে কোনো দালালকে বাড়তি টাকা দেবেন না। রোগী হয়রানি বা আইসিইউ বাণিজ্যের প্রমাণ সরাসরি দিন।'
    },
    EXTORTION: {
      title: 'চাঁদাবাজি প্রতিরোধ ও তথ্য সুরক্ষা',
      text: 'দোকান, পরিবহন বা ভবন নির্মাণে চাঁদা দাবির সুনির্দিষ্ট স্থান ও দাবি করা অংকের তথ্য দিন। আপনার নাম বা পরিচয় কখনোই প্রকাশ করা হবে না।'
    },
    UNIVERSITY: {
      title: 'শিক্ষার্থী সুরক্ষা ও ক্যাম্পাস স্বচ্ছতা',
      text: 'ক্যাম্পাসে সিট দখল, ভর্তি বা শিক্ষক নিয়োগে বাণিজ্যের তথ্য নির্দ্বিধায় প্রকাশ করুন। শতভাগ পরিচয় গোপন রেখে পাবলিক লেজারে তথ্য নথিভুক্ত হবে।'
    },
    BRIBE: {
      title: 'ঘুষ প্রতিরোধ ও আইনি গ্যারান্টি',
      text: 'সরকারি কোনো সেবা পেতে ঘুষ দাবি করা হলে কর্মকর্তা ও দপ্তরের নামসহ রিপোর্ট করুন। পাবলিক লেজারে নথিভুক্ত তথ্য সরাসরি নজরে আনা হয়।'
    },
    ALL: {
      title: 'নাগরিক গোপনীয়তা গ্যারান্টি',
      text: 'ঘুষখোর.com-এ রিপোর্ট করতে কোনো অ্যাকাউন্ট বা পাসওয়ার্ড লাগে না। শতভাগ পরিচয় গোপন রেখে পাবলিক লেজারে তথ্য নথিভুক্ত হয়।'
    }
  };

  const hotlines = hotlinesByCategory[activeCategory] || hotlinesByCategory.ALL;
  const topSectors = topSectorsByCategory[activeCategory] || topSectorsByCategory.ALL;
  const honestOfficers = honestOfficersByCategory[activeCategory] || honestOfficersByCategory.ALL;
  const guide = guideByCategory[activeCategory] || guideByCategory.ALL;

  const getCategoryBadgeTitle = (cat: string) => {
    switch (cat) {
      case 'HOSPITAL': return 'স্বাস্থ্য খাত';
      case 'EXTORTION': return 'চাঁদাবাজি খাত';
      case 'UNIVERSITY': return 'বিশ্ববিদ্যালয় খাত';
      case 'BRIBE': return 'ঘুষ লেনদেন';
      default: return 'সার্বিক খাত';
    }
  };

  const handlePraise = (id: string, name: string) => {
    setConnectedIds(prev => ({ ...prev, [id]: !prev[id] }));
    if (!connectedIds[id]) {
      setToastMessage(`${name}-কে প্রশংসা জানানো হয়েছে!`);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="space-y-[15px] w-full max-w-full overflow-hidden box-border font-sans">
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            backgroundColor: '#f3f0ff',
            border: '1px solid #ddd6fe',
            color: '#5027eb',
            padding: '6px 12px',
            borderRadius: '12px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          className="shadow-xs"
        >
          <CheckIcon size={12} className="text-[#5027eb]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Transparency Ledger & Analytics Distribution Chart (Compact Right Side Widget) */}
      <DistributionChart reports={reports} activeCategory={activeCategory} />

      {/* 2. Emergency Hotlines Widget */}
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
        className="space-y-3.5 w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 leading-tight">
            <span className="w-2 h-2 rounded-full bg-[#5b3cf5] animate-pulse shrink-0" />
            <span>জরুরি সরকারি হটলাইন</span>
          </h3>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full shrink-0 border border-purple-100">
            {getCategoryBadgeTitle(activeCategory)}
          </span>
        </div>

        {/* Hotline List */}
        <div className="space-y-1.5 w-full">
          {hotlines.map((h) => (
            <div
              key={h.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                borderRadius: '10px',
                gap: '8px',
                boxSizing: 'border-box',
                width: '100%'
              }}
              className="hover:bg-purple-50/50 transition overflow-hidden"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                {/* Abstract Vector Badge */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '9999px',
                    backgroundColor: '#f3f0ff',
                    color: '#5027eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '10px',
                    flexShrink: 0
                  }}
                >
                  {h.initials}
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <h4 className="font-bold text-[11.5px] text-slate-900 truncate leading-snug">
                    {h.name}
                  </h4>
                  <p className="text-[9.5px] font-normal text-slate-400 truncate">
                    {h.desc}
                  </p>
                </div>
              </div>

              {/* Compact Call Pill Button */}
              <a
                href={`tel:${h.phone}`}
                style={{
                  border: 'none',
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  flexShrink: 0,
                  textDecoration: 'none',
                  whiteSpace: 'nowrap'
                }}
                className="hover:bg-[#5027eb] hover:text-white transition cursor-pointer"
                title={`কল করুন ${h.phone}`}
              >
                <PhoneIcon size={10} />
                <span>{h.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Top Reported Sectors & Hotspots Widget */}
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
        className="space-y-3.5 w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 leading-tight">
            <BuildingIcon size={14} className="text-slate-700 shrink-0" />
            <span>শীর্ষ অভিযোগপ্রাপ্ত খাতসমূহ</span>
          </h3>
          <Link href="/analytics" className="text-[10px] font-bold text-[#5027eb] hover:underline shrink-0">
            সব দেখুন →
          </Link>
        </div>

        {/* Sectors Progress List */}
        <div className="space-y-2.5 w-full">
          {topSectors.map((s, idx) => (
            <div key={idx} className="space-y-0.5 overflow-hidden w-full">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-800 truncate pr-1">{s.name}</span>
                <span className="text-[10px] font-bold text-slate-500 shrink-0">{toBn(s.count)} টি</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  style={{
                    width: `${s.percent}%`,
                    background: 'linear-gradient(90deg, #633ef8, #5027eb)'
                  }}
                  className="h-full rounded-full transition-all duration-300"
                />
              </div>
              <p className="text-[9.5px] text-slate-400 truncate">হটস্পট: {s.district}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Honest Officers Hall of Fame Widget */}
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
        className="space-y-3.5 w-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5 leading-tight">
            <StarIcon size={14} className="text-amber-500 shrink-0" />
            <span>সৎ কর্মকর্তা হল অব ফেম</span>
          </h3>
          <Link href="/whitelist" className="text-[10px] font-bold text-[#5027eb] hover:underline shrink-0">
            তালিকা →
          </Link>
        </div>

        {/* Officer List with Abstract Badges */}
        <div className="space-y-1.5 w-full">
          {honestOfficers.map((o) => {
            const isPraised = connectedIds[o.id];

            return (
              <div
                key={o.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  borderRadius: '10px',
                  gap: '8px',
                  boxSizing: 'border-box',
                  width: '100%'
                }}
                className="hover:bg-purple-50/50 transition overflow-hidden"
              >
                <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
                  {/* Abstract Anonymous Badge */}
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '9999px',
                      backgroundColor: '#f3f0ff',
                      color: '#5027eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '11px',
                      flexShrink: 0
                    }}
                  >
                    {o.initial}
                  </div>
                  <div className="min-w-0 flex-1 overflow-hidden">
                    <h4 className="font-bold text-[11.5px] text-slate-900 truncate leading-snug">
                      {o.name}
                    </h4>
                    <p className="text-[9.5px] font-normal text-slate-400 truncate">
                      {o.role}
                    </p>
                  </div>
                </div>

                {/* Praise Button */}
                <button
                  type="button"
                  onClick={() => handlePraise(o.id, o.name)}
                  style={{
                    border: 'none',
                    backgroundColor: isPraised ? '#e2e8f0' : '#5027eb',
                    color: isPraised ? '#334155' : '#ffffff',
                    padding: '3px 8px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    flexShrink: 0,
                    whiteSpace: 'nowrap'
                  }}
                  className="transition hover:opacity-95"
                >
                  {isPraised ? '✓ সমাদৃত' : 'প্রশংসা'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Citizen Privacy & Rights Guarantee */}
      <div
        style={{
          backgroundColor: '#f8fafc',
          borderRadius: '14px',
          padding: '14px 16px 16px 16px',
          border: '1px solid #e2e8f0',
          boxSizing: 'border-box',
          width: '100%'
        }}
        className="text-xs text-slate-600 space-y-1 w-full overflow-hidden"
      >
        <div className="flex items-center gap-1.5 text-slate-800 font-bold text-[11.5px]">
          <ShieldCheckIcon size={13} className="text-[#5b3cf5] shrink-0" />
          <span>{guide.title}</span>
        </div>
        <p className="text-[10px] font-normal text-slate-500 leading-relaxed">
          {guide.text}
        </p>
      </div>
    </div>
  );
}
