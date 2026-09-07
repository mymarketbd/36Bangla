'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Division } from '@/lib/types';
import { SearchIcon, CloseIcon } from './Icons';

interface HeaderProps {
  onOpenReport: () => void;
  onOpenWhitelist?: () => void;
  onResetHome?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  selectedDivision?: Division | 'ALL';
  onSelectDivision?: (div: Division | 'ALL') => void;
}

export default function Header({
  onOpenReport,
  onResetHome,
  searchQuery = '',
  onSearchChange,
  selectedDivision = 'ALL',
  onSelectDivision
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onResetHome) {
      onResetHome();
    }
    if (pathname === '/') {
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      router.push('/');
    }
  };

  return (
    <header
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* 1. Left: Brand Identity (36 Bangla Logo & Tagline) */}
        <div style={{ flexShrink: 0 }}>
          <Link
            href="/"
            onClick={handleLogoClick}
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', cursor: 'pointer', gap: '3px' }}
            title="36 Bangla — হোমপেজে যান"
          >
            <img
              src="/logo.png"
              alt="36 Bangla"
              style={{
                height: '32px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block'
              }}
            />
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#64748b', lineHeight: 1 }}>
              জনগণের কথা, স্বচ্ছ বাংলাদেশের জন্য
            </span>
          </Link>
        </div>

        {/* 2. Center: Search Bar with Division Filter */}
        {onSearchChange && (
          <div style={{ flex: 1, maxWidth: '580px', display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                backgroundColor: '#f1f5f9',
                borderRadius: '9999px',
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Search Icon */}
              <SearchIcon size={16} className="text-slate-400 shrink-0" />

              {/* Search Input */}
              <input
                type="text"
                placeholder="খুঁজুন: বিভাগ, জেলা, বিষয় বা কীওয়ার্ড..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13px',
                  color: '#0f172a'
                }}
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '2px' }}
                >
                  <CloseIcon size={14} />
                </button>
              )}

              {/* Vertical Divider */}
              <div style={{ height: '16px', width: '1px', backgroundColor: '#cbd5e1', margin: '0 4px', flexShrink: 0 }} />

              {/* Division Selector Dropdown */}
              {onSelectDivision && (
                <div style={{ position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                  <select
                    value={selectedDivision}
                    onChange={(e) => onSelectDivision(e.target.value as any)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#475569',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="ALL">সকল বিভাগ</option>
                    <option value="Dhaka">ঢাকা বিভাগ</option>
                    <option value="Chattogram">চট্টগ্রাম বিভাগ</option>
                    <option value="Rajshahi">রাজশাহী বিভাগ</option>
                    <option value="Khulna">খুলনা বিভাগ</option>
                    <option value="Sylhet">সিলেট বিভাগ</option>
                    <option value="Barishal">বরিশাল বিভাগ</option>
                    <option value="Rangpur">রংপুর বিভাগ</option>
                    <option value="Mymensingh">ময়মনসিংহ বিভাগ</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. Right: Notification Bell & + অভিযোগ করুন Button (No user account) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {/* Notification Bell */}
          <button
            type="button"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '9999px',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}
            title="বিজ্ঞপ্তি"
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {/* Red Dot Indicator */}
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '7px',
                height: '7px',
                borderRadius: '9999px',
                backgroundColor: '#ef4444',
                border: '1.5px solid #ffffff'
              }}
            />
          </button>

          {/* + অভিযোগ করুন (CTA Button) */}
          <button
            type="button"
            onClick={onOpenReport}
            className="btn-primary-purple"
            style={{
              backgroundColor: '#5b3cf5',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(91, 60, 245, 0.28)'
            }}
          >
            <span style={{ fontSize: '16px', fontWeight: 800, lineHeight: 1 }}>+</span>
            <span>অভিযোগ করুন</span>
          </button>
        </div>

      </div>
    </header>
  );
}
