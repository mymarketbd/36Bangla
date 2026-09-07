import { BribeReport, WhitelistOffice, FeatureRequestItem, DistrictSummary } from './types';

export const initialBribeReports: BribeReport[] = [
  {
    id: 'rep-du-1',
    category: 'UNIVERSITY',
    department: 'পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা',
    service: 'ঢাকা বিশ্ববিদ্যালয় (DU)',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'শাহবাগ',
    officeName: 'বিশ্ববিদ্যালয় দুর্নীতি প্রতিরোধ সেল',
    locationDetails: 'কার্জন হল ও আবাসিক হলসমূহ, ঢাকা বিশ্ববিদ্যালয়',
    amount: 5000,
    outcome: 'PAID',
    authorName: 'বিশ্ববিদ্যালয় দুর্নীতি প্রতিরোধ সেল',
    authorHandle: '@du_anticorruption',
    spotPhotoUrl: '/du_curzon_hall.jpg',
    images: ['/du_curzon_hall.jpg'],
    description: 'প্রভোস্ট অফিস থেকে বৈধ সিট পাওয়ার কোনো নিয়ম নেই। হলে একটি ফ্লোর নেড়ে থাকার জন্য এককালীন ৫,০০০ টাকা এবং প্রতি মাসে ১,০০০ টাকা অবৈধ সিট ভাড়া দিতে বাধ্য করা হচ্ছে...',
    evidenceFiles: [],
    confirmationsCount: 268,
    trueVotesCount: 268,
    falseVotesCount: 12,
    commentsCount: 1,
    sharesCount: 18,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-06T10:00:00Z'
  },
  // ==========================================
  // 1. 💰 ঘুষ লেজার (BRIBE POSTS)
  // ==========================================
  {
    id: 'rep-101',
    category: 'BRIBE',
    department: 'ভূমি অফিস ও রেজিস্ট্রি',
    service: 'নামজারি ও মিসকেস খারিজ',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'ধানমন্ডি',
    officeName: 'সহকারী কমিশনার (ভূমি) অফিস, ধানমন্ডি রাজস্ব সার্কেল',
    locationDetails: 'রোড নং ৮/এ, ধানমন্ডি, ঢাকা',
    amount: 35000,
    outcome: 'PAID',
    officerDesignation: 'সার্ভেয়ার ও অফিস সহকারী',
    officerName: 'আব্দুল কাদের (সার্ভেয়ার)',
    authorName: 'তানভীর আহমেদ',
    authorHandle: '@tanvir_dhk',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    accusedPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&h=675&auto=format&fit=crop&q=80', // 16:9 Widescreen
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=1200&h=675&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&auto=format&fit=crop&q=80'
    ],
    description: 'অনলাইনে নামজারি আবেদন করার পর সব কাগজপত্র সঠিক থাকা সত্ত্বেও ফাইল আটকে রাখা হয়। সার্ভেয়ার সরাসরি বলেন— "অফিস খরচ বাবদ ৩৫,০০০ টাকা না দিলে রিপোর্ট প্রতিকূলে যাবে"। জমি রেজিস্ট্রি নিশ্চিত করতে বাধ্য হয়ে টাকা দিতে হয়।',
    evidenceFiles: [
      {
        id: 'ev-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=675&auto=format&fit=crop&q=80',
        label: 'জমির নামজারি আবেদন রশিদ ও ট্র্যাকিং কপি'
      },
      {
        id: 'ev-1b',
        type: 'accused_photo',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
        label: 'ঘুষ দাবিদার সার্ভেয়ারের ছবি'
      }
    ],
    confirmationsCount: 184,
    trueVotesCount: 172,
    falseVotesCount: 12,
    commentsCount: 28,
    sharesCount: 45,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-06T08:30:00Z'
  },
  {
    id: 'rep-102',
    category: 'BRIBE',
    department: 'বিআরটিএ (BRTA)',
    service: 'পেশাদার ড্রাইভিং লাইসেন্স ইস্যু ও ফিঙ্গারপ্রিন্ট',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'মিরপুর',
    officeName: 'বিআরটিএ ঢাকা মেট্রো সার্কেল-১, মিরপুর ১৩',
    locationDetails: 'মিরপুর ১৩ নং সেকশন, বিআরটিএ প্রধান কমপ্লেক্স',
    amount: 8500,
    outcome: 'PAID',
    officerDesignation: 'মোটরযান পরিদর্শক (দালাল মারফত)',
    officerName: 'দালাল রফিক ও চক্র',
    authorName: 'রাকিবুল হাসান',
    authorHandle: '@rakib_mirpur',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    accusedPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=800&auto=format&fit=crop&q=80', // 3:4 Vertical Document
    images: [
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=800&auto=format&fit=crop&q=80'
    ],
    description: 'ড্রাইভিং প্র্যাকটিক্যাল টেস্টে পাস করা সত্ত্বেও দালালদের মাধ্যমে টাকা না দিলে ফিঙ্গারপ্রিন্টের ডেট ৬ মাস পিছিয়ে দেওয়ার হুমকি দেওয়া হয়। ৮,৫০০ টাকা দালাল সিন্ডিকেটকে দেওয়ার পর ৩ দিনের মাথায় বায়োমেট্রিক ও কার্ড প্রিন্ট হয়।',
    evidenceFiles: [
      {
        id: 'ev-2',
        type: 'document',
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=800&auto=format&fit=crop&q=80',
        label: 'বিআরটিএ লার্নার ও রেফারেন্স স্লিপ'
      }
    ],
    confirmationsCount: 220,
    trueVotesCount: 208,
    falseVotesCount: 12,
    commentsCount: 39,
    sharesCount: 67,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-06T06:15:00Z'
  },
  {
    id: 'rep-103',
    category: 'BRIBE',
    department: 'বিচার বিভাগ ও আদালত',
    service: 'নথি তলব ও জামিননামা দাখিল',
    division: 'Chattogram',
    district: 'চট্টগ্রাম',
    subDistrict: 'কোতোয়ালী',
    officeName: 'জেলা ও দায়রা জজ আদালত, চট্টগ্রাম',
    locationDetails: 'কোর্ট হিল, কোতোয়ালী, চট্টগ্রাম',
    amount: 15000,
    outcome: 'REFUSED',
    officerDesignation: 'বেঞ্চ সহকারী (পেশকার)',
    officerName: 'পেশকার শাহজাহান',
    authorName: 'আইনজীবী সহকারী ফোরাম',
    authorHandle: '@ctg_law_watch',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'আদালতের জামিন আদেশ পাওয়ার পর আদেশের অনুলিপি জেলখানায় পাঠানোর জন্য পেশকার সরাসরি ১৫,০০০ টাকা ঘুষ দাবি করেন। আমরা টাকা দিতে অস্বীকৃতি জানাই এবং জেলা জজ বরাবর লিখিত অভিযোগের প্রস্তুতি নিলে বাধ্য হয়ে আদেশের কপি ছাড়েন।',
    evidenceFiles: [
      {
        id: 'ev-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
        label: 'আদালতের সার্টিফাইড কপির আবেদন ও কোর্ট ফি রশিদ'
      }
    ],
    confirmationsCount: 145,
    trueVotesCount: 139,
    falseVotesCount: 6,
    commentsCount: 25,
    sharesCount: 51,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-05T11:40:00Z'
  },
  {
    id: 'rep-104',
    category: 'BRIBE',
    department: 'পাসপোর্ট ও ইমিগ্রেশন',
    service: 'ই-পাসপোর্ট ভেরিফিকেশন ও ডেলিভারি',
    division: 'Sylhet',
    district: 'সিলেট',
    subDistrict: 'সিলেট সদর',
    officeName: 'বিভাগীয় পাসপোর্ট ও ভিসা অফিস, সিলেট',
    locationDetails: 'আলমপুর, সিলেট',
    amount: 5000,
    outcome: 'PAID',
    officerDesignation: 'ডিএসবি পুলিশ ভেরিফায়ার ও কাউন্টার ক্লার্ক',
    authorName: 'প্রবাসী ফোরাম সিলেট',
    authorHandle: '@sylhet_probashi',
    authorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'পুলিশ ভেরিফিকেশনে কোনো সমস্যা না থাকলেও এসবি পুলিশ কর্মকর্তা বাড়ি এসে পাসপোর্ট রিপোর্টের জন্য ৫,০০০ টাকা মিষ্টি খাওয়ার নামে দাবি করেন। টাকা না দিলে রিপোর্ট ঝুলে থাকার আশঙ্কায় প্রদান করতে হয়।',
    evidenceFiles: [
      {
        id: 'ev-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&auto=format&fit=crop&q=80',
        label: 'পাসপোর্ট ডেলিভারি স্লিপ ও ট্র্যাকিং স্ট্যাটাস'
      }
    ],
    confirmationsCount: 165,
    trueVotesCount: 158,
    falseVotesCount: 7,
    commentsCount: 31,
    sharesCount: 42,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-04T16:20:00Z'
  },

  // ==========================================
  // 2. 🏥 হাসপাতাল ও স্বাস্থ্যসেবা (HOSPITAL POSTS)
  // ==========================================
  {
    id: 'rep-201',
    category: 'HOSPITAL',
    department: 'হাসপাতাল ও স্বাস্থ্যসেবা',
    service: 'জরুরি আইসিইউ (ICU) বেড বরাদ্দ ও ভর্তি',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'শাহবাগ',
    officeName: 'ঢাকা মেডিকেল কলেজ হাসপাতাল (DMCH)',
    locationDetails: 'জরুরি বিভাগ ও নতুন ভবন আইসিইউ ইউনিট, ঢাকা',
    hospitalSection: 'আইসিইউ ও জরুরি ইউনিট',
    hospitalIssueType: 'দালাল সিন্ডিকেট ও সিট বাণিজ্য',
    amount: 25000,
    outcome: 'PAID',
    officerDesignation: 'জরুরি বিভাগের ওয়ার্ডবয় ও দালাল সিন্ডিকেট',
    officerName: 'ওয়ার্ডবয় মনির ও দালাল চক্র',
    authorName: 'মুমূর্ষু রোগীর স্বজন',
    authorHandle: '@patient_voice_bd',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    accusedPhotoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=700&auto=format&fit=crop&q=80', // 1:1 Square
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=700&auto=format&fit=crop&q=80'
    ],
    description: 'মুমূর্ষু রোগীর জন্য জরুরি আইসিইউ বেড খালি থাকা সত্ত্বেও কাউন্টার থেকে বলা হয় সিট নেই। ৫ মিনিট পরই এক দালাল এসে বলে ২৫,০০০ টাকা দিলে ওয়ার্ডের লোকের সাথে কথা বলে এখনি আইসিইউ বেড ম্যানেজ করে দেবে। রোগীর জীবন বাঁচাতে বাধ্য হয়ে টাকা দিতে হয়েছে।',
    evidenceFiles: [
      {
        id: 'ev-h1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=700&auto=format&fit=crop&q=80',
        label: 'জরুরি ভর্তি স্লিপ ও প্রেসক্রিপশন কপি'
      }
    ],
    confirmationsCount: 295,
    trueVotesCount: 284,
    falseVotesCount: 11,
    commentsCount: 64,
    sharesCount: 120,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-06T09:10:00Z'
  },
  {
    id: 'rep-202',
    category: 'HOSPITAL',
    department: 'হাসপাতাল ও স্বাস্থ্যসেবা',
    service: 'রোগী স্থানান্তর ও জরুরি ট্রলি পরিবহন',
    division: 'Chattogram',
    district: 'চট্টগ্রাম',
    subDistrict: 'পাঁচলাইশ',
    officeName: 'চট্টগ্রাম মেডিকেল কলেজ হাসপাতাল (চমেক)',
    locationDetails: 'পাঁচলাইশ, চট্টগ্রাম',
    hospitalSection: 'জরুরি গেট ও অপারেশন থিয়েটার',
    hospitalIssueType: 'ট্রলি সিন্ডিকেটের চাঁদাবাজি ও জিম্মি করা',
    amount: 2000,
    outcome: 'REFUSED',
    officerDesignation: 'আউটসোর্সিং ট্রলিম্যান চক্র',
    authorName: 'চমেক নাগরিক ওয়াচ',
    authorHandle: '@cmch_civic',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'জরুরি বিভাগ থেকে ৪ তলার ওয়ার্ডে সড়ক দুর্ঘটনায় আহত রোগীকে ট্রলিতে নেওয়ার জন্য ২০০ টাকার জায়গায় ২,০০০ টাকা দাবি করে ট্রলি আটকে রাখে। আমরা রোগীর স্বজনরা সবাই মিলে তীব্র প্রতিবাদ করি এবং পরিচালকের রুমে যাওয়ার চেষ্টা করলে ভয় পেয়ে রোগীকে উপরে পৌঁছে দেয়।',
    evidenceFiles: [],
    confirmationsCount: 185,
    trueVotesCount: 177,
    falseVotesCount: 8,
    commentsCount: 42,
    sharesCount: 78,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-05T14:30:00Z'
  },

  // ==========================================
  // 3. 🛑 চাঁদাবাজি সিন্ডিকেট (EXTORTION POSTS)
  // ==========================================
  {
    id: 'rep-301',
    category: 'EXTORTION',
    department: 'পরিবহন ও সড়ক সিন্ডিকেট',
    service: 'আন্তঃজেলা বাস ছাড়ার দৈনিক চাঁদা আদায়',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'মিরপুর/দারুস সালাম',
    officeName: 'গাবতলী আন্তঃজেলা বাস টার্মিনাল',
    locationDetails: 'টার্মিনাল ১ নং ও ২ নং বহির্গমন গেট, গাবতলী, ঢাকা',
    extortionSpot: 'গাবতলী বাস টার্মিনাল গেট',
    syndicateType: 'পরিবহন লাইনম্যান ও স্থানীয় চাঁদাবাজ চক্র',
    amount: 1200,
    outcome: 'PAID',
    officerDesignation: 'টার্মিনাল লাইনম্যান ও ক্যাডার গ্রুপ',
    officerName: 'লাইনম্যান বাবুল ও সহযোগী দল',
    authorName: 'উত্তরবঙ্গ বাস চালক সমিতি',
    authorHandle: '@bus_driver_voice',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    accusedPhotoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80'
    ],
    description: 'প্রতিটি বাস টার্মিনাল থেকে ছাড়ার মুহূর্তে গেটে লাঠি হাতে দাঁড়িয়ে থাকা লাইনম্যান গ্রুপকে প্রতি ট্রিপে ১,২০০ টাকা অবৈধ চাঁদা দিতে হয়। টাকা না দিলে গাড়ির গ্লাস ভাঙচুর ও চালককে মারধরের হুমকি দেওয়া হয়। কোনো ভাউচার বা বৈধ রশিদ দেওয়া হয় না।',
    evidenceFiles: [
      {
        id: 'ev-e1',
        type: 'accused_photo',
        url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
        label: 'গেটে দাঁড়িয়ে চাঁদা আদায়কারীর ছবি'
      }
    ],
    confirmationsCount: 310,
    trueVotesCount: 298,
    falseVotesCount: 12,
    commentsCount: 58,
    sharesCount: 145,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-06T07:45:00Z'
  },
  {
    id: 'rep-302',
    category: 'EXTORTION',
    department: 'কাঁচাবাজার ও ফুটপাত দখল',
    service: 'পাইকারি আড়ত পণ্য খালাস ও দোকান বসানো',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'তেজগাঁও',
    officeName: 'কাওরান বাজার পাইকারি কাঁচাবাজার',
    locationDetails: 'রেললাইনের পার্শ্ববর্তী আড়ত এলাকা, কাওরান বাজার, ঢাকা',
    extortionSpot: 'কাওরান বাজার কাঁচা আড়ত',
    syndicateType: 'বাজার সিন্ডিকেট ও স্থানীয় মাস্তান চক্র',
    amount: 3000,
    outcome: 'PAID',
    officerDesignation: 'বাজার লাইনম্যান ও টোল আদায়কারী',
    authorName: 'সবজি ব্যবসায়ী একতা সমিতি',
    authorHandle: '@kawran_traders',
    authorAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'ট্রাক থেকে কাঁচামাল ও শাকসবজি নামানোর পর আড়তে তোলার আগেই স্থানীয় সিন্ডিকেট প্রতি ট্রাক ৩,০০০ টাকা বাধ্যতামূলক টোল দাবি করে। পুলিশ বা সিটি কর্পোরেশনের কোনো অনুমোদন নেই। টাকা না দিলে সবজি নামাতে বাধা দেওয়া হয়।',
    evidenceFiles: [],
    confirmationsCount: 245,
    trueVotesCount: 235,
    falseVotesCount: 10,
    commentsCount: 47,
    sharesCount: 92,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-05T20:10:00Z'
  },
  {
    id: 'rep-303',
    category: 'EXTORTION',
    department: 'কাঁচাবাজার ও ফুটপাত দখল',
    service: 'ফুটপাতে হকার বসানো ও দৈনিক লাইন চাঁদা',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'মিরপুর',
    officeName: 'মিরপুর ১০ গোলচত্বর ফুটপাত মার্কেট',
    locationDetails: 'মিরপুর ১০ মেট্রো স্টেশন সংলগ্ন ফুটপাত',
    extortionSpot: 'মিরপুর ১০ মোড়',
    syndicateType: 'ফুটপাত দখলবাজ ও ক্যাডার সিন্ডিকেট',
    amount: 300,
    outcome: 'PAID',
    officerDesignation: 'ফুটপাত লাইনম্যান',
    authorName: 'মিরপুর সচেতন নাগরিক মঞ্চ',
    authorHandle: '@mirpur_civic',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&auto=format&fit=crop&q=80'
    ],
    description: 'প্রতিটি ছোট হকারের কাছ থেকে প্রতিদিন ৩০০ টাকা করে লাইন চাঁদা তোলে মাস্তান চক্র। এর কারণে সাধারণ পথচারীদের হাঁটার জায়গা থাকে না এবং চরম যানজট তৈরি হয়। প্রতিদিন লাখ লাখ টাকার চাঁদাবাজি চলছে প্রকাশ্যে।',
    evidenceFiles: [],
    confirmationsCount: 198,
    trueVotesCount: 190,
    falseVotesCount: 8,
    commentsCount: 36,
    sharesCount: 71,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-05T09:00:00Z'
  },

  // ==========================================
  // 4. 🎓 বিশ্ববিদ্যালয় ও শিক্ষা দুর্নীতি (UNIVERSITY POSTS)
  // ==========================================
  {
    id: 'rep-401',
    category: 'UNIVERSITY',
    department: 'পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা',
    service: 'প্রভাষক পদে শিক্ষক নিয়োগ ও ভাইভা বাণিজ্য',
    division: 'Rajshahi',
    district: 'রাজশাহী',
    subDistrict: 'মতিহার',
    officeName: 'রাজশাহী বিশ্ববিদ্যালয় (RU)',
    locationDetails: 'প্রশাসন ভবন ও সমাজবিজ্ঞান অনুষদ, রাবি',
    amount: 1500000,
    outcome: 'REFUSED',
    officerDesignation: 'নিয়োগ বোর্ডের প্রভাবশালী সদস্য ও সিন্ডিকেট',
    officerName: 'নিয়োগ কমিটির সিন্ডিকেট চক্র',
    authorName: 'মেধাবী চাকরিপ্রার্থী গবেষক',
    authorHandle: '@ru_academic_watch',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=675&auto=format&fit=crop&q=80', // 16:9 University Campus
    images: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=675&auto=format&fit=crop&q=80'
    ],
    description: 'মেধাতালিকায় প্রথম স্থান ও ৪টি আন্তর্জাতিক জার্নাল পাবলিকেশন থাকা সত্ত্বেও ভাইভার আগের রাতে মধ্যস্থতাকারীর মাধ্যমে ১৫ লাখ টাকা ঘুষ দাবি করা হয়। টাকা না দিলে পদ অন্য অযোগ্য প্রার্থীকে দেওয়ার হুমকি দেওয়া হয়। আমি ঘুষ দিতে অস্বীকৃতি জানাই এবং ইউজিসি বরাবর লিখিত অভিযোগ দায়ের করি।',
    evidenceFiles: [
      {
        id: 'ev-u1',
        type: 'document',
        url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        label: 'নিয়োগ বিজ্ঞপ্তি ও ভাইভা অ্যাডমিট কার্ড'
      }
    ],
    confirmationsCount: 340,
    trueVotesCount: 325,
    falseVotesCount: 15,
    commentsCount: 72,
    sharesCount: 180,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-06T09:30:00Z'
  },
  {
    id: 'rep-402',
    category: 'UNIVERSITY',
    department: 'পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা',
    service: 'হল সিট বরাদ্দ ও গণরুম চাঁদাবাজি',
    division: 'Dhaka',
    district: 'ঢাকা',
    subDistrict: 'শাহবাগ / নীলক্ষেত',
    officeName: 'ঢাকা বিশ্ববিদ্যালয় (DU)',
    locationDetails: 'সলিমুল্লাহ মুসলিম হল ও শহীদ সার্জেন্ট জহুরুল হক হল',
    amount: 5000,
    outcome: 'PAID',
    officerDesignation: 'হল শাখা সাবেক ক্যাডার ও সিট দালাল গ্রুপ',
    officerName: 'হল সিট নিয়ন্ত্রণকারী গ্রুপ',
    authorName: '১ম বর্ষের সাধারণ শিক্ষার্থী',
    authorHandle: '@du_student_voice',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    spotPhotoUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=700&auto=format&fit=crop&q=80', // 1:1 Square
    images: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&h=700&auto=format&fit=crop&q=80'
    ],
    description: 'প্রভোস্ট অফিস থেকে বৈধ সিট পাওয়ার কোনো নিয়ম নেই। হলে একটি ফ্লোর বেডে থাকার জন্য এককালীন ৫,০০০ টাকা এবং প্রতি মাসে ১,০০০ টাকা অবৈধ সিট চাঁদা দিতে বাধ্য করা হয়। টাকা না দিলে গভীর রাতে রুম থেকে বের করে দেওয়া হয়।',
    evidenceFiles: [],
    confirmationsCount: 280,
    trueVotesCount: 268,
    falseVotesCount: 12,
    commentsCount: 54,
    sharesCount: 110,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-05T18:00:00Z'
  }
];

