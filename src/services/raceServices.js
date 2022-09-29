import { supabase } from '../utils'


const getRaceById = async (raceId) => {
  const { data, error } = await supabase.from('Races')
                                        .select('raceId, year, round, Circuits(country), name, date, time')
                                        .eq('raceId', raceId)
  return data[0]
}


export {
  getRaceById,
}