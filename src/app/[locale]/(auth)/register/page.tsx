import DecoratedText from '@/components/features/auth/decorated-text';
import React from 'react';
import RegisterForm from './_components/register-form';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function RegisterPage() {
  // Translations
  const t = useTranslations('pages.register');

  return (
    <div className="register-content">
      <DecoratedText text="register" className="mb-4" />
      <RegisterForm />
      <p className="mt-5 text-center text-sm font-medium text-zinc-800 rtl:font-tajawal">
        {t.rich('have-account', {
          Link: (chunks: string) => (
            <Link
              href="/login"
              className="text-maroon-700 duration-300 hover:text-maroon-800"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