export const initialWhitelistOffices: WhitelistOffice[] = [
  {
    id: 'wl-1',
    department: 'পাসপোর্ট ও ইমিগ্রেশন',
    officeName: 'বিভাগীয় পাসপোর্ট ও ভিসা অফিস, মনসুরাবাদ, চট্টগ্রাম',
    division: 'Chattogram',
    district: 'চট্টগ্রাম',
    servicePraised: 'ই-পাসপোর্ট রি-ইস্যু ও বায়োমেট্রিক গ্রহণ',
    officerName: 'আব্দুল হালিম',
    officerDesignation: 'সহকারী পরিচালক',
    officerPhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    positiveReview: 'কোনো প্রকার দালাল বা অতিরিক্ত টাকা ছাড়া নির্ধারিত সরকারি ফিতেই মাত্র ৩ দিনে পাসপোর্ট হাতে পেয়েছি। কর্মকর্তা অত্যন্ত বিনয়ী ও সেবামূলক আচরণ করেছেন।',
    rating: 5,
    upvotesCount: 342,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-05T12:00:00Z'
  },
  {
    id: 'wl-2',
    department: 'ভূমি অফিস ও রেজিস্ট্রি',
    officeName: 'উপজেলা ভূমি অফিস, শ্রীমঙ্গল, মৌলভীবাজার',
    division: 'Sylhet',
    district: 'মৌলভীবাজার',
    servicePraised: 'ই-নামজারি ও ডিসিআর প্রদান',
    officerName: 'এসিল্যান্ড মহোদয় ও টিম',
    officerDesignation: 'সহকারী কমিশনার (ভূমি)',
    officerPhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    positiveReview: 'অনলাইনে আবেদন করার পর মাত্র ৭ দিনের মধ্যে কোনো ঘুষ বা টেবিল মানি ছাড়াই খতিয়ান ও নামজারি সম্পন্ন হয়েছে। শ্রীমঙ্গল ভূমি অফিসের এই সেবায় আমরা মুগ্ধ।',
    rating: 5,
    upvotesCount: 289,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-04T10:30:00Z'
  },
  {
    id: 'wl-3',
    department: 'পুলিশ ও ট্রাফিক',
    officeName: 'তেজগাঁও ট্রাফিক বিভাগ, ডিএমপি',
    division: 'Dhaka',
    district: 'ঢাকা',
    servicePraised: 'অনলাইন ট্রাফিক ফাইন নিষ্পত্তি ও সহায়তা',
    officerName: 'সোহেল রানা',
    officerDesignation: 'ট্রাফিক সার্জেন্ট',
    officerPhotoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    positiveReview: 'জরুরি অ্যাম্বুলেন্সকে জ্যাম মুক্ত করে দ্রুত রাস্তা ক্লিয়ার করে দেন এবং নিয়ম মেনে কোনো প্রকার অনৈতিক সুবিধা ছাড়াই ট্রাফিক পরিচালনা করেন। সততা এখনো বেঁচে আছে।',
    rating: 5,
    upvotesCount: 195,
    isVerified: true,
    moderationStatus: 'APPROVED',
    createdAt: '2026-09-03T15:20:00Z'
  }
];

