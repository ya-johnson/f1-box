import { supabase } from '../utils'


const getLastResult = async () => {
  const { data, error } = await supabase.from('Results')
                                        .select('*')
                                        .limit(1)
                                        .order('resultId', { ascending: false })
  return data[0]
}

const getLastResults = async () => {
  const { data, error } = await supabase.from('Results')
                                        .select('*')
                                        .limit(20)
                                        .order('resultId', { ascending: false })
  return data[0]
}


export {
  getLastResult,
  getLastResults
}