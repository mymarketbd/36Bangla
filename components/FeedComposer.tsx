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
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '18px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%'
      }}
    >
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageFileChange}
        style={{ display: 'none' }}
      />
      <input
        type="file"
        ref={docInputRef}
        accept=".pdf,.doc,.docx,.jpg,.png"
        onChange={handleImageFileChange}
        style={{ display: 'none' }}
      />

      {/* 1. Header: Icon + Title & Subtitle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: '#eef2ff',
            color: '#5b3cf5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
            আপনি কি অনিয়ম বা দুর্নীতির শিকার হয়েছেন?
          </h3>
          <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px', fontWeight: 400 }}>
            আপনার অভিযোগ বা অনিয়মের তথ্য দিন, ছবি/ডকুমেন্ট সংযুক্ত করুন।
          </p>
        </div>
      </div>

      {/* 2. Text Input Area */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '12px 14px'
        }}
      >
        <textarea
          rows={2}
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="আপনার অভিযোগ লিখুন..."
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            fontSize: '13px',
            color: '#0f172a',
            lineHeight: 1.5
          }}
        />
      </div>

      {/* 3. Bottom Action Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', paddingTop: '2px' }}>
        {/* Left Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* ছবি */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <ImageIcon size={14} className="text-slate-500" />
            <span>ছবি</span>
          </button>

          {/* ডকুমেন্ট */}
          <button
            type="button"
            onClick={() => docInputRef.current?.click()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <FileTextIcon size={14} className="text-slate-500" />
            <span>ডকুমেন্ট</span>
          </button>

          {/* লোকেশন */}
          <button
            type="button"
            onClick={() => onOpenComposer('BRIBE')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <LocationPinIcon size={14} className="text-slate-500" />
            <span>লোকেশন</span>
          </button>
        </div>

        {/* Right Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="btn-primary-purple"
          style={{
            backgroundColor: '#5b3cf5',
            color: '#ffffff',
            padding: '8px 18px',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(91, 60, 245, 0.28)',
            flexShrink: 0
          }}
        >
          <svg style={{ width: '15px', height: '15px', transform: 'rotate(45deg)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>অভিযোগ পোস্ট করুন</span>
        </button>
      </div>
    </div>
  );
}
