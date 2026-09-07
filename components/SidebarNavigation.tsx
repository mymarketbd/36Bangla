'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarNavigationProps {
  onSelectTopic?: (topic: string) => void;
}

export default function SidebarNavigation({ onSelectTopic }: SidebarNavigationProps) {
  const pathname = usePathname() || '/';
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  const navLinks = [
    {
      name: 'প্রধান ফিড',
      href: '/',
      isActive: pathname === '/',
      icon: (
        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      name: 'জেলা মানচিত্র',
      href: '/map',
      isActive: pathname === '/map',
      icon: (
        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      name: 'দপ্তর হল অব ফেম',
      href: '/whitelist',
      isActive: pathname === '/whitelist',
      icon: (
        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      name: 'ডেটা ও পরিসংখ্যান',
      href: '/analytics',
      isActive: pathname === '/analytics',
      icon: (
        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      name: 'ফিচার ও উন্নয়ন পরামর্শ',
      href: '/feedback',
      isActive: pathname === '/feedback',
      icon: (
        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    }
  ];

  const trendingTopics = [
    { id: 1, name: 'ভূমি অফিস নামজারি', count: '২.২k রিপোর্ট', bg: '#eff6ff', color: '#2563eb' },
    { id: 2, name: 'সরকারি হাসপাতাল', count: '১.৮k রিপোর্ট', bg: '#fff7ed', color: '#ea580c' },
    { id: 3, name: 'টেন্ডার ও পরিষেবা', count: '১.৪k রিপোর্ট', bg: '#eef2ff', color: '#4f46e5' },
    { id: 4, name: 'বিশ্ববিদ্যালয় অনিয়ম', count: '১.০k রিপোর্ট', bg: '#f1f5f9', color: '#64748b' },
    { id: 5, name: 'নিয়োগ বাণিজ্য', count: '৯৩২ রিপোর্ট', bg: '#f1f5f9', color: '#64748b' }
  ];

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* 1. Main Navigation Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '8px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navLinks.map((link) => {
            const isActive = link.isActive;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: 'none',
                  backgroundColor: isActive ? '#eef2ff' : 'transparent',
                  color: isActive ? '#5b3cf5' : '#475569',
                  borderLeft: isActive ? '4px solid #5b3cf5' : '4px solid transparent',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ color: isActive ? '#5b3cf5' : '#64748b', display: 'flex', alignItems: 'center' }}>
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* FAQ Item */}
          <button
            type="button"
            onClick={() => setIsFaqOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 14px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: 500,
              backgroundColor: 'transparent',
              color: '#475569',
              border: 'none',
              borderLeft: '4px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              width: '100%',
              transition: 'all 0.15s ease'
            }}
          >
            <span style={{ color: '#64748b', display: 'flex', alignItems: 'center' }}>
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
          </button>
        </nav>
      </div>

      {/* 2. Trending Topics Card */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>
            ট্রেন্ডিং বিষয়
          </h3>
          <Link
            href="/analytics"
            style={{ fontSize: '12px', fontWeight: 600, color: '#5b3cf5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}
          >
            <span>সব দেখুন</span>
            <span>→</span>
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {trendingTopics.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectTopic && onSelectTopic(item.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '9999px',
                    backgroundColor: item.bg,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700
                  }}
                >
                  {item.id}
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                  {item.name}
                </span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 500, color: '#94a3b8' }}>
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Modal */}
      {isFaqOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(2px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              maxWidth: '480px',
              width: '100%',
              padding: '24px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>❓</span>
                <span>সচরাচর জিজ্ঞাসা (FAQ)</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsFaqOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '16px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', color: '#475569' }}>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontWeight: 700, color: '#0f172a' }}>১. এখানে অভিযোগ করলে আমার পরিচয় কি গোপন থাকবে?</p>
                <p>হ্যাঁ, সম্পূর্ণ বেনামী। কোনো ফোন নম্বর, ইমেইল বা পরিচয় প্রকাশ করা হয় না।</p>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontWeight: 700, color: '#0f172a' }}>২. ছবি বা ভিডিও প্রমাণ দেওয়া কি বাধ্যতামূলক?</p>
                <p>প্রমাণ দিলে পোস্টটি দ্রুত ভেরিফাইড ব্যাজ পায় এবং দুদকের নজরে আসে।</p>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <p style={{ fontWeight: 700, color: '#0f172a' }}>৩. সত্য/মিথ্যা ভোটিং কীভাবে কাজ করে?</p>
                <p>অন্যান্য নাগরিকরা ঘটনার সত্যতা নিশ্চিত করতে সত্য বা মিথ্যা ভোট দিতে পারেন।</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsFaqOpen(false)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '12px',
                backgroundColor: '#5b3cf5',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              ঠিক আছে
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
