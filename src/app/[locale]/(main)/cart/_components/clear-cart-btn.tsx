'use client';

import { Button } from '@/components/ui/button';
import { clearUserCartAction } from '@/lib/actions/clear-user-cart-action';
import { BrushCleaning } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';

export default function ClearCartBtn({
  cartLength,
}: {
  cartLength: number | undefined;
}) {
  // translation
  const t = useTranslations('pages.cart');

  // Hooks

  // Handlers
  const clearCartHandler = async () => {
    // Clear the user cart
    await clearUserCartAction();

    // Remove the cart from localStorage
    localStorage.removeItem('cart');

    // Refresh the page
    window.location.reload();
  };
  return (
    // Clear cart button
    <Button
      variant={'secondary'}
      disabled={cartLength == 0}
      className="text-sm font-semibold text-maroon-600 dark:text-maroon-400"
      onClick={() => clearCartHandler()}
    >
      <BrushCleaning size={20} />
      {t('clear-cart')}
    </Button>
  );
}
