import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ldzfjooleyqmqshwmvzx.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkemZqb29sZXlxbXFzaHdtdnp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzMTkxMDAsImV4cCI6MjA2Nzg5NTEwMH0.JEbKet8ndeZNPb-aTAy71ebB0n4XedgYRznS76Rpe4Q"; // The long token you pasted earlier

export const supabase = createClient(supabaseUrl, supabaseKey);