import { NextResponse, type NextRequest } from 'next/server';
import { supabaseRoute } from '@/lib/supabaseServer';

interface AuthCallbackParams {
  code?: string;
  token_hash?: string;
  type?: 'signup' | 'magiclink' | 'recovery';
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const params: AuthCallbackParams = {
    code: url.searchParams.get('code') ?? undefined,
    token_hash: url.searchParams.get('token_hash') ?? undefined,
    type: (url.searchParams.get('type') as AuthCallbackParams['type']) ?? undefined,
  };

  const supabase = supabaseRoute();

  try {
    if (params.code) {
      const { error } = await supabase.auth.exchangeCodeForSession(params.code);
      if (error) throw error;
    } else if (params.token_hash && params.type) {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: params.token_hash,
        type: params.type,
      });
      if (error) throw error;
    } else {
      throw new Error('Missing authentication code.');
    }
    return NextResponse.redirect(`${url.origin}/dashboard`);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Auth callback failed:', message);
    return new NextResponse(
      `<main style="font-family: sans-serif; padding: 2rem; text-align: center;">
        <h1 style="font-size: 1.5rem; margin-bottom: 1rem;">Authentication Error</h1>
        <p style="margin-bottom: 1rem;">${message}</p>
        <a href="/" style="color: blue; text-decoration: underline;">Try again</a>
      </main>`,
      {
        status: 400,
        headers: { 'content-type': 'text/html' },
      },
    );
  }
}

/*
Minimal integration test hint:
- Mock supabaseRoute().auth.exchangeCodeForSession to resolve/throw.
- Call GET(new Request('https://example.com/auth/callback?code=abc')).
- Assert redirect location on success and HTML body on failure.
*/
