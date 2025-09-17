const isClient = typeof window !== "undefined";

export const RUNTIME_CONFIG = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || (isClient ? window.__RUNTIME_CONFIG__.SUPABASE_URL : ""),
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || (isClient ? window.__RUNTIME_CONFIG__.SUPABASE_ANON_KEY : ""),
  POKEMON_API_URL: import.meta.env.VITE_POKEMON_API_URL || (isClient ? window.__RUNTIME_CONFIG__.POKEMON_API_URL : ""),
};

if (!RUNTIME_CONFIG.SUPABASE_URL || !RUNTIME_CONFIG.SUPABASE_ANON_KEY) {
  console.error("Supabase config is invalid:", RUNTIME_CONFIG);
  throw new Error("Supabase config is required!");
}