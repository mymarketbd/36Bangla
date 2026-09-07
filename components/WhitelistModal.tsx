'use client';

import React, { useState } from 'react';
import { DepartmentCategory, Division } from '@/lib/types';
import { StarIcon, CloseIcon, BuildingIcon, UserIcon } from './Icons';

interface WhitelistModalProps {
  onClose: () => void;
  onSubmit: (whitelistData: {
    department: DepartmentCategory;
    officeName: string;
    division: Division;
    district: string;
    servicePraised: string;
    officerName: string;
    officerDesignation: string;
    positiveReview: string;
    rating: number;
  }) => void;
}

const departmentsList: DepartmentCategory[] = [
  'ভূমি অফিস ও রেজিস্ট্রি',
  'বিআরটিএ (BRTA)',
  'পাসপোর্ট ও ইমিগ্রেশন',
  'বিচার বিভাগ ও আদালত',
  'পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা',
  'নির্বাচন কমিশন ও এনআইডি',
  'পুলিশ ও ট্রাফিক',
  'কাস্টমস ও ভ্যাট',
  'হাসপাতাল ও স্বাস্থ্যসেবা',
  'পৌরসভা ও সিটি কর্পোরেশন',
  'বিদ্যুৎ, গ্যাস ও তিতাস',
  'অন্যান্য সরকারি দপ্তর'
];

export default function WhitelistModal({ onClose, onSubmit }: WhitelistModalProps) {
  const [department, setDepartment] = useState<DepartmentCategory>('পাসপোর্ট ও ইমিগ্রেশন');
  const [division, setDivision] = useState<Division>('Dhaka');
  const [district, setDistrict] = useState('ঢাকা');
  const [officeName, setOfficeName] = useState('');
  const [servicePraised, setServicePraised] = useState('');
  const [officerName, setOfficerName] = useState('');
  const [officerDesignation, setOfficerDesignation] = useState('');
  const [positiveReview, setPositiveReview] = useState('');
  const [rating, setRating] = useState<number>(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeName.trim() || !servicePraised.trim() || !positiveReview.trim()) {
      alert('অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }

    onSubmit({
      department,
      officeName: officeName.trim(),
      division,
      district: district.trim() || 'ঢাকা',
      servicePraised: servicePraised.trim(),
      officerName: officerName.trim(),
      officerDesignation: officerDesignation.trim(),
      positiveReview: positiveReview.trim(),
      rating
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 max-w-xl w-full space-y-5 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-amber-600 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <StarIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>সততার স্বীকৃতি ও হোয়াইটলিস্ট</span>
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              ঘুষমুক্ত ও সৎ অফিসের প্রশংসা করুন
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 p-1">
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">দপ্তরের ক্যাটাগরি *</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-bold outline-none focus:border-amber-500"
            >
              {departmentsList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">জেলা *</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">অফিসের সুনির্দিষ্ট নাম *</label>
              <input
                type="text"
                placeholder="যেমন: আগারগাঁও পাসপোর্ট অফিস"
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">সৎ কর্মকর্তা / কর্মচারীর নাম (ঐচ্ছিক)</label>
              <input
                type="text"
                placeholder="যেমন: মোহাম্মদ রফিকুল ইসলাম"
                value={officerName}
                onChange={(e) => setOfficerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">কর্মকর্তার পদবি</label>
              <input
                type="text"
                placeholder="যেমন: সহকারী পরিচালক"
                value={officerDesignation}
                onChange={(e) => setOfficerDesignation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">কী সেবার ক্ষেত্রে সততা পেয়েছেন? *</label>
            <input
              type="text"
              placeholder="যেমন: ই-পাসপোর্ট রি-ইস্যু / জমি খারিজ"
              value={servicePraised}
              onChange={(e) => setServicePraised(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">আপনার ইতিবাচক অভিজ্ঞতা সংক্ষেপে লিখুন *</label>
            <textarea
              rows={3}
              placeholder="কীভাবে কোনো ঘুষ বা হয়রানি ছাড়া নির্ধারিত সময়ে সেবা পেয়েছেন..."
              value={positiveReview}
              onChange={(e) => setPositiveReview(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 outline-none focus:border-amber-500 resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 font-bold"
            >
              বাতিল
            </button>
            <button
              type="submit"
              className="smart-btn-secondary px-6 py-2.5 text-xs font-black bg-amber-500 hover:bg-amber-600 text-white border-none shadow-md"
            >
              সততার প্রশংসা পোস্ট করুন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
