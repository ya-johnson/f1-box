import { supabase } from '../utils'


const getLastQualiId = async () => {
  const { data, error } = await supabase.from('Qualifying')
                                        .select('qualifyId')
                                        .limit(1)
                                        .order('qualifyId', { ascending: true })
  return data[0]
}

const getRawQuali = async (raceId) => {
  const { data, error } = await supabase.from('Laps')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}

const getQuali = async (raceId) => {
  const { data, error } = await supabase.from('Qualifying')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}


export {
  getLastQualiId,
  getRawQuali,
  getQuali
}