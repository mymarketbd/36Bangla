'use client';

import React from 'react';
import Link from 'next/link';

export default function TrendingSidebar() {
  const hotlines = [
    {
      name: 'দুদক',
      desc: 'দুর্নীতি ও অভিযোগ',
      phone: '106',
      iconBg: '#eff6ff',
      iconColor: '#3b82f6',
      icon: (
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: 'জাতীয় জরুরি সেবা',
      desc: 'পুলিশ, অ্যাম্বুলেন্স ও ফায়ার সার্ভিস',
      phone: '999',
      iconBg: '#fef2f2',
      iconColor: '#ef4444',
      icon: (
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      name: 'স্বাস্থ্য বাতায়ন',
      desc: 'হাসপাতাল সেবা ও তথ্য',
      phone: '16263',
      iconBg: '#ecfdf5',
      iconColor: '#10b981',
      icon: (
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
      {/* 1. স্বচ্ছতা লেজার (সারাংশ) - Transparency Ledger Summary Card */}
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
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            স্বচ্ছতা লেজার (সারাংশ)
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
          {/* Stat 1: মোট অভিযোগ */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #f1f5f9',
              padding: '10px 12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#eef2ff',
                  color: '#5b3cf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 500, color: '#64748b', margin: 0 }}>মোট অভিযোগ</p>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0, marginTop: '2px' }}>১২,৮৪০</p>
              </div>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ecfdf5',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid #d1fae5'
              }}
            >
              ↑ ১২%
            </span>
          </div>

          {/* Stat 2: দাবিকৃত অর্থ */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #f1f5f9',
              padding: '10px 12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 800,
                  flexShrink: 0
                }}
              >
                ৳
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 500, color: '#64748b', margin: 0 }}>দাবিকৃত অর্থ</p>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0, marginTop: '2px' }}>৳ ১৮.৬০ লাখ</p>
              </div>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ecfdf5',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid #d1fae5'
              }}
            >
              ↑ ৮%
            </span>
          </div>

          {/* Stat 3: সমাধান হয়েছে */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #f1f5f9',
              padding: '10px 12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#fff7ed',
                  color: '#ea580c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 500, color: '#64748b', margin: 0 }}>সমাধান হয়েছে</p>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0, marginTop: '2px' }}>২,৯৪০</p>
              </div>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#059669',
                backgroundColor: '#ecfdf5',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid #d1fae5'
              }}
            >
              ↑ ২৪%
            </span>
          </div>

          {/* Stat 4: চলমান রয়েছে */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #f1f5f9',
              padding: '10px 12px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: '#fff1f2',
                  color: '#e11d48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 500, color: '#64748b', margin: 0 }}>চলমান রয়েছে</p>
                <p style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0, marginTop: '2px' }}>৮,৬৩০</p>
              </div>
            </div>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#e11d48',
                backgroundColor: '#fff1f2',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid #fecdd3'
              }}
            >
              ↓ ৫%
            </span>
          </div>
        </div>
      </div>

      {/* 2. জরুরি সরকারি হটলাইন - Emergency Government Hotlines Card */}
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
          <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            জরুরি সরকারি হটলাইন
          </h3>
          <Link
            href="/press"
            style={{ fontSize: '12px', fontWeight: 600, color: '#5b3cf5', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px' }}
          >
            <span>সব দেখুন</span>
            <span>→</span>
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {hotlines.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                borderRadius: '10px',
                transition: 'background 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    backgroundColor: item.iconBg,
                    color: item.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0, lineHeight: 1.2 }}>
                    {item.name}
                  </h4>
                  <p style={{ fontSize: '11px', color: '#64748b', margin: 0, marginTop: '2px' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
              <a
                href={`tel:${item.phone}`}
                className="hotline-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  border: '1px solid #a7f3d0',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  fontSize: '12px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  flexShrink: 0
                }}
              >
                <span>📞</span>
                <span>{item.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Inspirational Citizen Banner / Quote Card */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid #e0e7ff',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '24px', color: '#5b3cf5', lineHeight: 1, fontFamily: 'serif' }}>❝</span>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', lineHeight: 1.4, margin: 0 }}>
            সচেতন নাগরিকই<br />
            গড়ে তোলে স্বচ্ছ বাংলাদেশ
          </p>
        </div>

        {/* Faint '36' Watermark graphic */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 900,
            color: 'rgba(91, 60, 245, 0.22)',
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-2px',
            lineHeight: 1
          }}
        >
          36
        </div>
      </div>
    </aside>
  );
}
