'use client';

import React, { useState } from 'react';
import { DepartmentCategory, Division, ReportOutcome, EvidenceAttachment, IncidentCategory } from '@/lib/types';
import {
  BribeIcon,
  HospitalIcon,
  ExtortionIcon,
  UniversityIcon,
  ShieldCheckIcon,
  UserIcon,
  LocationPinIcon,
  ImageIcon,
  VideoIcon,
  AudioIcon,
  FileTextIcon,
  CloseIcon,
  CheckIcon,
  BuildingIcon,
  AttachmentIcon,
  ArrowRightIcon
} from './Icons';

interface ReportModalProps {
  initialCategory?: IncidentCategory;
  initialPhoto?: string;
  onClose: () => void;
  onSubmit: (reportData: {
    category: IncidentCategory;
    department: DepartmentCategory;
    service: string;
    division: Division;
    district: string;
    subDistrict: string;
    officeName: string;
    locationDetails: string;
    amount: number;
    outcome: ReportOutcome;
    officerDesignation: string;
    officerName?: string;
    accusedPhotoUrl?: string;
    spotPhotoUrl?: string;
    videoUrl?: string;
    images?: string[];
    description: string;
    evidenceFiles: EvidenceAttachment[];
    hospitalSection?: string;
    hospitalIssueType?: string;
    extortionSpot?: string;
    syndicateType?: string;
    universityName?: string;
    universityDeptHall?: string;
    universityIssueType?: string;
  }) => void;
}

const departmentsList: DepartmentCategory[] = [
  'ভূমি অফিস ও রেজিস্ট্রি',
  'বিআরটিএ (BRTA)',
  'পাসপোর্ট ও ইমিগ্রেশন',
  'বিচার বিভাগ ও আদালত',
  'পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা',
  'নির্বাচন কমিশন ও এনআইডি',
  'পুলিশ ও ট্রাফিক',
  'কাস্টমস ও ভ্যাট',
  'হাসপাতাল ও স্বাস্থ্যসেবা',
  'পৌরসভা ও সিটি কর্পোরেশন',
  'বিদ্যুৎ, গ্যাস ও তিতাস',
  'পরিবহন ও সড়ক সিন্ডিকেট',
  'কাঁচাবাজার ও ফুটপাত দখল',
  'অন্যান্য সরকারি দপ্তর ও খাত'
];

const divisionsList: { id: Division; label: string }[] = [
  { id: 'Dhaka', label: 'ঢাকা বিভাগ' },
  { id: 'Chattogram', label: 'চট্টগ্রাম বিভাগ' },
  { id: 'Rajshahi', label: 'রাজশাহী বিভাগ' },
  { id: 'Khulna', label: 'খুলনা বিভাগ' },
  { id: 'Sylhet', label: 'সিলেট বিভাগ' },
  { id: 'Barishal', label: 'বরিশাল বিভাগ' },
  { id: 'Rangpur', label: 'রংপুর বিভাগ' },
  { id: 'Mymensingh', label: 'ময়মনসিংহ বিভাগ' }
];

