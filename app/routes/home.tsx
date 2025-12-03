import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { Route } from './+types/home';
import { ConverterSection } from '~/components/converter/ConverterSection';
import { HowToonWorks } from '~/components/content/HowToonWorks';
import { UseCases } from '~/components/content/UseCases';
import { TokenCalculator } from '~/components/content/TokenCalculator';
import { ComparisonTable } from '~/components/content/ComparisonTable';
import { FaqSection } from '~/components/content/FaqSection';
import { LanguageSwitcher } from '~/components/ui/LanguageSwitcher';
import { type SampleData, defaultJsonSample } from '~/utils/samples';
import i18n from '~/i18n';

export function meta({}: Route.MetaArgs) {
  const t = i18n.t.bind(i18n);
  const lang = i18n.language || 'en';

  return [
    { title: t('home:meta.title') },
    {
      name: 'description',
      content: t('home:meta.description'),
    },
    {
      name: 'keywords',
      content: t('home:meta.keywords'),
    },

    // Open Graph
    {
      property: 'og:title',
      content: t('home:meta.ogTitle'),
    },
    {
      property: 'og:description',
      content: t('home:meta.ogDescription'),
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://json2toon.de' },
    { property: 'og:site_name', content: 'JSON to TOON Converter' },
    {
      property: 'og:locale',
      content: lang === 'de' ? 'de_DE' : 'en_US',
    },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'JSON to TOON Converter' },
    {
      name: 'twitter:description',
      content: t('home:meta.twitterDescription'),
    },

    // Additional SEO
    { name: 'robots', content: 'index, follow' },
    { name: 'author', content: 'json2toon.de' },
    { name: 'canonical', content: 'https://json2toon.de' },

    // Hreflang for language alternatives
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'en',
      href: 'https://json2toon.de',
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'de',
      href: 'https://json2toon.de',
    },
    {
      tagName: 'link',
      rel: 'alternate',
      hrefLang: 'x-default',
      href: 'https://json2toon.de',
    },
  ];
}

export default function Home() {
  const { t } = useTranslation('home');
  const converterRef = useRef<{ loadSample: (sample: SampleData) => void }>(null);
  const [sampleToLoad, setSampleToLoad] = useState<SampleData | null>(null);

  const handleLoadSampleFromContent = useCallback((sample: SampleData) => {
    setSampleToLoad(sample);
    // Scroll to top where converter is
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
                JSON <span className="text-emerald-600 dark:text-emerald-400">↔</span> TOON
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {t('header.subtitle')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <a
                href="https://github.com/blazer82/json2toon.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="json2toon.de on GitHub"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-10">
        {/* Converter Section - Above the Fold */}
        <ConverterSectionWithSample
          sampleToLoad={sampleToLoad}
          onSampleLoaded={() => setSampleToLoad(null)}
        />

        {/* Below the Fold Content */}
        <HowToonWorks />
        <UseCases onLoadSample={handleLoadSampleFromContent} />
        <TokenCalculator />
        <ComparisonTable />
        <FaqSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">{t('footer.privacy')}</div>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="https://toonformat.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              >
                {t('footer.toonSpec')}
              </a>
              <a
                href="https://github.com/blazer82/json2toon.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
              >
                {t('footer.github')}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'JSON to TOON Converter',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Web Browser',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            description:
              'Convert JSON to TOON format to reduce LLM token usage by up to 50%. Free online tool for developers.',
            featureList: [
              'Real-time JSON to TOON conversion',
              'TOON to JSON conversion',
              'Token count comparison',
              'One-click copy',
              'Client-side only processing',
              'Sample data examples',
            ],
            url: 'https://json2toon.de',
            author: {
              '@type': 'Organization',
              name: 'json2toon.de',
            },
          }),
        }}
      />
    </div>
  );
}

// Wrapper component to handle sample loading from content sections
function ConverterSectionWithSample({
  sampleToLoad,
  onSampleLoaded,
}: {
  sampleToLoad: SampleData | null;
  onSampleLoaded: () => void;
}) {
  const [key, setKey] = useState(0);
  const [initialSample, setInitialSample] = useState<SampleData | null>(null);

  // When a sample is requested from content, reset the converter with that sample
  if (sampleToLoad && sampleToLoad !== initialSample) {
    setInitialSample(sampleToLoad);
    setKey((k) => k + 1);
    onSampleLoaded();
  }

  return <ConverterSectionControlled key={key} initialSample={initialSample} />;
}

