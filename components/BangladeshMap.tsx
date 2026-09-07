'use client';

import React, { useState } from 'react';
import { bangladeshDistricts } from '@/lib/sample-data';
import { DistrictSummary, Division } from '@/lib/types';
import { MapIcon, AlertCircleIcon, ArrowRightIcon } from './Icons';

interface BangladeshMapProps {
  onSelectDistrict: (districtName: string) => void;
}

export default function BangladeshMap({ onSelectDistrict }: BangladeshMapProps) {
  const [selectedDivision, setSelectedDivision] = useState<Division | 'ALL'>('ALL');
  const [activeDistrict, setActiveDistrict] = useState<DistrictSummary>(bangladeshDistricts[0]);

  const filteredDistricts = selectedDivision === 'ALL'
    ? bangladeshDistricts
    : bangladeshDistricts.filter((d) => d.division === selectedDivision);

  const divisionsList: { id: Division | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'সমগ্র বাংলাদেশ' },
    { id: 'Dhaka', label: 'ঢাকা' },
    { id: 'Chattogram', label: 'চট্টগ্রাম' },
    { id: 'Rajshahi', label: 'রাজশাহী' },
    { id: 'Khulna', label: 'খুলনা' },
    { id: 'Sylhet', label: 'সিলেট' },
    { id: 'Barishal', label: 'বরিশাল' },
    { id: 'Rangpur', label: 'রংপুর' },
    { id: 'Mymensingh', label: 'ময়মনসিংহ' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-base sm:text-xl font-black text-slate-900 flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-emerald-600" />
            <span>৬৪ জেলা করাপশন হিটম্যাপ</span>
            <span className="smart-badge-dept text-[10px]">লাইভ ডেটা ইনডেক্স</span>
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            যে কোনো জেলায় ক্লিক করে দাবিকৃত ঘুষ ও শীর্ষ দুর্নীতিপ্রবণ দপ্তর বিশ্লেষণ করুন
          </p>
        </div>

        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {divisionsList.map((div) => (
            <button
              key={div.id}
              onClick={() => setSelectedDivision(div.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedDivision === div.id
                  ? 'bg-emerald-600 text-white font-black shadow-sm'
                  : 'bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
            >
              {div.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Layout: Interactive District Grid & Active District Spotlight */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* District Selector Matrix (Left 7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-2">
          {filteredDistricts.map((dist) => {
            const isSelected = activeDistrict.name === dist.name;
            const isHighDensity = dist.totalReports > 200;
            return (
              <button
                key={dist.name}
                onClick={() => setActiveDistrict(dist)}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm text-slate-900">{dist.bnName}</span>
                  {isHighDensity && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="উচ্চ অভিযোগ ঘনত্ব" />
                  )}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-medium">{dist.totalReports} রিপোর্ট</span>
                  <span className="font-mono font-black text-amber-700">
                    ৳{(dist.totalAmount / 100000).toFixed(1)}L
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active District Spotlight Card (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-white border border-emerald-300 rounded-3xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                জেলা স্পটলাইট
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                {activeDistrict.bnName} জেলা
              </h4>
            </div>
            <span className="smart-badge-dept text-xs">
              {activeDistrict.division} বিভাগ
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">মোট রিপোর্ট</span>
              <span className="font-mono font-black text-xl text-emerald-700">
                {activeDistrict.totalReports} টি
              </span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">গড় দাবিকৃত ঘুষ</span>
              <span className="font-mono font-black text-xl text-amber-700">
                ৳{activeDistrict.avgBribe.toLocaleString('en-BD')}
              </span>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm space-y-1 text-xs">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">সর্বাধিক অভিযোগের দপ্তর</span>
            <span className="font-extrabold text-sm text-rose-700 flex items-center gap-1.5">
              <AlertCircleIcon className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{activeDistrict.topDepartment}</span>
            </span>
          </div>

          <button
            onClick={() => onSelectDistrict(activeDistrict.bnName)}
            className="w-full smart-btn-emerald py-3 text-xs font-black uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{activeDistrict.bnName} জেলার রিপোর্ট দেখুন</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
