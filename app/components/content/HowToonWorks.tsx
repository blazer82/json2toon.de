import { useTranslation } from 'react-i18next';

export function HowToonWorks() {
  const { t } = useTranslation('howItWorks');
  const features = t('features', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-16 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('title')}</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Explanation */}
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">{t('intro')}</p>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-gray-100">{feature.title}</strong> —{' '}
                  {feature.description}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>{t('warning.title')}</strong> {t('warning.text')}
            </p>
          </div>
        </div>

        {/* Visual Example */}
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('example.label')}
          </div>

          {/* JSON */}
          <div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {t('example.jsonLabel')}
            </div>
            <pre className="p-3 bg-gray-900 text-gray-100 rounded-lg text-xs overflow-x-auto">
              {`{
  "users": [
    {"id": 1, "name": "Alice", "role": "admin"},
    {"id": 2, "name": "Bob", "role": "user"},
    {"id": 3, "name": "Carol", "role": "user"}
  ]
}`}
            </pre>
          </div>

          {/* TOON */}
          <div>
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              {t('example.toonLabel')}
            </div>
            <pre className="p-3 bg-gray-900 text-emerald-400 rounded-lg text-xs overflow-x-auto">
              {`users[3]{id,name,role}:
1,Alice,admin
2,Bob,user
3,Carol,user`}
            </pre>
          </div>

          <div className="text-center text-sm text-emerald-600 dark:text-emerald-400 font-medium">
            {t('example.savings')}
          </div>
        </div>
      </div>
    </section>
  );
}
