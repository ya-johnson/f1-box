import { supabase } from '../utils'


const getLastResultId = async () => {
  const { data, error } = await supabase.from('Results')
                                        .select('resultId')
                                        .limit(1)
                                        .order('resultId', { ascending: false })
  return data[0]
}

const getLastResult = async () => {
  const { data, error } = await supabase.from('Results')
                                        .select('*')
                                        .limit(1)
                                        .order('resultId', { ascending: false })
  return data[0]
}

const getRawResults = async (raceId) => {
  const { data, error } = await supabase.from('Results')
                                        .select(`*`)
                                        .eq('raceId', raceId)
  return data
}

const getResults = async (raceId) => {
  const { data, error } = await supabase.from('Results')
                                        .select(`Drivers(forename, surname),
                                                 number, position, points, time`)
                                        .eq('raceId', raceId)
  return data
}


export {
  getLastResultId,
  getLastResult,
  getRawResults,
  getResults
}