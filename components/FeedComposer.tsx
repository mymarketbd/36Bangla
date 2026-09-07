'use client';

import React, { useRef } from 'react';
import { IncidentCategory } from '@/lib/types';
import { ImageIcon, FileTextIcon, LocationPinIcon, UserIcon } from './Icons';

interface FeedComposerProps {
  onOpenComposer: (category?: IncidentCategory, preloadedImage?: string) => void;
}

export default function FeedComposer({ onOpenComposer }: FeedComposerProps) {
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

  return (
    <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 space-y-4 w-full transition-all">
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

      {/* Top Row: Anonymous Vector Avatar + Light Gray Text Input Box */}
      <div className="flex items-center gap-3.5">
        {/* Modern Anonymous Silhouette Avatar (Vibrant Purple Theme) */}
        <div
          onClick={() => onOpenComposer('BRIBE')}
          style={{
            background: 'linear-gradient(135deg, #633ef8 0%, #5027eb 100%)',
            boxShadow: '0 3px 10px rgba(80, 39, 235, 0.28)'
          }}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 cursor-pointer hover:opacity-95 transition"
          title="বেনামী নাগরিক"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
            <UserIcon size={19} className="text-white" />
          </div>
        </div>

        {/* Large Rounded Light-Gray Text Box Area */}
        <button
          type="button"
          onClick={() => onOpenComposer('BRIBE')}
          style={{ border: 'none', background: '#f4f5f7' }}
          className="flex-1 hover:bg-slate-200/80 rounded-2xl px-5 py-3 sm:py-3.5 text-left text-xs sm:text-sm text-slate-500 hover:text-slate-800 transition cursor-pointer font-normal flex items-center justify-between"
        >
          <span>আপনার অভিযোগ বা অনিয়মের তথ্য লিখুন...</span>
        </button>
      </div>

      {/* Bottom Row: Photo / Video, File, Location Actions on Left + Unified Vibrant Purple Post Button on Right */}
      <div className="flex items-center justify-between gap-2 pt-2.5 pb-0.5 border-t border-slate-100/80">
        {/* Left Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-4 flex-wrap">
          {/* 1. Photo / Video */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{ border: 'none' }}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50 px-2 sm:px-2.5 py-1.5 rounded-lg transition cursor-pointer"
            title="ছবি বা ভিডিও প্রমাণ যুক্ত করুন"
          >
            <ImageIcon size={16} className="text-purple-600" />
            <span className="hidden xs:inline">Photo / Video</span>
          </button>

          {/* 2. File */}
          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            style={{ border: 'none' }}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50 px-2 sm:px-2.5 py-1.5 rounded-lg transition cursor-pointer"
            title="ডকুমেন্ট বা ফাইল যুক্ত করুন"
          >
            <FileTextIcon size={16} className="text-purple-600" />
            <span className="hidden xs:inline">File</span>
          </button>

          {/* 3. Location */}
          <button
            type="button"
            onClick={() => onOpenComposer('BRIBE')}
            style={{ border: 'none' }}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-purple-700 hover:bg-purple-50 px-2 sm:px-2.5 py-1.5 rounded-lg transition cursor-pointer"
            title="স্থান ও জেলা নির্ধারণ করুন"
          >
            <LocationPinIcon size={16} className="text-purple-600" />
            <span className="hidden xs:inline">Location</span>
          </button>
        </div>

        {/* Right Action: Clean Unified Vibrant Purple "Post" Button */}
        <button
          type="button"
          onClick={() => onOpenComposer('BRIBE')}
          style={{
            border: 'none',
            background: 'linear-gradient(135deg, #633ef8 0%, #5027eb 100%)',
            color: '#ffffff',
            boxShadow: '0 3px 10px rgba(80, 39, 235, 0.3)'
          }}
          className="px-5 sm:px-6 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition hover:opacity-95 active:scale-98 cursor-pointer shrink-0"
        >
          Post
        </button>
      </div>
    </div>
  );
}
