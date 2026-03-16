import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import './i18n/config';

// 佔位用的頁面元件 (後續再來豐富它們)
const Home = () => <div className="p-8 text-2xl font-bold">歡迎來到邏輯解謎庫 🧠</div>;
const CherylsBirthday = () => <div className="p-8">這裡是雪柔的生日題目區</div>;
const MathConcepts = () => <div className="p-8">排列組合與機率基礎知識點</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 套用共用外框 (Navbar + Footer)
    children: [
      { index: true, element: <Home /> },
      {
        path: 'puzzles',
        children: [
          { path: 'cheryls-birthday', element: <CherylsBirthday /> },
          // 未來可以加 { path: 'monty-hall', element: <MontyHall /> }
        ],
      },
      {
        path: 'concepts',
        children: [
          { path: 'math', element: <MathConcepts /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}