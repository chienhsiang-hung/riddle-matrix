import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import zhTranslations from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      zh: { translation: zhTranslations }
    },
    lng: 'zh', // 預設使用中文
    fallbackLng: 'en', // 如果找不到翻譯，退回英文
    interpolation: {
      escapeValue: false // React 已經預設防範 XSS 了
    }
  });

export default i18n;