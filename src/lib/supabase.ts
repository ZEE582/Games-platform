import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://jndltmtqsgusmietdeya.supabase.co",
  "YOUR_ANON_KEY"
);
