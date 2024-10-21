
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vhvmemgjiugzmyxtktgb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZodm1lbWdqaXVnem15eHRrdGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzNTQzNTksImV4cCI6MjA0NDkzMDM1OX0.-GWbf-e6-YWbveMZ8htGucnD1U6JD5a14dVp9BRQ9UA'
export const supabase = createClient(supabaseUrl, supabaseKey);
export const storageURL = supabaseUrl + '/storage/v1/object/public/';

