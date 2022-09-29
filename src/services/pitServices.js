import { supabase } from '../utils'


const getLastPitId = async () => {
  const { data, error } = await supabase.from('Pits')
                                        .select('pitId')
                                        .limit(1)
                                        .order('pitId', { ascending: true })
  return data[0]
}

const getRawPits = async (raceId) => {
  const { data, error } = await supabase.from('Pits')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}

const getPits = async (raceId) => {
  const { data, error } = await supabase.from('Pits')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}


export {
  getLastPitId,
  getRawPits,
  getPits
}