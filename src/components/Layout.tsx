'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import '../i18n/config';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 font-sans">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 border-b border-gray-200 dark:border-gray-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">🧩</span>
              <span className="text-xl sm:text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                {t('nav.title')}
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8 items-center font-semibold text-gray-600 dark:text-gray-400 text-sm tracking-wide uppercase">
              <Link href="/puzzles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.puzzles')}</Link>
              <Link href="/concepts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('nav.concepts')}</Link>
              
              <div className="flex items-center gap-3 border-l border-gray-200 dark:border-gray-800 pl-6 ml-2">
                <button 
                  onClick={toggleTheme} 
                  className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all border border-gray-200 dark:border-gray-800"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? '🌞' : '🌙'}
                </button>
                
                <button 
                  onClick={toggleLanguage}
                  className="px-5 py-2.5 rounded-2xl font-bold text-xs bg-gray-900 text-white dark:bg-blue-600 dark:hover:bg-blue-500 hover:bg-gray-800 transition-all shadow-md active:scale-95"
                >
                  {t('common.switchLang')}
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                {theme === 'dark' ? '🌞' : '🌙'}
              </button>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar/Menu Overlay */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 border-b border-gray-200 dark:border-gray-800' : 'max-h-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white/90 dark:bg-gray-950/90 backdrop-blur-lg">
            <Link 
              href="/puzzles" 
              className="block px-4 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.puzzles')}
            </Link>
            <Link 
              href="/concepts" 
              className="block px-4 py-3 rounded-xl font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('nav.concepts')}
            </Link>
            <div className="pt-2 px-4">
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsMenuOpen(false);
                }}
                className="w-full py-3 rounded-xl font-bold bg-blue-600 text-white shadow-lg active:scale-95 transition-all"
              >
                {t('common.switchLang')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative">
        {children}
      </main>

      <footer className="py-16 mt-20 border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧩</span>
              <span className="font-bold tracking-tight text-gray-900 dark:text-white">Riddle Temple</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
              <Link href="/puzzles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Puzzles</Link>
              <Link href="/concepts" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Concepts</Link>
              <a href="https://github.com/chienhsiang-hung/riddle-matrix" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">GitHub</a>
            </div>
            <div className="text-sm text-gray-400 dark:text-gray-600 font-medium">
              © {new Date().getFullYear()} Riddle Temple. Built for curious minds.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
