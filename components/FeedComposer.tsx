'use client';

import React, { useRef, useState } from 'react';
import { IncidentCategory } from '@/lib/types';
import { ImageIcon, FileTextIcon, LocationPinIcon } from './Icons';

interface FeedComposerProps {
  onOpenComposer: (category?: IncidentCategory, preloadedImage?: string) => void;
  onSubmitQuickPost?: (text: string) => void;
}

export default function FeedComposer({ onOpenComposer, onSubmitQuickPost }: FeedComposerProps) {
  const [postText, setPostText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onOpenComposer('BRIBE', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (postText.trim()) {
      if (onSubmitQuickPost) {
        onSubmitQuickPost(postText.trim());
        setPostText('');
      } else {
        onOpenComposer('BRIBE');
      }
    } else {
      onOpenComposer('BRIBE');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200/70 space-y-3.5 w-full transition-all">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={docInputRef}
        accept=".pdf,.doc,.docx,.jpg,.png"
        onChange={handleImageFileChange}
        className="hidden"
      />

      {/* 1. Header: Icon + Title & Subtitle */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug">
            আপনি কি অনিয়ম বা দুর্নীতির শিকার হয়েছেন?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-normal">
            আপনার অভিযোগ বা অনিয়মের তথ্য দিন, ছবি/ডকুমেন্ট সংযুক্ত করুন।
          </p>
        </div>
      </div>

      {/* 2. Text Input Area */}
      <div className="w-full bg-[#f8fafc] border border-slate-200/80 rounded-xl p-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-400 transition">
        <textarea
          rows={2}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="আপনার অভিযোগ লিখুন..."
          className="w-full bg-transparent border-none outline-none resize-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-normal leading-relaxed"
        />
      </div>

      {/* 3. Bottom Action Bar */}
      <div className="flex items-center justify-between gap-2 pt-1">
        {/* Left Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* ছবি */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer"
          >
            <ImageIcon size={14} className="text-slate-600" />
            <span>ছবি</span>
          </button>

          {/* ডকুমেন্ট */}
          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer"
          >
            <FileTextIcon size={14} className="text-slate-600" />
            <span>ডকুমেন্ট</span>
          </button>

          {/* লোকেশন */}
          <button
            type="button"
            onClick={() => onOpenComposer('BRIBE')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200/90 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium transition cursor-pointer"
          >
            <LocationPinIcon size={14} className="text-slate-600" />
            <span>লোকেশন</span>
          </button>
        </div>

        {/* Right Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#4F46E5] hover:bg-[#4338CA] active:scale-98 text-white px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm hover:shadow transition cursor-pointer shrink-0"
        >
          <svg className="w-4 h-4 rotate-45 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>অভিযোগ পোস্ট করুন</span>
        </button>
      </div>
    </div>
  );
}
