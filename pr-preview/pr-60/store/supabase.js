// supabase.js
// Initialize Supabase Client

const SUPABASE_URL = 'https://alfszmccbxndsrronyfe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_0pylFOnLWSPB7M2tudQU_w_eYPSc9FQ';

window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
