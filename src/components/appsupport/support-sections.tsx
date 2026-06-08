import {
  Truck,
  RefreshCcw,
  ShieldCheck,
  Headphones,
  LucideIcon,
} from 'lucide-react';
import SupportInfo from './support-List';
import { useTranslations } from 'next-intl';

export interface SupportItem {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function SupportSection() {
  const t = useTranslations('pages.home');

  const supportText = t.raw('support');

  const icons = [
    Truck,
    RefreshCcw,
    ShieldCheck,
    Headphones,
  ];

  const SupportData = supportText.map(
    (item: SupportItem, index: number) => {
      return {
        id: index + 1,
        icon: icons[index],
        title: item.title,
        description: item.description,
      };
    },
  );

  return (
    <section className="m-auto rounded-2xl bg-maroon-50 p-10">
      <div className="mx-auto grid grid-cols-4 gap-6">
        {/* section data map */}
        {SupportData.map((item: SupportItem) => (
          <SupportInfo
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
