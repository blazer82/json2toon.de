import { useTranslation } from 'react-i18next';

interface ComparisonRow {
  dataType: string;
  example: string;
  savings: string;
  notes: string;
}

const savingsClasses: Record<string, string> = {
  '40-60%': 'text-emerald-600 dark:text-emerald-400',
  '30-50%': 'text-emerald-600 dark:text-emerald-400',
  '20-35%': 'text-blue-600 dark:text-blue-400',
  '10-25%': 'text-blue-600 dark:text-blue-400',
  '0-15%': 'text-amber-600 dark:text-amber-400',
  '5-15%': 'text-amber-600 dark:text-amber-400',
};

export function ComparisonTable() {
  const { t } = useTranslation('comparison');
  const rows = t('rows', { returnObjects: true }) as ComparisonRow[];

  return (
    <section className="py-16 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{t('title')}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">{t('subtitle')}</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                {t('headers.dataType')}
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                {t('headers.example')}
              </th>
              <th className="text-center py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                {t('headers.savings')}
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                {t('headers.notes')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {rows.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="py-3 px-4 font-medium text-gray-900 dark:text-gray-100">
                  {row.dataType}
                </td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{row.example}</td>
                <td
                  className={`py-3 px-4 text-center font-medium ${savingsClasses[row.savings] || 'text-gray-600'}`}
                >
                  {row.savings}
                </td>
                <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
          {t('recommendation.title')}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{t('recommendation.text')}</p>
      </div>
    </section>
  );
}
