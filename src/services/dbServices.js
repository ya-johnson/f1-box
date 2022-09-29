import config from '../config'
import { supabase, datify } from '../utils'
import axios from 'axios'
import { raceService,
         resultService,
         qualifyService,
         lapService,
         pitService,
         standingsService,
         constructorService, 
         driverService,
         statusService } from '.'


const checkLastRace = async () => {
  const response = await axios.get(`${config.API_URL}/current/last/results.json?limit=1`)
  const resultsData  = await response.data.MRData.RaceTable
  const dbLastResult = await resultService.getLastResult()
  const race = await raceService.getRaceById(dbLastResult.raceId)
  return {
    offset: race.round,
    limit: resultsData.round - race.round,
    raceId: race.raceId
  }
}

const updateResults = async (raceId, round) => {
  const { resultId } = await resultService.getLastResultId()
  const rawResults = await resultService.getRawResults(raceId)
  const response = await axios.get(`${config.API_URL}/current/${round}/results.json`)
  const resultsData = await response.data.MRData.RaceTable.Races[0].Results
  const results = await Promise.all(resultsData.map( async (result, index) => {
    return {
      resultId: index + resultId + 1, 
      raceId,
      driverId: await driverService.getDriverId(result.Driver.driverId),
      constructorId: await constructorService.getConstructorId(result.Constructor.constructorId),
      number: result.number,
      grid: result.grid,
      position: result.position,
      positionText: result.positionText,
      positionOrder: result.position,
      points: result.points,
      laps: result.laps,
      time: result.Time ? result.Time.time : '/N',
      milliseconds: result.Time ? result.Time.millis : '/N',
      fastestLap: result.FastestLap.lap,
      rank: result.FastestLap.rank,
      fastestLapTime: result.FastestLap.Time.time,
      fastestLapSpeed: result.FastestLap.AverageSpeed.speed,
      status: await statusService.getStatusId(result.status)
    }
  })).then(resultsData)

  if (!rawResults) {
    const { data, error } = await supabase.from('Results')
                                          .upsert(results)
    return results
  } else {
    return false
  }
}

// can use this function if needed (what usage to constructor results ? )
const updateConstructorResults = async (results) => {
  if (results) {
    const constructorResults = []
    results.reduce((res, value) => {
      if (!res[value.constructorId]) {
        res[value.constructorId] = { raceId: value.raceId,
                                     constructorId: value.constructorId,
                                     points: 0,
                                     status: '/N' }
  
        constructorResults.push(res[value.constructorId])
      }
      res[value.constructorId].points += parseInt(value.points)
      return res
    }, {})
  
    const { data, error } = await supabase.from('Constructor Results')
                                          .upsert(constructorResults)
  }
}

const updateQualify = async (raceId, round) => {
  const { qualifyId } = await qualifyService.getLastQualifyId()
  const rawQaulify = await qualifyService.getRawQualify(raceId)
  const response = await axios.get(`${config.API_URL}/current/${round}/qualifying.json`)
  const qualifyData = await response.data.MRData.RaceTable.Races[0].QualifyingResults
  const qualify = await Promise.all(qualifyData.map( async (quali, index) => {
    return {
      qualifyId: index + qualifyId + 1,
      raceId,
      driverId: await driverService.getDriverId(quali.Driver.driverId),
      constructorId: await constructorService.getConstructorId(quali.Constructor.constructorId),
      number: quali.number,
      position: quali.position,
      q1: quali.Q1,
      q2: quali.Q2,
      q3: quali.Q3
    }
  })).then(qualifyData)

  if (!rawQaulify) {
    const { data, error } = supabase.from('Qualifying')
                                    .upsert(qualify)
  }
}