// Controlled converter that can accept an initial sample
import { EditorPane } from '~/components/converter/EditorPane';
import { TokenStats } from '~/components/converter/TokenStats';
import { useConverter, type ConversionMode } from '~/hooks/useConverter';
import { useTokenCount } from '~/hooks/useTokenCount';

function ConverterSectionControlled({ initialSample }: { initialSample: SampleData | null }) {
  const { t } = useTranslation('converter');
  const { t: tc } = useTranslation('common');
  const [mode, setMode] = useState<ConversionMode>('json-to-toon');
  const [jsonFormatted, setJsonFormatted] = useState(true);

  // Helper to format JSON based on current formatting preference
  const formatJson = useCallback(
    (data: object, formatted: boolean) =>
      formatted ? JSON.stringify(data, null, 2) : JSON.stringify(data),
    []
  );

  // Initialize with default sample data so users see the conversion immediately
  const getDefaultInput = useCallback(
    (currentMode: ConversionMode, formatted: boolean = true) => {
      if (currentMode === 'json-to-toon') {
        return initialSample
          ? formatJson(initialSample.data, formatted)
          : formatJson(defaultJsonSample.data, formatted);
      } else {
        // Use the TOON representation from the default sample
        return defaultJsonSample.toon;
      }
    },
    [initialSample, formatJson]
  );

  const [input, setInput] = useState(() => getDefaultInput('json-to-toon', true));

  const { output, error } = useConverter(input, mode);
  const { inputTokens, outputTokens, saved, percentage, isNegative } = useTokenCount(input, output);

  const handleLoadSample = useCallback(
    (sample: SampleData) => {
      if (mode === 'json-to-toon') {
        setInput(formatJson(sample.data, jsonFormatted));
      } else {
        setInput(sample.toon);
      }
    },
    [mode, jsonFormatted, formatJson]
  );

  // Toggle between formatted and minified JSON
  const handleToggleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setInput(formatJson(parsed, !jsonFormatted));
      setJsonFormatted(!jsonFormatted);
    } catch {
      // Invalid JSON - just toggle the state without reformatting
      setJsonFormatted(!jsonFormatted);
    }
  }, [input, jsonFormatted, formatJson]);

  const handleModeChange = useCallback(
    (newMode: ConversionMode) => {
      setMode(newMode);
      // Reset to formatted when switching modes
      setJsonFormatted(true);
      setInput(getDefaultInput(newMode, true));
    },
    [getDefaultInput]
  );

  const inputLabel = mode === 'json-to-toon' ? t('labels.jsonInput') : t('labels.toonInput');
  const outputLabel = mode === 'json-to-toon' ? t('labels.toonOutput') : t('labels.jsonOutput');
  const inputPlaceholder =
    mode === 'json-to-toon' ? t('placeholders.jsonInput') : t('placeholders.toonInput');

  return (
    <section className="w-full">
      {/* Mode Toggle */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-lg p-1 bg-gray-100 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => handleModeChange('json-to-toon')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'json-to-toon'
                ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tc('modes.jsonToToon')}
          </button>
          <button
            type="button"
            onClick={() => handleModeChange('toon-to-json')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              mode === 'toon-to-json'
                ? 'bg-white dark:bg-gray-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            {tc('modes.toonToJson')}
          </button>
        </div>
      </div>

      {/* Token Stats */}
      <div className="mb-6">
        <TokenStats
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          saved={saved}
          percentage={percentage}
          isNegative={isNegative}
          mode={mode}
        />
      </div>

      {/* Editor Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <EditorPane
          label={inputLabel}
          value={input}
          onChange={setInput}
          placeholder={inputPlaceholder}
          showSamples
          sampleFormat={mode === 'json-to-toon' ? 'json' : 'toon'}
          onLoadSample={handleLoadSample}
          tokenCount={inputTokens}
          error={error}
          showFormatToggle={mode === 'json-to-toon'}
          isFormatted={jsonFormatted}
          onToggleFormat={handleToggleFormat}
        />
        <EditorPane
          label={outputLabel}
          value={output}
          readOnly
          placeholder={t('placeholders.output')}
          tokenCount={outputTokens}
        />
      </div>
    </section>
  );
}
