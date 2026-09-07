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
    <div className="w-full py-2.5 overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-max px-2">
        {categoryOptions.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer select-none ${
                isActive
                  ? 'bg-[#4F46E5] text-white shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 bg-transparent'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
