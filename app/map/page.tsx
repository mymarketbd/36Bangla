'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BangladeshMap from '@/components/BangladeshMap';
import ReportModal from '@/components/ReportModal';
import WhitelistModal from '@/components/WhitelistModal';
import { useRouter } from 'next/navigation';
import { MapIcon } from '@/components/Icons';

export default function MapPage() {
  const router = useRouter();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-slate-900 flex flex-col font-sans">
      <Header
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenWhitelist={() => setIsWhitelistModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8 flex-1">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <span className="smart-badge-dept text-xs uppercase inline-flex items-center gap-1.5">
            <MapIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>ভৌগোলিক করাপশন ইনডেক্স</span>
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            বাংলাদেশের ৬৪ জেলা করাপশন হিটম্যাপ
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            কোন বিভাগে বা কোন জেলায় ঘুষের দাবি সবচেয়ে বেশি? জেলা অনুযায়ী গড় দাবিকৃত অঙ্ক এবং শীর্ষ দপ্তর বিশ্লেষণ করুন।
          </p>
        </div>

        <BangladeshMap
          onSelectDistrict={(dist) => {
            router.push(`/?search=${encodeURIComponent(dist)}`);
          }}
        />
      </main>

      {isReportModalOpen && (
        <ReportModal
          onClose={() => setIsReportModalOpen(false)}
          onSubmit={() => setIsReportModalOpen(false)}
        />
      )}

      {isWhitelistModalOpen && (
        <WhitelistModal
          onClose={() => setIsWhitelistModalOpen(false)}
          onSubmit={() => setIsWhitelistModalOpen(false)}
        />
      )}

      <Footer />
    </div>
  );
}
