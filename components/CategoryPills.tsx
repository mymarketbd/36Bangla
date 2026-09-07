'use client';

import React from 'react';
import { IncidentCategory } from '@/lib/types';

interface CategoryPillsProps {
  activeCategory: IncidentCategory | 'ALL' | string;
  onSelectCategory: (cat: IncidentCategory | 'ALL' | string) => void;
}

export const categoryOptions: Array<{ id: IncidentCategory | 'ALL' | string; label: string }> = [
  { id: 'ALL', label: 'সব' },
  { id: 'BRIBE', label: 'ঘুষের দাবি' },
  { id: 'HOSPITAL', label: 'হাসপাতাল' },
  { id: 'EXTORTION', label: 'চাঁদাবাজি' },
  { id: 'UNIVERSITY', label: 'বিশ্ববিদ্যালয়' },
  { id: 'LAND', label: 'ভূমি অফিস' },
  { id: 'OTHER', label: 'অন্যান্য' }
];

export default function CategoryPills({
  activeCategory = 'ALL',
  onSelectCategory
}: CategoryPillsProps) {
  return (
    <div
      style={{
        width: '100%',
        padding: '10px 0',
        overflowX: 'auto',
        display: 'flex',
        justifyContent: 'center'
      }}
      className="no-scrollbar"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 'max-content', padding: '0 8px' }}>
        {categoryOptions.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: '6px 18px',
                borderRadius: '9999px',
                fontSize: '13px',
                fontWeight: isActive ? 700 : 500,
                backgroundColor: isActive ? '#5b3cf5' : '#ffffff',
                color: isActive ? '#ffffff' : '#475569',
                border: isActive ? '1px solid #5b3cf5' : '1px solid #e2e8f0',
                boxShadow: isActive ? '0 2px 8px rgba(91, 60, 245, 0.28)' : '0 1px 2px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
