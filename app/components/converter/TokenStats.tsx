import { useTranslation } from 'react-i18next';

interface TokenStatsProps {
  inputTokens: number;
  outputTokens: number;
  saved: number;
  percentage: number;
  isNegative: boolean;
  mode: 'json-to-toon' | 'toon-to-json';
}

export function TokenStats({
  inputTokens,
  outputTokens,
  saved,
  percentage,
  isNegative,
  mode,
}: TokenStatsProps) {
  const { t } = useTranslation('converter');
  const inputLabel = mode === 'json-to-toon' ? t('labels.jsonTokens') : t('labels.toonTokens');
  const outputLabel = mode === 'json-to-toon' ? t('labels.toonTokens') : t('labels.jsonTokens');

  const hasData = inputTokens > 0;

  return (
    <div className="flex items-center justify-center gap-6 py-4 px-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {/* Input tokens */}
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {inputTokens.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {inputLabel}
        </div>
      </div>

      {/* Arrow */}
      <div className="text-gray-400 dark:text-gray-500">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </div>

      {/* Output tokens */}
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {outputTokens.toLocaleString()}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
          {outputLabel}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-10 bg-gray-300 dark:bg-gray-600" />

      {/* Savings */}
      <div className="text-center">
        {hasData ? (
          <>
            <div
              className={`text-2xl font-bold ${
                isNegative
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {isNegative ? '+' : '-'}
              {Math.abs(percentage)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {isNegative ? t('stats.increase') : t('stats.saved')}
            </div>
            {isNegative && mode === 'json-to-toon' && (
              <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                {t('stats.warning')}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-2xl font-bold text-gray-400 dark:text-gray-500">--%</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {t('stats.savings')}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
