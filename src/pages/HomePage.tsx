import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface PuzzleCardProps {
  icon: string;
  title: string;
  desc: string;
  to: string;
  tag: string;
}

// 封裝謎題卡片元件
function PuzzleCard({ icon, title, desc, to, tag }: PuzzleCardProps) {
  return (
    <Link to={to} className="group relative block p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:border-blue-100 dark:hover:border-blue-900 transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {/* 背景裝飾幾何圖形 (滑鼠移上去會變亮) */}
      <div className="absolute -bottom-8 -right-8 text-9xl opacity-10 group-hover:opacity-20 transition-opacity group-hover:rotate-12 duration-500">
        {icon}
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="text-5xl">{icon}</div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {tag}
          </span>
        </div>
        
        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {desc}
        </p>
        
        <div className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          Challenge →
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div className="relative overflow-hidden">
      
      {/* 背景幾何裝飾光暈 */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl opacity-50 z-0"></div>

      {/* --- Hero Section --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="inline-block mb-4 px-4 py-1 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase">
          Logic • Math • Cryptography
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
            {t('home.heroTitle')}
          </span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 mb-12 leading-relaxed">
          {t('home.heroSubtitle')}
        </p>
        
        <Link 
          to="/puzzles" 
          className="px-10 py-4 rounded-2xl text-lg font-bold bg-gray-900 text-white dark:bg-white dark:text-gray-950 hover:bg-gray-700 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-blue-500/20"
        >
          {t('home.startExploring')}
        </Link>
      </section>

      {/* --- Featured Puzzles --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-extrabold tracking-tight mb-16 text-center">
          {t('home.featuredPuzzles')}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-10">
          <PuzzleCard 
            icon="📅"
            title={t('home.puzzle1.title')}
            desc={t('home.puzzle1.desc')}
            to="/puzzles/cheryls-birthday"
            tag="Logic Deduction"
          />
          
          <PuzzleCard 
            icon="🎂"
            title={t('home.puzzle2.title')}
            desc={t('home.puzzle2.desc')}
            to="/puzzles/birthday-paradox"
            tag="Probability"
          />
        </div>
      </section>
    </div>
  );
}