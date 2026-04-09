const SUPABASE_URL = 'https://xixrlokrxylsxspqjpvtq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpeHJsb2tyeHlseHNwcWpwdnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NTA1MTksImV4cCI6MjA5MTMyNjUxOX0.alSE8QT_npouUv_qX61yKjO-zyrh2gX6W30dYaJXiu8';

window.SUPABASE_URL = SUPABASE_URL;
window.SUPABASE_ANON_KEY = SUPABASE_ANON_KEY;
window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
