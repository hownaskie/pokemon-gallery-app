import { createClient } from '@supabase/supabase-js';

const supabaseUrl = window.__RUNTIME_CONFIG__.SUPABASE_URL;
const supabaseKey = window.__RUNTIME_CONFIG__.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase