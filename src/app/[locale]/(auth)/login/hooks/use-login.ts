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
      const response = await signIn('credentials', {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(location.search).get(
          'callbackUrl',
        ) || '/';

      return (location.href = callbackUrl);
    },
  });
  return {
    error,
    login,
    isPending,
  };
}
