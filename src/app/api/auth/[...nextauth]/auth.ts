import { LoginResponse } from '@/lib/types/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
        rememberMe: {}, // include Remember Me
      },
      authorize: async credentials => {
        const response = await fetch(
          `${process.env.API_URL}/auth/signin`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          },
        );

        const payload: LoginResponse =
          await response.json();

        if ('error' in payload)
          throw new Error(payload.error as string);

        return {
          id: payload.user._id,
          accessToken: payload.token,
          user: payload.user,
          rememberMe: credentials?.rememberMe === 'true',
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
        // token.rememberMe = user.rememberMe; // store rememberMe
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;

      // persistent session only if rememberMe true
      // if (token.rememberMe !== true) {
      //   session.expires = new Date(0).toISOString();
      // }

      return session;
    },
  },
};
