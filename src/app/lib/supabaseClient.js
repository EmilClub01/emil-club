import { createClient } from '@supabase/supabase-js'

// REEMPLAZA ESTO CON TUS DATOS REALES DE SUPABASE
const supabaseUrl = 'https://ugpjajxbjrldzpzbvkle.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncGphanhianJsZHpwemJ2a2xlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Njk3MzIsImV4cCI6MjA3OTI0NTczMn0.Z_czb7j4d168HlgWS0gu7OZGvjl2dsVnWlxMQVfS7Ww'

export const supabase = createClient(supabaseUrl, supabaseKey)