const updateLaps = async (raceId, round) => {
  const { lapId } = await lapService.getLastLapId()
  const rawLaps = await lapService.getRawLaps(raceId)
  const response = await axios.get(`${config.API_URL}/current/${round}/laps.json?limit=2000`)
  const lapsData = await response.data.MRData.RaceTable.Races[0].Laps
  const timings = lapsData.map(lap => [ ...timings ] = lap.Timings)
  const allLaps = timings.flat(Infinity)
  const laps = await Promise.all(allLaps.map( async (lap, index) => {
    return {
      lapId: index + lapId + 1,
      raceId,
      driverId: await driverService.getDriverId(lap.driverId),
      lap: index++,
      position: lap.position,
      time: lap.time,
      milliseconds: datify.convertToMillis(lap.time, 'minute')
    }
  })).then(allLaps)

  if (!rawLaps) {
    const { data, error } = supabase.from('Laps')
                                    .upsert(laps)
  }
}

const updatePits = async (raceId, round) => {
  const { pitId } = await pitService.getLastPitId()
  const rawPits = await pitService.getRawPits(raceId)
  const response = await axios.get(`${config.API_URL}/current/${round}/pitstops.json?limit=2000`)
  const pitsData = await response.data.MRData.RaceTable.Races[0].PitStops
  const pits = await Promise.all(pitsData.map( async (pit, index) => {
    return {
      pitId: index + pitId +1,
      raceId,
      driverId: await driverService.getDriverId(pit.driverId),
      stop: pit.stop,
      lap: pit.lap,
      time: pit.time,
      duaration: pit.duaration,
      // milliseconds: datify.convertToMillis(pit.duaration, 'second'),
    }
  }))

  if (!rawPits) {
    const { data, error } = supabase.from('Pits')
                                    .upsert(pits)
  }
}

const updateDriverStandings = async (raceId, round) => {
  const { driverStandingsId } = await standingsService.getLastDriverStandingsId()
  const rawDriverStandings = await standingsService.getRawDriverStandings(raceId)
  const response = await axios.get(`${config.API_URL}/current/${round}/driverStandings.json`)
  const driverStandingsData = await response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  const driverStandings = await Promise.all(driverStandingsData.map( async (driver, index) => {
    return {
      driverStandingsId: index + driverStandingsId + 1,
      raceId,
      driverId: await driverService.getDriverId(driver.Driver.driverId),
      points: driver.points,
      position: driver.position,
      positionText: driver.positionText,
      wins: driver.wins
    }
  })).then(driverStandingsData)

  if (!rawDriverStandings.length) {
    const { data, error } = await supabase.from('Driver Standings')
                                          .upsert(driverStandings)
  }
  console.log(!rawDriverStandings.length, driverStandingsId)
}

const updateConstructorStandings = async (raceId, round) => {
  const { constructorStandingsId } = await standingsService.getLastConstructorStandingsId()
  const rawConstructorStandings = await standingsService.getRawConstructorStandings(raceId)
  const response = await axios.get(`${config.API_URL}/current/${round}/constructorStandings.json`)
  const constructorStandingsData = await response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const constructorStandings = await Promise.all(constructorStandingsData.map( async (constructor, index) => {
    return {
      constructorStandingsId: index + constructorStandingsId + 1,
      raceId,
      constructorId: await constructorService.getConstructorId(constructor.Constructor.constructorId),
      points: constructor.points,
      position: constructor.position,
      positionText: constructor.positionText,
      wins: constructor.wins
    }
  })).then(constructorStandingsData)
  if (!rawConstructorStandings) {
    const { data, error } = supabase.from('Constructor Standings')
                                    .upsert(constructorStandings)
  }
}

const verifyDb = async () => {
  let { offset, limit, raceId } = await checkLastRace()
  
  if (limit) {
    for (let i=0; i < limit; i++) { 
      offset++
      raceId++
      // const results = await updateResults(raceId, offset)
      // await updateConstructorResults(results)
      // await updateQualify(raceId, offset)
      // await updateLaps(raceId, offset)
      // await updatePits(raceId, offset)
      await updateDriverStandings(raceId, offset)
      // await updateConstructorStandings(raceId, offset)
    }
  }

  return raceId
}


export {
  verifyDb
}