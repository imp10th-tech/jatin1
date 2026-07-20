import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: { persistSession: false },
});

export type Complaint = {
  id: string;
  display_name: string | null;
  complaint: string;
  severity: string;
  reactions: Record<string, number>;
  status: string;
  created_at: string;
};
