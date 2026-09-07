'use client';

import React from 'react';
import { IncidentCategory } from '@/lib/types';

interface StoryItem {
  id: string;
  title: string;
  category: IncidentCategory | 'ALL' | 'WHITELIST';
  image: string;
  userAvatar: string;
  userName: string;
  timeAgo: string;
  isAddStory?: boolean;
}

interface StoryCarouselProps {
  activeCategory: IncidentCategory | 'ALL';
  onSelectCategory: (cat: IncidentCategory | 'ALL') => void;
  onOpenComposer: (cat?: IncidentCategory) => void;
}

export default function StoryCarousel({
  activeCategory,
  onSelectCategory,
  onOpenComposer
}: StoryCarouselProps) {
  const stories: StoryItem[] = [
    {
      id: 'story-add',
      title: 'Your Story',
      category: 'ALL',
      image: '',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      userName: 'Your Story',
      timeAgo: 'Just now',
      isAddStory: true
    },
    {
      id: 'story-1',
      title: 'ভূমি ও বিআরটিএ',
      category: 'BRIBE',
      image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&auto=format&fit=crop&q=80',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      userName: 'Davis Bergson',
      timeAgo: 'Just now'
    },
    {
      id: 'story-2',
      title: 'হাসপাতাল সেবা',
      category: 'HOSPITAL',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80',
      userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      userName: 'Mira Schleifer',
      timeAgo: '10:00 am'
    },
    {
      id: 'story-3',
      title: 'টার্মিনাল চাঁদাবাজি',
      category: 'EXTORTION',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=80',
      userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      userName: 'Randy Lubin',
      timeAgo: 'Yesterday'
    },
    {
      id: 'story-4',
      title: 'সৎ কর্মকর্তা',
      category: 'WHITELIST',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      userName: 'Carla Kenter',
      timeAgo: 'Yesterday'
    },
    {
      id: 'story-5',
      title: 'পাসপোর্ট অফিস',
      category: 'BRIBE',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=80',
      userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      userName: 'James Franci',
      timeAgo: '11:00pm'
    }
  ];

  return (
    <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-none w-full">
      {stories.map((story) => {
        if (story.isAddStory) {
          return (
            <div
              key={story.id}
              onClick={() => onOpenComposer('BRIBE')}
              style={{
                width: '88px',
                minWidth: '88px',
                maxWidth: '88px',
                height: '136px',
                minHeight: '136px',
                maxHeight: '136px',
                background: 'linear-gradient(145deg, #a3e635 0%, #3b82f6 50%, #6366f1 100%)'
              }}
              className="relative shrink-0 rounded-2xl overflow-hidden shadow-xs hover:scale-102 transition duration-200 cursor-pointer flex flex-col justify-between p-2 text-center border border-white/40"
            >
              <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white text-xl font-light shadow-sm">
                  +
                </div>
              </div>

              {/* Bottom Avatar & Label */}
              <div className="flex flex-col items-center gap-0.5 z-10">
                <div
                  style={{ width: 20, height: 20, minWidth: 20, minHeight: 20 }}
                  className="rounded-full overflow-hidden border border-white bg-white shrink-0"
                >
                  <img
                    src={story.userAvatar}
                    alt="User"
                    width={20}
                    height={20}
                    style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                    className="rounded-full"
                  />
                </div>
                <span className="text-[9px] font-bold text-white drop-shadow-sm leading-none">
                  Your Story
                </span>
              </div>
            </div>
          );
        }

        const isSelected = activeCategory === story.category;

        return (
          <div
            key={story.id}
            onClick={() => {
              if (story.category === 'WHITELIST') {
                window.location.href = '/whitelist';
              } else {
                onSelectCategory(story.category as any);
              }
            }}
            style={{
              width: '88px',
              minWidth: '88px',
              maxWidth: '88px',
              height: '136px',
              minHeight: '136px',
              maxHeight: '136px'
            }}
            className={`relative shrink-0 rounded-2xl overflow-hidden shadow-xs hover:scale-102 transition duration-200 cursor-pointer flex flex-col justify-between p-2 text-center border ${
              isSelected ? 'ring-2 ring-blue-600 border-blue-600' : 'border-slate-200/80'
            }`}
          >
            {/* Image */}
            <img
              src={story.image}
              alt={story.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom Avatar & User Name */}
            <div className="relative z-10 flex flex-col items-center gap-0.5">
              <div
                style={{ width: 20, height: 20, minWidth: 20, minHeight: 20 }}
                className="rounded-full overflow-hidden border border-white shrink-0"
              >
                <img
                  src={story.userAvatar}
                  alt={story.userName}
                  width={20}
                  height={20}
                  style={{ width: '20px', height: '20px', objectFit: 'cover' }}
                  className="rounded-full"
                />
              </div>
              <span className="text-[9px] font-bold text-white drop-shadow-md leading-none truncate max-w-full px-0.5">
                {story.userName}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
