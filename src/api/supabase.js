import { createClient } from "@supabase/supabase-js";
const url = 'https://jhbwynfypxidtbghkswh.supabase.co'
const pub_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoYnd5bmZ5cHhpZHRiZ2hrc3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU4NzY1MDUsImV4cCI6MTk4MTQ1MjUwNX0.UagkY4-uGcteinrbobKeOVIh8FSg8DBG8CkzOLgBb1w'
export const supabase = createClient(url, pub_key)
