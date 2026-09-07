export type Division = 
  | 'Dhaka'
  | 'Chattogram'
  | 'Rajshahi'
  | 'Khulna'
  | 'Barishal'
  | 'Sylhet'
  | 'Rangpur'
  | 'Mymensingh';

export type IncidentCategory = 'BRIBE' | 'HOSPITAL' | 'EXTORTION' | 'UNIVERSITY';

export type DepartmentCategory =
  | 'ভূমি অফিস ও রেজিস্ট্রি'
  | 'বিআরটিএ (BRTA)'
  | 'পাসপোর্ট ও ইমিগ্রেশন'
  | 'বিচার বিভাগ ও আদালত'
  | 'পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা'
  | 'নির্বাচন কমিশন ও এনআইডি'
  | 'পুলিশ ও ট্রাফিক'
  | 'কাস্টমস ও ভ্যাট'
  | 'হাসপাতাল ও স্বাস্থ্যসেবা'
  | 'পৌরসভা ও সিটি কর্পোরেশন'
  | 'বিদ্যুৎ, গ্যাস ও তিতাস'
  | 'পরিবহন ও সড়ক সিন্ডিকেট'
  | 'কাঁচাবাজার ও ফুটপাত দখল'
  | 'অন্যান্য সরকারি দপ্তর ও খাত';

export type ReportOutcome = 'PAID' | 'REFUSED' | 'PENDING';

export interface EvidenceAttachment {
  id: string;
  type: 'image' | 'audio' | 'document' | 'video' | 'accused_photo';
  url: string;
  label: string;
  fileSize?: string;
}

export interface BribeReport {
  id: string;
  category: IncidentCategory; // 'BRIBE' | 'HOSPITAL' | 'EXTORTION'
  department: DepartmentCategory;
  service: string;
  division: Division;
  district: string;
  subDistrict?: string;
  officeName: string;
  locationDetails?: string;
  amount: number;
  outcome: ReportOutcome;
  officerDesignation?: string;
  officerName?: string;
  authorName?: string;
  authorHandle?: string;
  authorAvatar?: string;
  accusedPhotoUrl?: string; // Photo of the accused person
  spotPhotoUrl?: string; // Photo of the spot or office
  videoUrl?: string; // Video proof
  images?: string[]; // Multiple photos for Facebook/X feed grid
  description: string;
  evidenceFiles: EvidenceAttachment[];
  confirmationsCount: number;
  trueVotesCount: number; // সত্য ভোট
  falseVotesCount: number; // মিথ্যা ভোট
  commentsCount: number;
  sharesCount: number;
  isVerified: boolean;
  moderationStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;

  // Specific to Hospital
  hospitalSection?: string;
  hospitalIssueType?: string;

  // Specific to Extortion / Syndicate
  extortionSpot?: string;
  syndicateType?: string;

  // Specific to University Corruption
  universityName?: string;
  universityDeptHall?: string;
  universityIssueType?: string;
}

export interface WhitelistOffice {
  id: string;
  department: DepartmentCategory;
  officeName: string;
  division: Division;
  district: string;
  servicePraised: string;
  officerName?: string;
  officerDesignation?: string;
  officerPhotoUrl?: string;
  positiveReview: string;
  rating: number;
  upvotesCount: number;
  isVerified: boolean;
  moderationStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

export interface FeatureRequestItem {
  id: string;
  title: string;
  body: string;
  category: 'Features' | 'Bugs' | 'Improvements';
  status: 'PLANNED' | 'PROGRESS' | 'COMPLETED' | 'REVIEW' | 'PENDING';
  votesCount: number;
  commentsCount: number;
  authorName: string;
  createdAt: string;
}

export interface CommunityComment {
  id: string;
  reportId: string;
  authorAlias: string;
  authorAvatar?: string;
  comment: string;
  createdAt: string;
}

export interface DistrictSummary {
  name: string;
  bnName: string;
  division: Division;
  totalReports: number;
  totalAmount: number;
  topDepartment: string;
  avgBribe: number;
}
