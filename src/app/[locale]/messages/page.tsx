import {
  getTranslations,
  getFormatter,
} from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import ToggleLang from '@/components/shared/toggle-lang';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  DollarSign,
  Calendar,
  List,
} from 'lucide-react';
import FormatExample from './_components/format-example';
import MessageItem from './_components/message-item';

export default async function MessagesPage({
  params: { locale },
}: {
  params: { locale: 'en' | 'ar' };
}) {
  setRequestLocale(locale);

  // Translations
  const t = await getTranslations();
  const format = await getFormatter();

  // Variables
  // Format examples
  const numberExamples = [
    {
      label: 'Integer',
      value: format.number(12345, 'integer'),
    },
    {
      label: 'Decimal',
      value: format.number(1234.567, 'decimal'),
    },
    {
      label: 'Short Price',
      value: format.number(1500, 'short-price'),
    },
    {
      label: 'Detailed Price',
      value: format.number(1234.567, 'detailed-price'),
    },
    {
      label: 'Short Percent',
      value: format.number(0.85, 'short-percent'),
    },
  ];

  const dateExamples = [
    {
      label: 'Detailed Date',
      value: format.dateTime(new Date(), 'detailed-date'),
    },
    {
      label: 'Detailed Time & Date',
      value: format.dateTime(
        new Date(),
        'detailed-time-date',
      ),
    },
  ];

  const listExamples = [
    {
      label: 'Conjunction',
      value: format.list(
        ['Apple', 'Banana', 'Orange'],
        'custom-conjunction',
      ),
    },
    {
      label: 'Disjunction',
      value: format.list(
        ['Red', 'Green', 'Blue'],
        'custom-disjunction',
      ),
    },
  ];

  // Sample translation messages
  const sampleMessages = [
    { key: 'common.loading', value: t('common.loading') },
    {
      key: 'common.actions.save',
      value: t('common.actions.save'),
    },
    {
      key: 'common.actions.cancel',
      value: t('common.actions.cancel'),
    },
    {
      key: 'common.labels.name',
      value: t('common.labels.name'),
    },
    {
      key: 'common.labels.email',
      value: t('common.labels.email'),
    },
    {
      key: 'common.labels.price',
      value: t('common.labels.price'),
    },
    {
      key: 'pages.home.testimonials.header.title',
      value: t('pages.home.testimonials.header.title'),
    },
    {
      key: 'pages.home.testimonials.header.description',
      value: t(
        'pages.home.testimonials.header.description',
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 font-sarabun dark:bg-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-800/80">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-maroon-600 dark:text-maroon-400" />
            <div>
              <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                Translation Messages
              </h1>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                View translation keys and formatted values
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ToggleLang />
            <Link href="/">
              <Button variant="outline" size="sm">
                {t('common.actions.back')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Format Examples Section */}
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Global Format Examples
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <FormatExample
              title="Number Formats"
              icon={DollarSign}
            >
              {numberExamples.map(example => (
                <div
                  key={example.label}
                  className="flex items-center justify-between rounded bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
                >
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {example.label}:
                  </span>
                  <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {example.value}
                  </span>
                </div>
              ))}
            </FormatExample>

            <FormatExample
              title="Date & Time Formats"
              icon={Calendar}
            >
              {dateExamples.map(example => (
                <div
                  key={example.label}
                  className="flex items-center justify-between rounded bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
                >
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {example.label}:
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {example.value}
                  </span>
                </div>
              ))}
            </FormatExample>

            <FormatExample title="List Formats" icon={List}>
              {listExamples.map(example => (
                <div
                  key={example.label}
                  className="flex items-center justify-between rounded bg-zinc-50 px-3 py-2 dark:bg-zinc-900"
                >
                  <span className="text-xs text-zinc-600 dark:text-zinc-400">
                    {example.label}:
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {example.value}
                  </span>
                </div>
              ))}
            </FormatExample>
          </div>
        </section>

        {/* Sample Messages Section */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Sample Translation Messages
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sampleMessages.map(msg => (
              <MessageItem
                key={msg.key}
                messageKey={msg.key}
                value={msg.value}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
