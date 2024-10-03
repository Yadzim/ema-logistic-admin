import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationUz from "locales/uz/translation.json"
import translationRu from "locales/ru/translation.json"
import translationEn from "locales/en/translation.json"
import translationKr from "locales/kr/translation.json"
// import translation from './translation.json';

const resources = {
  en: {
    translation: translationEn,
  },
  uz: {
    translation: translationUz,
  },
  ru: {
    translation: translationRu,
  },
  kr: {
    translation: translationKr,
  },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {resources}
  });

export default i18n;