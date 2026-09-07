'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ReportModal from '@/components/ReportModal';
import WhitelistModal from '@/components/WhitelistModal';

export default function PressPage() {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isWhitelistModalOpen, setIsWhitelistModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080c14] text-white flex flex-col">
      <Header
        onOpenReport={() => setIsReportModalOpen(true)}
        onOpenWhitelist={() => setIsWhitelistModalOpen(true)}
      />

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full space-y-10 flex-1">
        <div className="space-y-3 text-center">
          <span className="gold-badge text-xs uppercase">
            📰 প্রেস কিট ও প্রাইভেসি মেথডোলজি
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            36 Bangla (৩৬ বাংলা) — কীভাবে আমরা স্বচ্ছতা নিশ্চিত করি
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
            বাংলাদেশের নাগরিকদের জন্য সম্পূর্ণ পরিচয়হীন, অ্যাকাউন্টবিহীন এবং প্রাইভেসি-ফার্স্ট ট্রান্সপারেন্সি প্ল্যাটফর্ম।
          </p>
        </div>

        {/* FAQ & Methodologies */}
        <div className="space-y-6">
          <div className="bg-[#0f1626] border border-white/5 rounded-2xl p-6 space-y-2.5">
            <h3 className="text-base font-extrabold text-white">
              ১. আমার পরিচয় কি কোনোভাবে ফাঁস হতে পারে?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              না। 36 Bangla-তে কোনো একাউন্ট তৈরি করতে হয় না, কোনো ইমেইল বা ফোন নম্বর চাওয়া হয় না। এমনকি ডাটাবেজে আপনার কোনো আইপি অ্যাড্রেস বা ডিভাইস ফিঙ্গারপ্রিন্ট সংরক্ষণ করা হয় না।
            </p>
          </div>

          <div className="bg-[#0f1626] border border-white/5 rounded-2xl p-6 space-y-2.5">
            <h3 className="text-base font-extrabold text-white">
              ২. ভেরিফাইড (Verified ✅) ব্যাজ কীভাবে দেওয়া হয়?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              যেসব অভিযোগে স্পষ্ট প্রমাণপত্র (যেমন: আবেদন রশিদ, কথোপকথনের অডিও, ভিডিও বা অফিসের ট্র্যাকিং স্লিপ) সংযুক্ত থাকে, সেগুলো মডারেশন টিম দ্বারা প্রাথমিক যাচাইয়ের পর 'ভেরিফাইড রিপোর্ট' হিসেবে চিহ্নিত করা হয়।
            </p>
          </div>

          <div className="bg-[#0f1626] border border-white/5 rounded-2xl p-6 space-y-2.5">
            <h3 className="text-base font-extrabold text-white">
              ৩. মিথ্যা বা ফেক অভিযোগ কীভাবে প্রতিহত করা হয়?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              আমরা কোনো নির্দিষ্ট ব্যক্তির ব্যক্তিগত চরিত্র হনন সমর্থন করি না। কেবল দপ্তর, স্থান, অঙ্ক ও প্রাতিষ্ঠানিক আচরণ নথিভুক্ত করা হয়। এছাড়া কমিউনিটি কনফার্মেশন ও মডারেশন ফিল্টারের মাধ্যমে ফেক তথ্য প্রতিরোধ করা হয়।
            </p>
          </div>

          <div className="bg-[#0f1626] border border-white/5 rounded-2xl p-6 space-y-2.5">
            <h3 className="text-base font-extrabold text-white">
              ৪. ওপেন ডেটা ব্যবহারের নিয়ম কী?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              এই প্ল্যাটফর্মের সমস্ত ডেটা Creative Commons Attribution 4.0 International (CC BY 4.0) লাইসেন্সের অধীন। সাংবাদিক, গবেষক ও পলিসি মেকাররা উৎস উল্লেখ করে বিনামূল্যে সব ডেটা ডাউনলোড ও ব্যবহার করতে পারবেন।
            </p>
          </div>
        </div>
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
