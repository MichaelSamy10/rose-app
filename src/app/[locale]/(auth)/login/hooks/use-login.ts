import { LoginFields } from '@/lib/types/auth';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'next-auth/react';

export default function useLogin() {
  // ^ Mutation
  const {
    error,
    mutate: login,
    isPending,
  } = useMutation({
    mutationFn: async (credentials: LoginFields) => {
      const callbackUrl =
        new URLSearchParams(location.search).get(
          'callbackUrl',
        ) || `/${location.pathname.split('/')[1] || 'en'}`;

      const response = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
        callbackUrl,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: data => {
      const callbackUrl =
        new URLSearchParams(location.search).get(
          'callbackUrl',
        ) || `/${location.pathname.split('/')[1] || 'en'}`;

      return (location.href =
        typeof data?.url === 'string'
          ? data.url
          : callbackUrl);
    },
  });
  return {
    error,
    login,
    isPending,
  };
}
