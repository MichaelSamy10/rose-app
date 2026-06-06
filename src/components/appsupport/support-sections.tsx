import { SupportData } from './support-Items';
import SupportInfo from './support-List';

export default function SupportSection() {
  return (
    <section className="m-auto rounded-2xl bg-maroon-50 p-10">
      <div className="mx-auto grid grid-cols-4 gap-6">
        {/* section data map */}
        {SupportData.map(item => (
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
