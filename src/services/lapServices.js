import { supabase } from '../utils'


const getLastLapId = async () => {
  const { data, error } = await supabase.from('Laps')
                                        .select('lapId')
                                        .limit(1)
                                        .order('lapId', { ascending: true })
  return data[0]
}

const getRawLaps = async (raceId) => {
  const { data, error } = await supabase.from('Laps')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}

const getLaps = async (raceId) => {
  const { data, error } = await supabase.from('Laps')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}


export {
  getLastLapId,
  getRawLaps,
  getLaps
}