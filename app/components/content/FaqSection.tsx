import { useTranslation } from 'react-i18next';
import { Accordion, AccordionItem } from '~/components/ui/Accordion';

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection() {
  const { t } = useTranslation('faq');
  const faqs = t('items', { returnObjects: true }) as FaqItem[];

  return (
    <section className="py-16 border-t border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">{t('title')}</h2>

      <div className="max-w-3xl">
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} title={faq.question}>
              <p className="leading-relaxed">{faq.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
