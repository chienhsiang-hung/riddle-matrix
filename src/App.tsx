import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { ThemeProvider } from './contexts/ThemeContext';
import './i18n/config'; // 確保引入 i18n 設定

// 佔位元件
const PuzzleList = () => <div className="p-20 text-center text-4xl font-bold">謎題列表頁面 (Coming Soon)</div>;
const ConceptList = () => <div className="p-20 text-center text-4xl font-bold">知識節點頁面 (Coming Soon)</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'puzzles', element: <PuzzleList /> },
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