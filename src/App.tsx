import { createHashRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n/config';

// 引入頁面與元件
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PuzzleListPage from './pages/PuzzleListPage';
import MontyHallPuzzle from './puzzles/monty-hall';

// 知識節點頁面 (暫時佔位)
const ConceptList = () => <div className="p-20 text-center text-4xl font-bold dark:text-white">知識節點頁面 (建置中 🚧)</div>;
// 雪柔的生日 (暫時佔位，我們下一個要做這個！)
const CherylsBirthday = () => <div className="p-20 text-center text-4xl font-bold dark:text-white">雪柔的生日 (建置中 🚧)</div>;

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />, // 💡 只要被 Layout 包住，底下所有的頁面都會有 Navbar！
    children: [
      { index: true, element: <HomePage /> },
      { 
        path: 'puzzles', 
        children: [
          { index: true, element: <PuzzleListPage /> }, // 列表頁：/puzzles
          { path: 'monty-hall', element: <MontyHallPuzzle /> }, // 蒙提霍爾：/puzzles/monty-hall
          { path: 'cheryls-birthday', element: <CherylsBirthday /> } // 雪柔：/puzzles/cheryls-birthday
        ]
      },
      { path: 'concepts', element: <ConceptList /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
