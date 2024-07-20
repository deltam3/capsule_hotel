import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://dkhpnhdpniqygqzuhiga.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRraHBuaGRwbmlxeWdxenVoaWdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MzQ2OTQsImV4cCI6MjAyNTAxMDY5NH0.GWuJvmu3v9-X-NXZIsFt0hz1OvOJ-4nZaSCqCA98DgE";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
