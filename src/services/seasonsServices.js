import { supabase } from '../utils'
import raceService from './raceServices'


const getSeasonsList = async () => {
  const { data, error } = supabase.from('Seasons')
                                  .select('year')
  return data
}

const getSeasonSchedule = (year) => {
  const { data, error } = supabase.from('Races')
                                  .select('year, round, circuitId, name, date, time')
                                  .eq('year', year)
  return data
}

const getSeasonGrid = async (year) => {
  const seasonFirstRace = await raceService.getSeasonFirstRace(year)
  const { data, error } = supabase.from('Results')
                                  .select('Drivers(number, code, forename, surname), Constructors(name, nationality)')
                                  .eq('raceId', seasonFirstRace)
  return data
}


export {
  getSeasonsList,
  getSeasonSchedule,
  getSeasonGrid
}