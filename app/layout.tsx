import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '36 Bangla (৩৬ বাংলা) — গণস্বচ্ছতা ও নাগরিক অভিযোগ ফোরাম',
  description: '36 Bangla (৩৬ বাংলা) — বাংলাদেশের নাগরিক স্বচ্ছতা, অনিয়ম ও সততার ওপেন ডাটা সোশ্যাল প্ল্যাটফর্ম। সম্পূর্ণ নিরাপদ ও পরিচয়হীন।',
  keywords: ['36 Bangla', '৩৬ বাংলা', '36bangla', 'নাগরিক ফোরাম', 'স্বচ্ছতা', 'অনিয়ম রিপোর্ট', 'Bangladesh Whistleblower', 'Public Ledger Bangladesh'],
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <link rel="icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700;800;900&family=Anek+Bangla:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700;800;900&family=Hind+Siliguri:wght@400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
