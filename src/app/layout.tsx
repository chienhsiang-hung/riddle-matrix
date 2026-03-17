import type { Metadata } from 'next';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Layout from '@/components/Layout';
import '@/index.css';

export const metadata: Metadata = {
  title: 'Riddle Temple',
  description: 'Explore the Ultimate Mysteries of Logic',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
