import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from './types'; // generate types with supabase gen types

export const supabaseClient = () => createClientComponentClient<Database>();