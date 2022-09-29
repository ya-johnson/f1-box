import { supabase } from '../utils'


const getLastDriverStandingsId = async () => {
  const { data, error} = await supabase.from('Driver Standings')
                                        .select('driverStandingsId')
                                        .limit(1)
                                        .order('driverStandingsId', { ascending: false })
  return data[0]
}

const getLastConstructorStandingsId = async () => {
  const { data, error} = await supabase.from('Constructor Standings')
                                        .select('constructorStandingsId')
                                        .limit(1)
                                        .order('constructorStandingsIdId', { ascending: false })
  return data[0]
}

const getRawDriverStandings = async (raceId) => {
  const { data, error } = await supabase.from('Driver Standings')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}

const getRawConstructorStandings = async (raceId) => {
  const { data, error } = await supabase.from('Constructor Standings')
                                        .select('*')
                                        .eq('raceId', raceId)
  return data
}

const getDriverStandings = async (raceId) => {
  const { data, error } = await supabase.from('Driver Standings')
                                        .select(`Races(round),
                                                 Drivers(forename, surname),
                                                 position, wins, points`)
                                        .eq('raceId', raceId)
  return data
}

const getConstructorStandings = async (raceId) => {
  const { data, error } = await supabase.from('Constructor Standings')
                                        .select(`Races(round),
                                                 Constructors(name),
                                                 position, wins, points`)
                                        .eq('raceId', raceId)
  return data
}


export {
  getLastDriverStandingsId,
  getLastConstructorStandingsId,
  getRawDriverStandings,
  getRawConstructorStandings,
  getDriverStandings,
  getConstructorStandings
}