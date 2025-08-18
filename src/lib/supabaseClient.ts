import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types'; // generate types with supabase gen types

function reportMissingEnv(name: string, value: string | undefined) {
  if (!value) {
    console.error(`Missing required env variable: ${name}`);
  }
}

export const supabaseClient = () => {
  reportMissingEnv('NEXT_PUBLIC_SUPABASE_URL', process.env.NEXT_PUBLIC_SUPABASE_URL);
  reportMissingEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  return createClientComponentClient<Database>();
};
