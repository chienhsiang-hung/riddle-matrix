'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../i18n/config';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 font-sans">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-950/70 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🧩</span>
            <span className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
              🧩 {t('nav.title')}
            </span>
          </Link>
          
          <div className="flex gap-8 items-center font-medium text-gray-700 dark:text-gray-300">
            <Link href="/puzzles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.puzzles')}</Link>
            <Link href="/concepts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.concepts')}</Link>
            
            <div className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-700 pl-6">
              <button onClick={toggleTheme} className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
              
              <button 
                onClick={toggleLanguage}
                className="px-4 py-2 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm"
              >
                {t('common.switchLang')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {children}
      </main>

      <footer className="py-12 mt-20 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50">
        <div className="text-center text-sm text-gray-500 dark:text-gray-600">
          © 2024 Riddle Temple. Built for the curious minds.
        </div>
      </footer>
    </div>
  );
}
