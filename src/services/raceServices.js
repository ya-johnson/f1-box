import { supabase } from '../utils'
// results, quali, laps, pits


const getRaceById = async (raceId) => {
  const { data, error } = await supabase.from('Races')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data[0]
}






export {
  getRaceById,

}