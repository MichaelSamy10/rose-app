import { useTranslations } from 'next-intl';
import RoseCard from './card-sections';

export default function OccasionsSection() {
  // Translations
  const t = useTranslations('pages.home.occasions');

  const cardDetails = [
    {
      id: 1,
      image: '/images/WeddingCard.png',
      header: t('wedding.header'),
      details: t('wedding.details'),
    },
    {
      id: 2,
      image: '/images/EngagementCard.png',
      header: t('engagement.header'),
      details: t('engagement.details'),
    },
    {
      id: 3,
      image: '/images/AnniversaryCard.png',
      header: t('anniversary.header'),
      details: t('anniversary.details'),
    },
  ];

  return (
    <section className="mx-auto mb-10 mt-6 flex justify-center">
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {/* card data Map */}
        {cardDetails.map(item => (
          <RoseCard
            key={item.id}
            image={item.image}
            header={item.header}
            details={item.details}
          />
        ))}
      </div>
    </section>
  );
}
