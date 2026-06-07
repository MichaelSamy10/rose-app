'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoginFields } from '@/lib/types/auth';
import { Link } from '@/i18n/navigation';
import { loginSchema } from '@/lib/schemas/auth.schema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useLogin from '../hooks/use-login';
import {
  FormControl,
  FormItem,
  FormLabel,
  Form,
  FormField,
  FormMessage,
} from '@/components/ui/form';
import { useTranslations } from 'next-intl';

export default function LoginForm() {
  // ^ translation
  const t = useTranslations('pages.login.login-form');

  // ^ Mutation
  const { error, login, isPending } = useLogin();

  // ^ react-hook-form
  const form = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Function
  const handleLogin: SubmitHandler<LoginFields> = data => {
    login(data);
  };

  return (
    <Form {...form}>
      <form
        action=""
        className="w-full max-w-sm"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        <div className="space-y-6 *:w-full">
          <div className="space-y-2">
            {/* email input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('emailLabel')}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password input */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('passwordLabel')}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* forget password button */}
            <div className="flex w-full items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-maroon-700"
              >
                {t('forgotPassword')}
              </Link>
            </div>

            {/* remember me checkbox */}
            {/* <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox block h-4 w-4 border-zinc-300 text-maroon-600"
              />
              <span className="block text-zinc-800">
                {t('rememberMe')}
              </span>
            </label> */}
          </div>

          {/* global */}
          {error?.message && (
            <div className="border border-red-400 p-2 text-center">
              <p className="font-xl text-red-400">
                *{error?.message}
              </p>
            </div>
          )}

          <Button
            disabled={isPending}
            className="h-10 bg-maroon-600 text-white hover:bg-maroon-800"
          >
            {t('button')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
