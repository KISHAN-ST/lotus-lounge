const SUPABASE_URL = 'https://xixrlokrxylxspqjpvtq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_tLfX5EE5rjYxAeO0b9X4nw_9LF2iSVg';

window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
