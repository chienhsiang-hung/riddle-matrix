'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 預設導向中文版 (Next.js useRouter 會自動幫你加上 basePath)
    router.replace('/zh');
  }, [router]);

  return null; // 轉址過程中不需要渲染任何畫面
}