export const initialFeatureRequests: FeatureRequestItem[] = [
  {
    id: 'feat-1',
    title: 'অডিও ক্লিপ সরাসরি আপলোড ও ভয়েস রেকর্ডার ইন্টিগ্রেশন',
    body: 'অনেক সময় সরকারি কর্মকর্তা বা দালাল সরাসরি ঘুষ চেয়ে কথা বলে। ভুক্তভোগী যাতে তাৎক্ষণিকভাবে অডিও রেকর্ড করে এখানে আপলোড করতে পারে সেই অপশন দেওয়া হোক।',
    category: 'Features',
    status: 'PROGRESS',
    votesCount: 388,
    commentsCount: 42,
    authorName: 'সচেতন প্রকৌশলী',
    createdAt: '2026-09-05T14:00:00Z'
  },
  {
    id: 'feat-2',
    title: 'দুদক (ACC) হটলাইন ১০৬ এ সরাসরি ওয়ান-ক্লিক রিপোর্ট ফরোয়ার্ডিং',
    body: 'ভেরিফাইড ও শীর্ষ সাক্ষ্যপ্রাপ্ত পোস্টগুলো নাগরিকের সম্মতিক্রমে সরাসরি দুর্নীতি দমন কমিশনের ডিজিটাল সেলে পাঠানোর একটি বাটন যুক্ত করা হোক।',
    category: 'Features',
    status: 'PLANNED',
    votesCount: 295,
    commentsCount: 31,
    authorName: 'আইনজীবী শিক্ষার্থী ফোরাম',
    createdAt: '2026-09-04T18:30:00Z'
  },
  {
    id: 'feat-3',
    title: 'জেলা ভিত্তিক করাপশন র‍্যাংকিং ও মাসিক তুলনামূলক রিপোর্ট',
    body: 'প্রতি মাসের শেষে কোন জেলা সবচেয়ে দুর্নীতিমুক্ত এবং কোন জেলায় সবচেয়ে বেশি ঘুষ দাবি হয়েছে তার একটি স্বয়ংক্রিয় চার্ট ও র‍্যাংকিং তৈরি করা হোক।',
    category: 'Improvements',
    status: 'REVIEW',
    votesCount: 215,
    commentsCount: 19,
    authorName: 'ডেটা জার্নালিস্ট বিডি',
    createdAt: '2026-09-03T09:15:00Z'
  }
];

