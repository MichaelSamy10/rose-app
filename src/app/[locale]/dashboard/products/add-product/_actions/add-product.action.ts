'use server';

import { redirect } from '@/i18n/navigation';
import { getToken } from '@/lib/utils/get-token';
import { getLocale } from 'next-intl/server';

export async function addProductAction(formData: FormData) {
  // Get token for authentication
  const jwt = await getToken();

  // Validate authentication
  if (!jwt?.accessToken) {
    return {
      error: 'You must be logged in to add a product',
    };
  }

  const locale = await getLocale();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt.accessToken}`,
      },
      body: formData,
    },
  );

  const payload = await res.json();

  if ('error' in payload) {
    throw new Error(
      payload.error ||
        payload.message ||
        'Failed to add product, try again later!',
    );
  }

  redirect({ href: '/dashboard/products', locale });
}
