import { cookies } from 'next/headers';
import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types';

function reportMissingEnv(name: string) {
  if (!process.env[name]) {
    console.error(`Missing required env variable: ${name}`);
  }
}

export const supabaseServer = () => {
  reportMissingEnv('NEXT_PUBLIC_SUPABASE_URL');
  reportMissingEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  return createServerComponentClient<Database>({ cookies });
};
export const supabaseRoute = () => {
  reportMissingEnv('NEXT_PUBLIC_SUPABASE_URL');
  reportMissingEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  return createRouteHandlerClient<Database>({ cookies });
};
