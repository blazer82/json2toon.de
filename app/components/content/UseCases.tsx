import { useTranslation } from 'react-i18next';
import { samples, type SampleData } from '~/utils/samples';

interface UseCasesProps {
  onLoadSample: (sample: SampleData) => void;
}

const savingsColors = {
  high: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20',
  medium: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20',
  low: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20',
};

export function UseCases({ onLoadSample }: UseCasesProps) {
  const { t } = useTranslation('useCases');
  const { t: tc } = useTranslation('common');

  const savingsLabels = {
    high: tc('savings.high'),
    medium: tc('savings.medium'),
    low: tc('savings.low'),
  };

  return (
    <section className="py-16 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('title')}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('subtitle')}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {samples.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => onLoadSample(sample)}
            className="text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                {t(`samples.${sample.id}.name`)}
              </h3>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  savingsColors[sample.expectedSavings]
                }`}
              >
                {sample.expectedSavings}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {t(`samples.${sample.id}.description`)}
            </p>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
              {tc('buttons.tryIt')}
              <svg
                className="w-3 h-3 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Savings legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs">
        {(Object.keys(savingsLabels) as Array<keyof typeof savingsLabels>).map((key) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${savingsColors[key]}`}></span>
            <span className="text-gray-500 dark:text-gray-400">{savingsLabels[key]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
