import { BribeReport, WhitelistOffice, FeatureRequestItem, CommunityComment } from './types';
import { initialBribeReports, initialWhitelistOffices, initialFeatureRequests } from './sample-data';

export interface Bangla36State {
  reports: BribeReport[];
  whitelist: WhitelistOffice[];
  features: FeatureRequestItem[];
  comments: CommunityComment[];
  userVotes: string[]; // item IDs voted by user
  userConfirmations: string[]; // report IDs confirmed by user
  userTruthVotes: { [reportId: string]: 'TRUE' | 'FALSE' }; // সত্য vs মিথ্যা voting tracking
}

const STORAGE_KEY = 'bangla36_platform_state_v1';

export function getInitialState(): Bangla36State {
  return {
    reports: initialBribeReports,
    whitelist: initialWhitelistOffices,
    features: initialFeatureRequests,
    comments: [
      {
        id: 'c-1',
        reportId: 'rep-101',
        authorAlias: 'ভুক্তভোগী নাগরিক',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        comment: 'ধানমন্ডি সার্কেলের সার্ভেয়ার ফাইল আটকে রেখে সরাসরি এই টাকাই দাবি করে। আমি নিজেও এই ঘটনার প্রত্যক্ষ শিকার। দ্রুত অডিট করা হোক।',
        createdAt: '2026-09-06T09:00:00Z'
      },
      {
        id: 'c-2',
        reportId: 'rep-102',
        authorAlias: 'মিরপুরের বাসিন্দা',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        comment: 'মিরপুর বিআরটিএ-তে দালাল ছাড়া সরাসরি কাউন্টারে গেলে পরীক্ষা পাস করার পরও ৬ মাস ঘুরতে হয়। এটি ১০০% সত্য ঘটনা।',
        createdAt: '2026-09-06T07:30:00Z'
      },
      {
        id: 'c-3',
        reportId: 'rep-201',
        authorAlias: 'ডাক্তারের আত্মীয়',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        comment: 'ঢামেক জরুরি বিভাগে দালাল ছাড়া সাধারণ মুমূর্ষু রোগীরা সহজে আইসিইউ পায় না, এটি শতভাগ সত্যি। অবিলম্বে টাস্কফোর্স বসানো দরকার।',
        createdAt: '2026-09-06T09:40:00Z'
      },
      {
        id: 'c-4',
        reportId: 'rep-301',
        authorAlias: 'বাস চালক সমিতির সদস্য',
        authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        comment: 'গাবতলী টার্মিনালে এই অবৈধ চাঁদাবাজির কারণে বাস মালিক ও চালকরা অতিষ্ঠ। প্রতিদিন কোটি টাকার চাঁদাবাজি চলছে।',
        createdAt: '2026-09-06T08:15:00Z'
      }
    ],
    userVotes: [],
    userConfirmations: [],
    userTruthVotes: {}
  };
}

export function loadStore(): Bangla36State {
  if (typeof window === 'undefined') {
    return getInitialState();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.reports || parsed.reports.length < initialBribeReports.length) {
      const initial = getInitialState();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load store:', err);
    return getInitialState();
  }
}

export function saveStore(state: Bangla36State): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save store:', err);
  }
}
