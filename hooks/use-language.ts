'use client';

import { useState, useEffect } from 'react';
import { Language, useTranslation } from '@/lib/i18n';

export function useLanguage() {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    // Get from localStorage or browser language
    const stored = localStorage.getItem('language') as Language;
    const browserLang = navigator.language.split('-')[0] as Language;
    const defaultLang = stored || browserLang || 'en';
    
    if (['en', 'es', 'fr', 'de', 'zh', 'ja', 'hi', 'pt', 'ru', 'ar'].includes(defaultLang)) {
      setLang(defaultLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', lang);
  }, [lang]);

  const { t } = useTranslation(lang);

  return { lang, setLang, t };
}
