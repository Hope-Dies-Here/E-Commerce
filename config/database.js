const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// const supabase = createClient(supabaseUrl, supabaseKey);

let supabase 

try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log("database connected")
} catch (error) {
    console.log("Database connection error", error)
}

module.exports = supabase
