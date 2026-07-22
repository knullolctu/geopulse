import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://osyezzrxayqwksmwjikf.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_26P1ZTgbvtoxkGs5nMr6vQ_mINxq3uu'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