export default function ReportModal({ initialCategory = 'BRIBE', initialPhoto = '', onClose, onSubmit }: ReportModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<IncidentCategory>(initialCategory);

  // Form State
  const [department, setDepartment] = useState<DepartmentCategory>(
    initialCategory === 'HOSPITAL'
      ? 'হাসপাতাল ও স্বাস্থ্যসেবা'
      : initialCategory === 'EXTORTION'
      ? 'পরিবহন ও সড়ক সিন্ডিকেট'
      : initialCategory === 'UNIVERSITY'
      ? 'পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা'
      : 'ভূমি অফিস ও রেজিস্ট্রি'
  );
  const [division, setDivision] = useState<Division>('Dhaka');
  const [district, setDistrict] = useState('ঢাকা');
  const [subDistrict, setSubDistrict] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [locationDetails, setLocationDetails] = useState('');

  // Hospital Specific
  const [hospitalSection, setHospitalSection] = useState('');
  const [hospitalIssueType, setHospitalIssueType] = useState('দালাল সিন্ডিকেট ও সিট বাণিজ্য');

  // Extortion Specific
  const [extortionSpot, setExtortionSpot] = useState('');
  const [syndicateType, setSyndicateType] = useState('পরিবহন লাইনম্যান ও স্থানীয় চাঁদাবাজ চক্র');

  // University Specific
  const [universityDeptHall, setUniversityDeptHall] = useState('');
  const [universityIssueType, setUniversityIssueType] = useState('শিক্ষক ও কর্মকর্তা নিয়োগে ঘুষ বাণিজ্য');

  const [service, setService] = useState('');
  const [amount, setAmount] = useState<number>(5000);
  const [outcome, setOutcome] = useState<ReportOutcome>('PAID');
  const [officerDesignation, setOfficerDesignation] = useState('');
  const [officerName, setOfficerName] = useState('');

  // Photo & Video Attachments (Supports 1:1, 3:4, 16:9)
  const [spotPhotoUrl, setSpotPhotoUrl] = useState(initialPhoto);
  const [accusedPhotoUrl, setAccusedPhotoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadedImageRatio, setUploadedImageRatio] = useState<'AUTO' | '1:1' | '3:4' | '16:9'>('AUTO');

  const [description, setDescription] = useState('');
  const [evidenceLabel, setEvidenceLabel] = useState('');
  const [evidenceType, setEvidenceType] = useState<'image' | 'audio' | 'document' | 'video' | 'accused_photo'>('image');
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceAttachment[]>([]);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'spot' | 'accused') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (target === 'spot') {
          setSpotPhotoUrl(result);
        } else {
          setAccusedPhotoUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategorySelect = (cat: IncidentCategory) => {
    setCategory(cat);
    if (cat === 'HOSPITAL') {
      setDepartment('হাসপাতাল ও স্বাস্থ্যসেবা');
    } else if (cat === 'EXTORTION') {
      setDepartment('পরিবহন ও সড়ক সিন্ডিকেট');
    } else if (cat === 'UNIVERSITY') {
      setDepartment('পাবলিক বিশ্ববিদ্যালয় ও শিক্ষা');
    } else {
      setDepartment('ভূমি অফিস ও রেজিস্ট্রি');
    }
  };

  const handleAddEvidence = () => {
    if (!evidenceLabel.trim()) return;
    const newEv: EvidenceAttachment = {
      id: 'ev-' + Date.now(),
      type: evidenceType,
      url: evidenceType === 'accused_photo'
        ? (accusedPhotoUrl.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80')
        : evidenceType === 'image'
        ? (spotPhotoUrl.trim() || 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&auto=format&fit=crop&q=80')
        : 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      label: evidenceLabel.trim()
    };
    setEvidenceFiles([...evidenceFiles, newEv]);
    setEvidenceLabel('');
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officeName.trim() || !description.trim()) {
      alert('অনুগ্রহ করে প্রয়োজনীয় সব তথ্য পূরণ করুন');
      return;
    }

    const imagesList: string[] = [];
    if (spotPhotoUrl.trim()) imagesList.push(spotPhotoUrl.trim());
    if (accusedPhotoUrl.trim()) imagesList.push(accusedPhotoUrl.trim());

    onSubmit({
      category,
      department,
      service: service.trim() || (category === 'HOSPITAL' ? 'জরুরি চিকিৎসাসেবা' : category === 'EXTORTION' ? 'দৈনিক চাঁদা আদায়' : category === 'UNIVERSITY' ? 'বিশ্ববিদ্যালয় সেবা ও কার্যক্রম' : 'সরকারি সেবা'),
      division,
      district: district.trim() || 'ঢাকা',
      subDistrict: subDistrict.trim(),
      officeName: officeName.trim(),
      locationDetails: locationDetails.trim(),
      amount: Number(amount) || 0,
      outcome,
      officerDesignation: officerDesignation.trim() || (category === 'EXTORTION' ? syndicateType : ''),
      officerName: officerName.trim(),
      accusedPhotoUrl: accusedPhotoUrl.trim() || undefined,
      spotPhotoUrl: spotPhotoUrl.trim() || undefined,
      videoUrl: videoUrl.trim() || undefined,
      images: imagesList.length > 0 ? imagesList : undefined,
      description: description.trim(),
      evidenceFiles,
      hospitalSection: category === 'HOSPITAL' ? hospitalSection.trim() : undefined,
      hospitalIssueType: category === 'HOSPITAL' ? hospitalIssueType : undefined,
      extortionSpot: category === 'EXTORTION' ? extortionSpot.trim() : undefined,
      syndicateType: category === 'EXTORTION' ? syndicateType : undefined,
      universityName: category === 'UNIVERSITY' ? officeName.trim() : undefined,
      universityDeptHall: category === 'UNIVERSITY' ? universityDeptHall.trim() : undefined,
      universityIssueType: category === 'UNIVERSITY' ? universityIssueType : undefined
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full space-y-5 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-rose-600 font-bold text-xs uppercase tracking-wider">
                গোপনীয় পাবলিক পোস্ট
              </span>
              <span className="text-[10px] font-bold py-0.5 px-2 bg-emerald-50 text-emerald-700 rounded-full flex items-center gap-1">
                <ShieldCheckIcon size={11} className="text-emerald-600" />
                <span>জিরো লগিং • ১০০% বেনামী</span>
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {category === 'HOSPITAL'
                ? 'হাসপাতাল ভোগান্তি ও দালাল সিন্ডিকেটের তথ্য দিন'
                : category === 'EXTORTION'
                ? 'চাঁদাবাজি ও সিন্ডিকেটের তথ্য পোস্ট করুন'
                : category === 'UNIVERSITY'
                ? 'বিশ্ববিদ্যালয় দুর্নীতি ও অনিয়মের তথ্য পোস্ট করুন'
                : 'ঘুষ বা দুর্নীতির ঘটনা পোস্ট করুন'}
            </h3>
          </div>
          <button onClick={onClose} style={{ border: 'none' }} className="text-slate-400 hover:text-slate-800 p-1 cursor-pointer">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Category Switcher Tabs - BORDERLESS SMOOTH PILLS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleCategorySelect('BRIBE')}
            style={{
              border: 'none',
              background: category === 'BRIBE' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#f8fafc',
              color: category === 'BRIBE' ? '#ffffff' : '#475569',
              boxShadow: category === 'BRIBE' ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none'
            }}
            className="p-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
          >
            <BribeIcon size={14} className={category === 'BRIBE' ? 'text-white' : 'text-slate-500'} />
            <span>ঘুষ দাবি</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategorySelect('HOSPITAL')}
            style={{
              border: 'none',
              background: category === 'HOSPITAL' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#f8fafc',
              color: category === 'HOSPITAL' ? '#ffffff' : '#475569',
              boxShadow: category === 'HOSPITAL' ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none'
            }}
            className="p-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
          >
            <HospitalIcon size={14} className={category === 'HOSPITAL' ? 'text-white' : 'text-slate-500'} />
            <span>হাসপাতাল</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategorySelect('EXTORTION')}
            style={{
              border: 'none',
              background: category === 'EXTORTION' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#f8fafc',
              color: category === 'EXTORTION' ? '#ffffff' : '#475569',
              boxShadow: category === 'EXTORTION' ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none'
            }}
            className="p-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
          >
            <ExtortionIcon size={14} className={category === 'EXTORTION' ? 'text-white' : 'text-slate-500'} />
            <span>চাঁদাবাজি</span>
          </button>

          <button
            type="button"
            onClick={() => handleCategorySelect('UNIVERSITY')}
            style={{
              border: 'none',
              background: category === 'UNIVERSITY' ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : '#f8fafc',
              color: category === 'UNIVERSITY' ? '#ffffff' : '#475569',
              boxShadow: category === 'UNIVERSITY' ? '0 2px 8px rgba(37, 99, 235, 0.3)' : 'none'
            }}
            className="p-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer hover:opacity-95"
          >
            <UniversityIcon size={14} className={category === 'UNIVERSITY' ? 'text-white' : 'text-slate-500'} />
            <span>বিশ্ববিদ্যালয়</span>
          </button>
        </div>

        {/* Step Indicator - BORDERLESS */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold">
          <div style={{ border: 'none' }} className={`p-2 rounded-xl transition ${step === 1 ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'}`}>
            স্থান ও পরিচয়
          </div>
          <div style={{ border: 'none' }} className={`p-2 rounded-xl transition ${step === 2 ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'}`}>
            দাবি ও অভিযুক্ত
          </div>
          <div style={{ border: 'none' }} className={`p-2 rounded-xl transition ${step === 3 ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 text-slate-500'}`}>
            বিবরণ ও প্রমাণ
          </div>
        </div>

        {/* STEP 1: Office/Hospital/Spot and Location */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">বিভাগ *</label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-bold outline-none focus:border-blue-500"
                >
                  {divisionsList.map((div) => (
                    <option key={div.id} value={div.id}>
                      {div.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">জেলা *</label>
                <input
                  type="text"
                  placeholder="যেমন: ঢাকা, চট্টগ্রাম, সিলেট, রাজশাহী"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">উপজেলা / এলাকা</label>
                <input
                  type="text"
                  placeholder="যেমন: শাহবাগ / নীলক্ষেত, মতিহার, ধানমন্ডি"
                  value={subDistrict}
                  onChange={(e) => setSubDistrict(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {category === 'HOSPITAL'
                    ? 'হাসপাতালের নাম *'
                    : category === 'EXTORTION'
                    ? 'টার্মিনাল / মার্কেট / স্পটের নাম *'
                    : category === 'UNIVERSITY'
                    ? 'বিশ্ববিদ্যালয় বা শিক্ষা প্রতিষ্ঠানের নাম *'
                    : 'নির্দিষ্ট অফিসের নাম *'}
                </label>
                <input
                  type="text"
                  placeholder={
                    category === 'HOSPITAL'
                      ? 'যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল'
                      : category === 'EXTORTION'
                      ? 'যেমন: গাবতলী বাস টার্মিনাল / কাওরান বাজার'
                      : category === 'UNIVERSITY'
                      ? 'যেমন: ঢাকা বিশ্ববিদ্যালয় (DU), রাজশাহী বিশ্ববিদ্যালয় (RU)'
                      : 'যেমন: সহকারী কমিশনার (ভূমি) অফিস'
                  }
                  value={officeName}
                  onChange={(e) => setOfficeName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {category === 'HOSPITAL' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">হাসপাতাল ইউনিট / ওয়ার্ড</label>
                  <input
                    type="text"
                    placeholder="যেমন: জরুরি বিভাগ, আইসিইউ, ৪নং ওয়ার্ড"
                    value={hospitalSection}
                    onChange={(e) => setHospitalSection(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ভোগান্তির ধরন</label>
                  <select
                    value={hospitalIssueType}
                    onChange={(e) => setHospitalIssueType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-bold outline-none"
                  >
                    <option value="দালাল সিন্ডিকেট ও সিট বাণিজ্য">দালাল সিন্ডিকেট ও সিট বাণিজ্য</option>
                    <option value="ট্রলি সিন্ডিকেটের জিম্মি করা">ট্রলি সিন্ডিকেটের জিম্মি করা</option>
                    <option value="টেস্ট ও ওষুধে অতিরিক্ত ফি দাবি">টেস্ট ও ওষুধে অতিরিক্ত ফি দাবি</option>
                    <option value="ডাক্তার অনুপস্থিতি ও অবহেলা">ডাক্তার অনুপস্থিতি ও অবহেলা</option>
                  </select>
                </div>
              </div>
            ) : category === 'EXTORTION' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">চাঁদাবাজির নির্দিষ্ট স্পট</label>
                  <input
                    type="text"
                    placeholder="যেমন: বাসস্ট্যান্ড ১ নং গেট, কাঁচাবাজার আড়ত"
                    value={extortionSpot}
                    onChange={(e) => setExtortionSpot(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">চাঁদাবাজ সিন্ডিকেট বা গ্রুপ</label>
                  <input
                    type="text"
                    placeholder="যেমন: পরিবহন লাইনম্যান চক্র / ফুটপাত গ্যাং"
                    value={syndicateType}
                    onChange={(e) => setSyndicateType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none"
                  />
                </div>
              </div>
            ) : category === 'UNIVERSITY' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">বিভাগ / অনুষদ / হল</label>
                  <input
                    type="text"
                    placeholder="যেমন: সমাজবিজ্ঞান অনুষদ, সলিমুল্লাহ মুসলিম হল"
                    value={universityDeptHall}
                    onChange={(e) => setUniversityDeptHall(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">অনিয়মের ধরন</label>
                  <select
                    value={universityIssueType}
                    onChange={(e) => setUniversityIssueType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-bold outline-none"
                  >
                    <option value="শিক্ষক ও কর্মকর্তা নিয়োগে ঘুষ বাণিজ্য">শিক্ষক ও কর্মকর্তা নিয়োগে ঘুষ বাণিজ্য</option>
                    <option value="হল সিট বরাদ্দ ও গণরুম চাঁদাবাজি">হল সিট বরাদ্দ ও গণরুম চাঁদাবাজি</option>
                    <option value="টেন্ডার ও উন্নয়ন বাজেট আত্মসাৎ">টেন্ডার ও উন্নয়ন বাজেট আত্মসাৎ</option>
                    <option value="গবেষণা তহবিল ও বিল ভাউচার জালিয়াতি">গবেষণা তহবিল ও বিল ভাউচার জালিয়াতি</option>
                    <option value="ভর্তি বাণিজ্য ও ফলাফল ম্যানিপুলেশন">ভর্তি বাণিজ্য ও ফলাফল ম্যানিপুলেশন</option>
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">সরকারি দপ্তর বা ক্যাটাগরি *</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 font-bold outline-none"
                >
                  {departmentsList.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">সুনির্দিষ্ট ঠিকানা বা রোড নম্বর (ঐচ্ছিক)</label>
              <input
                type="text"
                placeholder="যেমন: রোড নং ৮/এ, ধানমন্ডি / গাবতলী মাজার রোড"
                value={locationDetails}
                onChange={(e) => setLocationDetails(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  if (!officeName.trim()) {
                    alert('অনুগ্রহ করে নাম লিখুন');
                    return;
                  }
                  setStep(2);
                }}
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:opacity-95"
              >
                <span>পরবর্তী ধাপ</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Service, Amount & Accused Person info */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {category === 'HOSPITAL'
                  ? 'রোগী বা সেবার বিবরণ *'
                  : category === 'EXTORTION'
                  ? 'কীসের জন্য চাঁদা দাবি করা হয়েছিল? *'
                  : category === 'UNIVERSITY'
                  ? 'কী সংক্রান্ত অনিয়ম বা সেবার বিষয়? *'
                  : 'আপনি কী সেবার জন্য গিয়েছিলেন? *'}
              </label>
              <input
                type="text"
                placeholder={
                  category === 'HOSPITAL'
                    ? 'যেমন: জরুরি আইসিইউ বেড ভর্তি, ট্রলিতে রোগী স্থানান্তর'
                    : category === 'EXTORTION'
                    ? 'যেমন: প্রতিদিন বাস ছাড়ার চাঁদা, আড়তের পণ্য নামানোর টোল'
                    : category === 'UNIVERSITY'
                    ? 'যেমন: প্রভাষক পদে নিয়োগ ভাইভা, হল সিট বরাদ্দ ও গণরুম'
                    : 'যেমন: নামজারি, ড্রাইভিং লাইসেন্স, পাসপোর্ট'
                }
                value={service}
                onChange={(e) => setService(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {category === 'EXTORTION'
                    ? 'দাবিকৃত চাঁদার অঙ্ক (টাকা BDT) *'
                    : category === 'HOSPITAL'
                    ? 'অতিরিক্ত দাবিকৃত ফি (টাকা BDT) *'
                    : category === 'UNIVERSITY'
                    ? 'দাবিকৃত নিয়োগ/সিট ঘুষ বা আত্মসাৎকৃত অর্থ (টাকা BDT) *'
                    : 'দাবিকৃত ঘুষের অঙ্ক (টাকা BDT) *'}
                </label>
                <input
                  type="number"
                  min={50}
                  step={50}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-amber-700 font-mono font-bold outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  অভিযুক্ত ব্যক্তি বা দলের পদবি
                </label>
                <input
                  type="text"
                  placeholder={
                    category === 'UNIVERSITY'
                      ? 'যেমন: নিয়োগ কমিটির প্রভাবশালী সদস্য, হল সিট দালাল'
                      : 'যেমন: সার্ভেয়ার, ওয়ার্ডবয় দালাল, টার্মিনাল লাইনম্যান'
                  }
                  value={officerDesignation}
                  onChange={(e) => setOfficerDesignation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  অভিযুক্ত ব্যক্তির নাম (জানা থাকলে)
                </label>
                <input
                  type="text"
                  placeholder="যেমন: আব্দুল কাদের (সার্ভেয়ার) / লাইনম্যান বাবলু"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  অভিযুক্ত ব্যক্তির ছবি (ফাইল / লিংক)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... ছবির লিংক"
                    value={accusedPhotoUrl}
                    onChange={(e) => setAccusedPhotoUrl(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 outline-none"
                  />
                  <label
                    style={{ border: 'none', background: '#f1f5f9', color: '#334155' }}
                    className="px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer hover:bg-slate-200 transition shrink-0 flex items-center gap-1"
                  >
                    <span>ফাইল</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'accused')}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                ঘটনার ফলাফল বা আপনার সিদ্ধান্ত *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setOutcome('PAID')}
                  style={{
                    border: 'none',
                    background: outcome === 'PAID' ? 'linear-gradient(135deg, #e11d48, #be123c)' : '#ffe4e6',
                    color: outcome === 'PAID' ? '#ffffff' : '#be123c',
                    boxShadow: outcome === 'PAID' ? '0 2px 8px rgba(225, 29, 72, 0.3)' : 'none'
                  }}
                  className="p-3 rounded-2xl text-xs font-bold transition text-center cursor-pointer hover:opacity-95"
                >
                  বাধ্য হয়ে দিয়েছি
                </button>

                <button
                  type="button"
                  onClick={() => setOutcome('REFUSED')}
                  style={{
                    border: 'none',
                    background: outcome === 'REFUSED' ? 'linear-gradient(135deg, #10b981, #059669)' : '#d1fae5',
                    color: outcome === 'REFUSED' ? '#ffffff' : '#059669',
                    boxShadow: outcome === 'REFUSED' ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none'
                  }}
                  className="p-3 rounded-2xl text-xs font-bold transition text-center cursor-pointer hover:opacity-95"
                >
                  দাবি প্রত্যাখ্যান করেছি
                </button>

                <button
                  type="button"
                  onClick={() => setOutcome('PENDING')}
                  style={{
                    border: 'none',
                    background: outcome === 'PENDING' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#fef3c7',
                    color: outcome === 'PENDING' ? '#ffffff' : '#b45309',
                    boxShadow: outcome === 'PENDING' ? '0 2px 8px rgba(245, 158, 11, 0.3)' : 'none'
                  }}
                  className="p-3 rounded-2xl text-xs font-bold transition text-center cursor-pointer hover:opacity-95"
                >
                  কাজ আটকে আছে
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ border: 'none' }}
                className="text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer p-2 rounded-lg hover:bg-slate-100"
              >
                ← পূর্ববর্তী ধাপ
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!amount) {
                    alert('অনুগ্রহ করে টাকার অঙ্ক দিন');
                    return;
                  }
                  setStep(3);
                }}
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: '#ffffff',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer hover:opacity-95"
              >
                <span>পরবর্তী ধাপ</span>
                <ArrowRightIcon size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Incident Story & Proof Files (MULTI ASPECT-RATIO UPLOADER) */}
        {step === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ঘটনার বিস্তারিত বিবরণ *
              </label>
              <textarea
                rows={3}
                required
                placeholder="কীভাবে অতিরিক্ত টাকা বা চাঁদা দাবি করা হয়েছিল এবং কী অজুহাত দেখানো হয়েছিল তা সংক্ষেপে লিখুন..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-blue-500 resize-none leading-relaxed"
              />
            </div>

            {/* DYNAMIC IMAGE UPLOADER (Supports 1:1, 3:4, 16:9) */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ImageIcon size={14} className="text-blue-600" />
                    <span>ঘটনাস্থল / রসিদ / ডকুমেন্টের ছবি (১:১, ৩:৪, ১৬:৯)</span>
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    যে কোনো সাইজ বা রেশিওর ছবি আপলোড করুন—স্বয়ংক্রিয়ভাবে নিখুঁত আকারে ফিট হবে।
                  </p>
                </div>
                <label
                  style={{
                    border: 'none',
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: '#ffffff'
                  }}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold cursor-pointer hover:opacity-90 transition flex items-center gap-1.5 shadow-xs"
                >
                  <AttachmentIcon size={12} />
                  <span>ছবি নির্বাচন করুন</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'spot')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Direct URL Input alternative */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="অথবা ছবির ওয়েব লিংক দিন (https://...)"
                  value={spotPhotoUrl}
                  onChange={(e) => setSpotPhotoUrl(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500"
                />
              </div>

              {/* Live Preview if an image is loaded */}
              {spotPhotoUrl && (
                <div className="relative rounded-2xl overflow-hidden bg-slate-900/5 p-2 flex items-center justify-center max-h-60 border border-slate-200">
                  <img
                    src={spotPhotoUrl}
                    alt="প্রিভিউ"
                    style={{ maxHeight: '200px', objectFit: 'contain' }}
                    className="rounded-xl w-auto max-h-[200px]"
                  />
                  <button
                    type="button"
                    onClick={() => setSpotPhotoUrl('')}
                    style={{ border: 'none' }}
                    className="absolute top-3 right-3 bg-slate-900/70 hover:bg-slate-900 text-white p-1.5 rounded-full cursor-pointer transition"
                  >
                    <CloseIcon size={14} />
                  </button>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 text-white text-[10px] px-2 py-0.5 rounded-full font-mono">
                    ✓ সঠিক রেশিওতে সংরক্ষিত
                  </div>
                </div>
              )}
            </div>

            {/* Video Link */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                ভিডিও প্রমাণের লিংক (ঐচ্ছিক - YouTube / Drive / Facebook)
              </label>
              <input
                type="url"
                placeholder="https://... ভিডিও প্রমাণের লিংক"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 outline-none"
              />
            </div>

            {/* Additional Evidence Uploader */}
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <AttachmentIcon size={13} className="text-slate-500" />
                  <span>অন্যান্য প্রমাণপত্র সংযুক্তি (রসিদ / অডিও)</span>
                </span>
                <span className="text-[10px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full">
                  ভেরিফাইড ব্যাজের জন্য সহায়ক
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value as any)}
                  className="bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 outline-none"
                >
                  <option value="image">ঘটনাস্থলের ছবি</option>
                  <option value="accused_photo">অভিযুক্তের ছবি</option>
                  <option value="document">রশিদ / ডকুমেন্টস</option>
                  <option value="video">ভিডিও ফুটেজ</option>
                  <option value="audio">অডিও ক্লিপ</option>
                </select>

                <input
                  type="text"
                  placeholder="প্রমাণের নাম (যেমন: মানিরসিদ / ট্র্যাকিং স্লিপ)"
                  value={evidenceLabel}
                  onChange={(e) => setEvidenceLabel(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800 outline-none"
                />

                <button
                  type="button"
                  onClick={handleAddEvidence}
                  style={{ border: 'none', background: '#334155', color: '#ffffff' }}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-700 transition cursor-pointer"
                >
                  + যুক্ত করুন
                </button>
              </div>

              {/* Added Files List */}
              {evidenceFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {evidenceFiles.map((ev, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 text-xs px-2.5 py-1 rounded-full">
                      <CheckIcon size={12} className="text-blue-600" />
                      <span>{ev.label} ({ev.type})</span>
                      <button
                        type="button"
                        onClick={() => setEvidenceFiles(evidenceFiles.filter((_, idx) => idx !== i))}
                        style={{ border: 'none' }}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer p-0.5"
                      >
                        <CloseIcon size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy Checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-slate-500 cursor-pointer pt-1">
              <input type="checkbox" required defaultChecked className="mt-0.5 rounded cursor-pointer" />
              <span>
                আমি নিশ্চিত করছি যে এই তথ্য ও প্রমাণপত্র সত্য এবং ব্যক্তিগত শত্রুতা বশত কাউকে হয়রানি করার উদ্দেশ্যে করা হয়নি।
              </span>
            </label>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{ border: 'none' }}
                className="text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer p-2 rounded-lg hover:bg-slate-100"
              >
                ← পূর্ববর্তী ধাপ
              </button>

              <button
                type="submit"
                style={{
                  border: 'none',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: '#ffffff',
                  boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
                }}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer hover:opacity-95"
              >
                <span>নিশ্চিত করে পোস্ট করুন</span>
                <ArrowRightIcon size={15} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

