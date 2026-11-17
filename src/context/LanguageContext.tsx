'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LanguageOption } from '@/types';
import { LANGUAGES, translations } from '@/i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  currentOption: LanguageOption;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('timetraveler_lang') as Language;
      if (savedLang && translations[savedLang]) {
        setLanguageState(savedLang);
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  useEffect(() => {
    const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
    document.documentElement.dir = current.direction;
    document.documentElement.lang = current.code;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('timetraveler_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language] || translations.en;
    if (langDict[key]) {
      return langDict[key];
    }
    if (translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const isRTL = currentOption.direction === 'rtl';

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentOption,
        isRTL,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