export const bangladeshDistricts: DistrictSummary[] = [
  { name: 'Dhaka', bnName: 'ঢাকা', division: 'Dhaka', totalReports: 420, totalAmount: 42500000, topDepartment: 'ভূমি অফিস ও বিআরটিএ', avgBribe: 18500 },
  { name: 'Chattogram', bnName: 'চট্টগ্রাম', division: 'Chattogram', totalReports: 280, totalAmount: 31200000, topDepartment: 'কাস্টমস ও বন্দর', avgBribe: 26000 },
  { name: 'Sylhet', bnName: 'সিলেট', division: 'Sylhet', totalReports: 140, totalAmount: 11500000, topDepartment: 'পাসপোর্ট ও পুলিশ', avgBribe: 8500 },
  { name: 'Rajshahi', bnName: 'রাজশাহী', division: 'Rajshahi', totalReports: 110, totalAmount: 7800000, topDepartment: 'ভূমি ও কৃষি ঋণ', avgBribe: 7200 },
  { name: 'Khulna', bnName: 'খুলনা', division: 'Khulna', totalReports: 95, totalAmount: 6500000, topDepartment: 'বিদ্যুৎ ও পৌরসভা', avgBribe: 6800 },
  { name: 'Barishal', bnName: 'বরিশাল', division: 'Barishal', totalReports: 75, totalAmount: 4800000, topDepartment: 'হাসপাতাল ও খাদ্য', avgBribe: 6400 },
  { name: 'Rangpur', bnName: 'রংপুর', division: 'Rangpur', totalReports: 85, totalAmount: 5200000, topDepartment: 'শিক্ষা ও ভূমি', avgBribe: 6100 },
  { name: 'Mymensingh', bnName: 'ময়মনসিংহ', division: 'Mymensingh', totalReports: 90, totalAmount: 5900000, topDepartment: 'হাসপাতাল ও রেজিস্ট্রি', avgBribe: 6500 }
];
