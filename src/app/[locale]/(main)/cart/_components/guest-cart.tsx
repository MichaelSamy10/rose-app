import React from 'react';
import CartEmpty from './cart-empty';
import CartItem from './cart-item';
import ClearCartBtn from './clear-cart-btn';
import { useTranslations } from 'next-intl';
import { Cart } from '@/lib/types/cart';

export default function GuestCart({
  cartData,
}: {
  cartData: Cart;
}) {
  // translation
  const t = useTranslations('pages.cart');

  return (
    <div>
      {/* Cart Heading */}
      <div className="flex flex-row justify-between">
        <h2 className="text-5xl font-bold text-zinc-800 dark:text-zinc-50">
          {t('title')}
          <span className="ms-2 text-base font-medium text-zinc-400">
            {cartData?.cartItems?.length}
            {t('products')}
          </span>
        </h2>

        {/* Clear cart button */}
        <ClearCartBtn
          cartLength={cartData?.cartItems?.length}
        />
      </div>

      {/* Cart items */}
      <div className="mt-6 flex max-h-screen flex-col gap-4 overflow-auto rounded-xl border-2 border-zinc-200 p-5">
        {cartData?.cartItems?.length === 0 ? (
          <CartEmpty />
        ) : (
          cartData?.cartItems?.map(item => (
            <CartItem key={item._id} item={item} />
          ))
        )}
      </div>
    </div>
  );
}
