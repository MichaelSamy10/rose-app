import { cardDetails } from './card-Items';
import RoseCard from './card-sections';

export default function OccasionsSection() {
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
