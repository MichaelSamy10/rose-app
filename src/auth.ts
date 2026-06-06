import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { LoginResponse } from './lib/types/auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
          {
            method: 'POST',
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const payload: APIResponse<LoginResponse> =
          await response.json();
        if ('error' in payload) {
          throw new Error(payload.error);
        }
        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user?.accessToken;
        token.user = user?.user;
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
};
