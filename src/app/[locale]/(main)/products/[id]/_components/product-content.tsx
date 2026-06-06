'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types/product';
import {
  HeartMinus,
  HeartPlus,
  Package,
  ShoppingCart,
  Star,
} from 'lucide-react';
import useAddCart from '../_hooks/use-add-cart';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils/tailwind-merge';
import { useTranslations } from 'next-intl';
import { CartItem } from '@/lib/types/cart';
import { useAddToWishlist } from '@/hooks/use-add-to-wishlist';
import useRemoveFromWishlist from '@/hooks/use-remove-from-wishlist';
import { localWishlist } from '@/lib/utils/local-wishlist';

type ProductContentProps = {
  product: Product;
};

export default function ProductContent({
  product,
}: ProductContentProps) {
  // Translation
  const t = useTranslations('pages.product-details');
  const commonT = useTranslations('common');

  // States
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { status } = useSession();

  // Mutation
  const { addToCart } = useAddCart();
  const { addToWishlist } = useAddToWishlist();
  const { removeFromWishlist } = useRemoveFromWishlist();

  // Variables
  const isLoggedIn = status === 'authenticated';

  // Handlers
  const addToCartHandler = () => {
    // if user not logged in
    if (!isLoggedIn) {
      const storedCart = localStorage.getItem('cart');
      let cartData = JSON.parse(storedCart || '[]');

      // Initialize structure if invalid or missing
      if (
        !cartData ||
        !cartData.cart ||
        !Array.isArray(cartData.cart.cartItems)
      ) {
        cartData = {
          cart: {
            cartItems: [],
          },
        };
      }

      const existingProductIndex =
        cartData.cart.cartItems.findIndex(
          (item: CartItem) =>
            item.product._id === product._id,
        );

      if (existingProductIndex !== -1) {
        // Product already exists → increase quantity only
        cartData.cart.cartItems[
          existingProductIndex
        ].quantity += 1;
      } else {
        // New product → add it
        cartData.cart.cartItems.push({
          product: product,
          quantity: 1,
          // _id: Math.random().toString(36).substr(2, 9),
          // price: product.price,
        });
      }

      // save cart to local storage
      localStorage.setItem(
        'cart',
        JSON.stringify(cartData),
      );
      toast.success(t('toast-added'));

      return;
    }
    addToCart(
      { product: product, quantity: 1 },
      {
        onSuccess: () => {
          toast.success(t('toast-added'));
        },
      },
    );
  };

  // Wishlist Handler
  const toggleWishlistHandler = () => {
    if (isLoggedIn) {
      if (isWishlisted) {
        removeFromWishlist(product._id);
      } else {
        addToWishlist(product._id);
      }
    }

    localWishlist({
      state: isWishlisted,
      productId: product._id,
      t: commonT,
    });
    setIsWishlisted(prev => !prev);
  };

  // Effects
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (!storedCart) return;

    const guestCart = JSON.parse(storedCart);

    // if cart is not empty
    if (
      isLoggedIn &&
      guestCart?.cart?.cartItems?.length > 0
    ) {
      // if user logged in, add all cart items to the database
      guestCart.cart.cartItems.forEach((item: CartItem) => {
        addToCart({
          product: item.product,
          quantity: item.quantity,
        });
      });
      localStorage.removeItem('cart');
    }
  }, [isLoggedIn, addToCart]);

  useEffect(() => {
    const wishlist = localStorage.getItem('wishlist');
    if (wishlist?.includes(product._id)) {
      setIsWishlisted(true);
    }
  }, [product._id]);

  return (
    <div className="flex w-1/2 flex-col">
      {/* Header */}
      <div className="border-b-2 border-b-zinc-100 pb-4 text-3xl font-semibold text-zinc-800 dark:border-b-zinc-700 dark:text-zinc-50">
        {/* Product Title */}
        <h1>{product.title}</h1>

        {/* Price Details */}
        <div className="mt-2 flex flex-row gap-3">
          <div className="flex flex-row items-center gap-2">
            {/* Price */}
            <span className="text-zinc-300 line-through dark:text-zinc-500">
              {product.price}
            </span>
            {/* Price after discount */}
            <p className="flex flex-row items-center gap-1">
              {product.priceAfterDiscount}
              <span className="self-end text-xl font-medium">
                {t('currency')}
              </span>
            </p>
          </div>

          {/* Quantity left in stock */}
          {product.quantity < 0 ? (
            <p className="flex items-center justify-center gap-1 rounded-2xl bg-red-50 px-3 py-1 text-sm text-red-600">
              <Package size={20} />
              {t('stock-empty')}
            </p>
          ) : (
            <p className="flex items-center justify-center gap-1 rounded-2xl bg-zinc-100 px-3 py-1 text-sm dark:bg-zinc-700">
              <Package
                size={20}
                className="text-zinc-500"
              />
              {product.quantity} {t('stock-left')}
            </p>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="mt-4 flex flex-row items-center gap-3 border-b-2 border-b-zinc-100 pb-4 dark:border-b-zinc-700">
        <Star
          fill="orange"
          stroke="orange"
          strokeWidth={2}
          size={20}
        />
        {t('rating')}
        <span className="font-medium">
          {product.rateAvg}/5
        </span>
        <span className="font-medium text-blue-600 dark:text-blue-400">
          ({product.rateCount} {t('rating-number')})
        </span>
      </div>

      {/* Description */}
      <p className="mt-4 h-72 overflow-auto leading-none text-zinc-600 dark:text-zinc-400">
        {product.description}
      </p>

      {/* Buttons */}
      <div className="mt-4 flex gap-2">
        {/* Add to wishlist Button */}
        <Button
          onClick={toggleWishlistHandler}
          variant={'subtle'}
          className={cn(
            `dark:border-1 w-12 border-none px-4 py-2 dark:border-solid dark:border-zinc-500`,
            isWishlisted
              ? 'bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:text-maroon-200 dark:hover:bg-zinc-800'
              : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800',
          )}
        >
          {isWishlisted ? (
            <HeartMinus size={25} />
          ) : (
            <HeartPlus size={25} />
          )}
        </Button>

        {/* Add to cart Button */}
        <Button
          className="flex-1 font-medium"
          onClick={addToCartHandler}
          disabled={product.quantity < 0}
        >
          <ShoppingCart size={25} /> {t('add-cart-btn')}
        </Button>
      </div>
    </div>
  );
}
