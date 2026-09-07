import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function FeedIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11a9 9 0 0 1 9 9" />
      <path d="M4 4a16 16 0 0 1 16 16" />
      <circle cx="5" cy="19" r="1" />
    </svg>
  );
}

export function BribeIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

export function HospitalIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 10h6M12 7v6" />
    </svg>
  );
}

export function ExtortionIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function UniversityIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

export function ShieldCheckIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function StarIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function MapIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" y1="3" x2="9" y2="18" />
      <line x1="15" y1="6" x2="15" y2="21" />
    </svg>
  );
}

export function ChartIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

export function LightbulbIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6M10 22h4" />
    </svg>
  );
}

export function UserIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export function LocationPinIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ClockIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function ThumbUpIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export function ThumbDownIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

export function ChatIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export function ShareIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function SearchIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function PhoneIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function PenIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </svg>
  );
}

export function FlameIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

export function AttachmentIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}

export function LockIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export function ImageIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

export function VideoIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
}

export function AudioIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

export function FileTextIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export function FilterIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

export function CheckIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CloseIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function BuildingIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <line x1="9" y1="22" x2="9" y2="2" />
      <path d="M14 6h2M14 10h2M14 14h2M14 18h2" />
    </svg>
  );
}

export function SparklesIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export function DownloadIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function AlertCircleIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function BellIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export function BookmarkIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function SettingsIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function LogOutIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function UsersIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function VoteBarsIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="currentColor">
      <rect x="4" y="10" width="3.5" height="10" rx="1.75" />
      <rect x="10.25" y="4" width="3.5" height="16" rx="1.75" />
      <rect x="16.5" y="8" width="3.5" height="12" rx="1.75" />
    </svg>
  );
}

export function ThreeDotsIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}

export function SmileIcon({ className = "w-4 h-4", size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} className={`shrink-0 ${className}`} style={{ minWidth: size, minHeight: size }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );
}

