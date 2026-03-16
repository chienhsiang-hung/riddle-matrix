import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Layout() {
  const { t, i18n } = useTranslation();

  // 切換語言的 function
  const toggleLanguage = () => {
    const nextLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      <nav className="p-4 bg-white dark:bg-gray-800 shadow-md flex justify-between items-center">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          {t('nav.title')}
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/puzzles/cheryls-birthday" className="hover:text-blue-500 transition-colors">
            {t('nav.cherylsBirthday')}
          </Link>
          <Link to="/concepts/math" className="hover:text-blue-500 transition-colors">
            {t('nav.mathConcepts')}
          </Link>
          
          {/* Dark Mode 按鈕 (稍後實作) */}
          <button className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            🌙
          </button>
          
          {/* 多國語系切換按鈕 */}
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded font-bold text-sm bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
          >
            {t('common.switchLang')}
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-200 dark:border-gray-700">
        <Outlet />
      </main>
    </div>
  );
}