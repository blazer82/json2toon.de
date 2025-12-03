import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export function TokenCalculator() {
  const { t } = useTranslation('calculator');
  const [jsonSize, setJsonSize] = useState<string>('1000');
  const [dataType, setDataType] = useState<'uniform' | 'mixed' | 'nested'>('uniform');

  const estimates = useMemo(() => {
    const size = parseInt(jsonSize) || 0;
    // Rough estimate: ~4 characters per token for JSON
    const jsonTokens = Math.round(size / 4);

    // Savings based on data type (vs minified JSON baseline)
    // Positive = savings, Negative = increase
    const savingsRates = {
      uniform: { min: 0.2, max: 0.35, avg: 0.27 },
      mixed: { min: -0.05, max: 0.15, avg: 0.05 },
      nested: { min: -0.2, max: -0.1, avg: -0.15 },
    };

    const rate = savingsRates[dataType];
    const minSaved = Math.round(jsonTokens * rate.min);
    const maxSaved = Math.round(jsonTokens * rate.max);
    const avgSaved = Math.round(jsonTokens * rate.avg);

    return {
      jsonTokens,
      toonTokensMin: jsonTokens - maxSaved,
      toonTokensMax: jsonTokens - minSaved,
      toonTokensAvg: jsonTokens - avgSaved,
      savedMin: minSaved,
      savedMax: maxSaved,
      savedAvg: avgSaved,
      percentageMin: Math.round(rate.min * 100),
      percentageMax: Math.round(rate.max * 100),
      percentageAvg: Math.round(rate.avg * 100),
    };
  }, [jsonSize, dataType]);

  return (
    <section className="py-16 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('title')}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('subtitle')}</p>

      <div className="max-w-2xl">
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {/* JSON Size Input */}
          <div>
            <label
              htmlFor="json-size"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('labels.jsonSize')}
            </label>
            <input
              id="json-size"
              type="number"
              value={jsonSize}
              onChange={(e) => setJsonSize(e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Data Type Select */}
          <div>
            <label
              htmlFor="data-type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              {t('labels.dataType')}
            </label>
            <select
              id="data-type"
              value={dataType}
              onChange={(e) => setDataType(e.target.value as 'uniform' | 'mixed' | 'nested')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="uniform">{t('options.uniform')}</option>
              <option value="mixed">{t('options.mixed')}</option>
              <option value="nested">{t('options.nested')}</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {estimates.jsonTokens.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('results.jsonTokens')}
              </div>
            </div>
            <div>
              <div
                className={`text-3xl font-bold ${
                  estimates.savedAvg >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {estimates.toonTokensAvg.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t('results.toonTokens')}
              </div>
            </div>
            <div>
              <div
                className={`text-3xl font-bold ${
                  estimates.savedAvg >= 0
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-amber-600 dark:text-amber-400'
                }`}
              >
                {estimates.savedAvg >= 0 ? '~' : '+'}
                {Math.abs(estimates.percentageAvg)}%
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {estimates.savedAvg >= 0 ? t('results.savings') : t('results.increase')}
              </div>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
            {estimates.savedAvg >= 0
              ? t('results.range', {
                  min: estimates.percentageMin,
                  max: estimates.percentageMax,
                })
              : t('results.increaseRange', {
                  min: Math.abs(estimates.percentageMax),
                  max: Math.abs(estimates.percentageMin),
                })}
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">{t('note')}</p>
      </div>
    </section>
  );
}
