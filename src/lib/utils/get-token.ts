'use server';

import { encode, JWT } from 'next-auth/jwt';
import { cookies } from 'next/headers';
// import { NEXTAUTH_COOKIE } from "../constants/auth.constant";

export async function setToken(jwt: JWT) {
  const encodedToken = await encode({
    token: jwt,
    secret: process.env.NEXTAUTH_SECRET!,
    maxAge: 7 * 24 * 60 * 60, // 7 days,
  });

  cookies().set(
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token',
    encodedToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
      sameSite: 'lax',
      expires: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ),
    },
  );
}
