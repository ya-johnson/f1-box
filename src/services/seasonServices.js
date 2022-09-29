import { supabase } from '../utils'


const getSeasonsList = async () => {
  const { data, error } = supabase.from('Seasons')
                                  .select('year')
  return data
}

const getSeasonSchedule = (year) => {
  const { data, error } = supabase.from('Races')
                                  .select('raceId, year, round, circuitId, name, date, time')
                                  .eq('year', year)
  return data
}

const getSeasonGrid = async (raceId) => {
  const { data, error } = supabase.from('Driver Standings')
                                  .select('Drivers(number, code, forename, surname), Constructors(name, nationality)')
                                  .eq('raceId', raceId)
  return data
}


export {
  getSeasonsList,
  getSeasonSchedule,
  getSeasonGrid
}