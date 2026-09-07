import React from 'react';
import Link from 'next/link';
import {
  FeedIcon,
  StarIcon,
  MapIcon,
  ChartIcon,
  LightbulbIcon,
  ShieldCheckIcon,
  LockIcon,
  DownloadIcon
} from './Icons';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-white shadow-xs p-0.5 border border-slate-200">
                <img src="/logo.png" alt="36 Bangla" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-lg text-slate-900">36 Bangla <span className="text-[#5027eb] text-sm">(৩৬ বাংলা)</span></span>
              <span className="smart-badge-dept text-[10px]">পাবলিক ওপেন লেজার</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
              36 Bangla কোনো সরকারি অভিযোগ কর্তৃপক্ষ নয়। এটি বাংলাদেশের নাগরিকদের অভিজ্ঞতা ভিত্তিক একটি সম্পূর্ণ বেনামী (Anonymous) ও পাবলিক সোশ্যাল লেজার। এখানে কোনো ইউজার একাউন্ট বা ব্যক্তিগত আইপি ট্র্যাকিং হয় না।
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-[#5027eb] font-bold">
              <LockIcon className="w-3.5 h-3.5 text-[#5027eb]" />
              <span>সম্পূর্ণ বেনামী ও এন্ড-টু-এন্ড প্রাইভেসি নিশ্চিত</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-extrabold uppercase text-xs tracking-wider">প্ল্যাটফর্ম লিংক</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-emerald-700 transition flex items-center gap-2">
                  <FeedIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>লাইভ নিউজফিড</span>
                </Link>
              </li>
              <li>
                <Link href="/whitelist" className="hover:text-emerald-700 transition flex items-center gap-2">
                  <StarIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>ঘুষমুক্ত সৎ দপ্তর</span>
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-emerald-700 transition flex items-center gap-2">
                  <MapIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span>৬৪ জেলা করাপশন ম্যাপ</span>
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-emerald-700 transition flex items-center gap-2">
                  <ChartIcon className="w-3.5 h-3.5 text-cyan-600" />
                  <span>উন্মুক্ত ডেটা ও ডাউনলোড</span>
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="hover:text-emerald-700 transition flex items-center gap-2">
                  <LightbulbIcon className="w-3.5 h-3.5 text-amber-500" />
                  <span>ফিচার রিকোয়েস্ট ও ভোট</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Open Data */}
          <div className="space-y-2.5">
            <h4 className="text-slate-900 font-extrabold uppercase text-xs tracking-wider">উন্মুক্ত ডেটা ও নীতি</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/analytics" className="hover:text-emerald-700 transition flex items-center gap-2">
                  <DownloadIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>বাল্ক ডেটা ডাউনলোড (CSV/JSON)</span>
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Creative Commons CC BY 4.0</span>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-700 transition text-slate-500 flex items-center gap-2">
                  <ShieldCheckIcon className="w-3.5 h-3.5 text-slate-400" />
                  <span>সুপার অ্যাডমিন মডারেশন</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-slate-400 text-[11px]">
          <p>© 2026 36 Bangla (৩৬ বাংলা) • সত্য ও উন্মুক্ত তথ্য সবার জন্য।</p>
          <p>Privacy First • Zero Logs • 100% Crowdsourced Public Ledger</p>
        </div>
      </div>
    </footer>
  );
}
