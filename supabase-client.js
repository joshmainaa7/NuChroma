// NuChroma — Supabase client
// Loaded as a module: <script type="module" src="supabase-client.js">

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://htnchtkawczlpgcpdnrx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh0bmNodGthd2N6bHBnY3BkbnJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQzMDk0NjEsImV4cCI6MjA5OTg4NTQ2MX0.DtSFte8eDI8CyMwOckE-qGaABIMpvlRsMcF6mMcJfH8";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
