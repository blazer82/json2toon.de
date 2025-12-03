import i18n, { type i18n as I18nInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { defaultLanguage, supportedLanguages, type SupportedLanguage } from './config';

// English translations
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enConverter from './locales/en/converter.json';
import enFaq from './locales/en/faq.json';
import enComparison from './locales/en/comparison.json';
import enHowItWorks from './locales/en/howItWorks.json';
import enCalculator from './locales/en/calculator.json';
import enUseCases from './locales/en/useCases.json';
import enErrors from './locales/en/errors.json';

// German translations
import deCommon from './locales/de/common.json';
import deHome from './locales/de/home.json';
import deConverter from './locales/de/converter.json';
import deFaq from './locales/de/faq.json';
import deComparison from './locales/de/comparison.json';
import deHowItWorks from './locales/de/howItWorks.json';
import deCalculator from './locales/de/calculator.json';
import deUseCases from './locales/de/useCases.json';
import deErrors from './locales/de/errors.json';

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    converter: enConverter,
    faq: enFaq,
    comparison: enComparison,
    howItWorks: enHowItWorks,
    calculator: enCalculator,
    useCases: enUseCases,
    errors: enErrors,
  },
  de: {
    common: deCommon,
    home: deHome,
    converter: deConverter,
    faq: deFaq,
    comparison: deComparison,
    howItWorks: deHowItWorks,
    calculator: deCalculator,
    useCases: deUseCases,
    errors: deErrors,
  },
};

const isServer = typeof window === 'undefined';

/**
 * Parse Accept-Language header and return the best matching supported language
 */
export function getLanguageFromHeader(acceptLanguage: string | null): SupportedLanguage {
  if (!acceptLanguage) return defaultLanguage;

  // Parse Accept-Language header (e.g., "de-DE,de;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map((lang) => {
      const [code, qValue] = lang.trim().split(';q=');
      return {
        code: code.split('-')[0].toLowerCase(), // Get primary language code
        q: qValue ? parseFloat(qValue) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  // Find the first supported language
  for (const { code } of languages) {
    if (supportedLanguages.includes(code as SupportedLanguage)) {
      return code as SupportedLanguage;
    }
  }

  return defaultLanguage;
}

/**
 * Initialize i18n for server-side rendering with a specific language
 */
export function initI18nServer(language: SupportedLanguage): I18nInstance {
  const instance = i18n.createInstance();

  instance.use(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    defaultNS: 'common',
    ns: [
      'common',
      'home',
      'converter',
      'faq',
      'comparison',
      'howItWorks',
      'calculator',
      'useCases',
      'errors',
    ],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  return instance;
}

// Client-side initialization
if (!isServer) {
  // Get language from HTML lang attribute (set by server) to avoid hydration mismatch
  const htmlLang = document.documentElement.lang as SupportedLanguage;
  const serverLanguage = supportedLanguages.includes(htmlLang) ? htmlLang : undefined;

  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      lng: serverLanguage, // Start with server language to avoid hydration mismatch
      fallbackLng: defaultLanguage,
      supportedLngs: [...supportedLanguages],
      defaultNS: 'common',
      ns: [
        'common',
        'home',
        'converter',
        'faq',
        'comparison',
        'howItWorks',
        'calculator',
        'useCases',
        'errors',
      ],
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ['localStorage', 'navigator'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
      },
      react: {
        useSuspense: false,
      },
    });
} else {
  // Server-side: initialize with default language (will be overridden per-request)
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: [...supportedLanguages],
    defaultNS: 'common',
    ns: [
      'common',
      'home',
      'converter',
      'faq',
      'comparison',
      'howItWorks',
      'calculator',
      'useCases',
      'errors',
    ],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
