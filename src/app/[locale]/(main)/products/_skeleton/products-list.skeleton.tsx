import ProductItemSkeleton from '../../../../../components/skeleton/product-item.skeleton';

export default function ProductsListSkeleton() {
  return (
    <div className="products-list-skeleton grid w-11/12 grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => {
        return (
          <ProductItemSkeleton
            key={i}
            divCustomClasses="w-full"
            imgCustomClasses="h-72"
          />
        );
      })}
    </div>
  );
}
