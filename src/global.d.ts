export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
      POKEMON_API_URL: string;
    };
  }
}