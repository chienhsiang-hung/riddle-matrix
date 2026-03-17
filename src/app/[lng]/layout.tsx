import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/Layout';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Riddle Temple',
  description: 'Explore the Ultimate Mysteries of Logic',
};

// 💡 告訴 Next.js 靜態匯出時，要產生哪些語言的路徑
export async function generateStaticParams() {
  return [{ lng: 'en' }, { lng: 'zh' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>; // Next.js 15 的 params 是 Promise
}) {
  const { lng } = await params;

  return (
    // 💡 這裡的 lang 屬性會動態變成 'en' 或 'zh'，SEO 滿分！
    <html lang={lng} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {/* 把語言變數傳給 Navbar 外框 */}
          <Layout lng={lng}>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}