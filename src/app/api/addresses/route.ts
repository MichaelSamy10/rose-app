import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req });

    const res = await fetch(
      `${process.env.API_URL}/addresses`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token?.accessToken}`,
        },
      },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch addresses' },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
