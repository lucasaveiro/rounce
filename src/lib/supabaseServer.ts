import { cookies } from 'next/headers';
import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types';

export const supabaseServer = () => createServerComponentClient<Database>({ cookies });
export const supabaseRoute = () => createRouteHandlerClient<Database>({ cookies });