// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './assets/translations/en.json';
import translationPT from './assets/translations/pt.json';


const resources = {
  en: { translation: translationEN },
  pt: { translation: translationPT },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources,
    react: {
      transSupportBasicHtmlNodes: true
    }
  });

export default i18n;
