import { createClient } from '@supabase/supabase-js'

// REEMPLAZA ESTO CON TUS DATOS REALES DE SUPABASE
const supabaseUrl = 'https://ufrsbqazfezkxgwhgarb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmcnNicWF6ZmV6a3hnd2hnYXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwODUyMjgsImV4cCI6MjA3OTY2MTIyOH0.M6KMefsNMibHStkxM3b9UVqXzOmYLm0FxE1AYA4FbHY'

export const supabase = createClient(supabaseUrl, supabaseKey)