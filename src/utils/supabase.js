import { createClient } from '@supabase/supabase-js'
import config from '../config'


const supabase = createClient(config.DB_URL, config.DB_KEY)


export default supabase