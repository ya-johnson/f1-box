import config from '../config'
import { supabase, datify } from '../utils'
import axios from 'axios'
import { resultService,
         raceService, 
         constructorService, 
         driverService,
         statusService } from '.'


const checkLastRace = async () => {
  const response = await axios.get(`${config.API_URL}/current/last/results.json?limit=1`)
  const lastRaceResults  = await response.data.MRData.RaceTable
  const dbLastResult = await resultService.getLastResult()
  const race = await raceService.getRaceById(dbLastResult.raceId)
  return {
    offset: race.round,
    limit: lastRaceResults.round - race.round,
    raceId: race.raceId
  }
}

const updateResults = async (raceId, round) => {
  const response = await axios.get(`${config.API_URL}/current/${round}/results.json`)
  const resultsData = await response.data.MRData.RaceTable.Races[0].Results
  const results = await Promise.all(resultsData.map( async result => {
    return {
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
  // console.log(resultsData, round)
  // console.log(results)
  // const { data, error } = await supabase.from('Results')
  //                                       .insert(results)
  return results
}

const updateConstructorResults = async (results) => {
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
  // console.log(constructorResults)

  // const { data, error } = await supabase.from('COnstructor Results')
  //                                       .insert(consttructorResults)
}

const updateQuali = async (raceId, round) => {
  const response = await axios.get(`${config.API_URL}/current/${round}/qualifying.json`)
  const qualiResultsData = await response.data.MRData.RaceTable.Races[0].QualifyingResults
  const qualiResults = await Promise.all(qualiResultsData.map( async result => {
    return {
      raceId,
      driverId: await driverService.getDriverId(result.Driver.driverId),
      constructorId: await constructorService.getConstructorId(result.Constructor.constructorId),
      number: result.number,
      position: result.position,
      q1: result.Q1,
      q2: result.Q2,
      q3: result.Q3
    }
  })).then(qualiResultsData)

  // const { data, error } = supabase.from('Qualifying')
  //                                 .insert(qualiResults)
}

const updateLaps = async (raceId, round) => {
  const response = await axios.get(`${config.API_URL}/current/${round}/laps.json?limit=2000`)
  const lapsData = await response.data.MRData.RaceTable.Races[0].Laps
  const timings = lapsData.map(lap => [ ...timings ] = lap.Timings)
  const allLaps = timings.flat(Infinity)
  const laps = await Promise.all(allLaps.map( async (lap, index) => {
    return {
      raceId,
      driverId: await driverService.getDriverId(lap.driverId),
      lap: index++,
      position: lap.position,
      time: lap.time,
      milliseconds: datify.convertToMillis(lap.time, 'minute')
    }
  })).then(allLaps)
  // console.log(laps)
  // const { data, error } = supabase.from('Laps')
  //                                 .insert([{ results }])
}

const updatePits = async (raceId, round) => {
  const response = await axios.get(`${config.API_URL}/current/${round}/pitstops.json?limit=2000`)
  const pitsData = await response.data.MRData.RaceTable.Races[0].PitStops
  const pits = await Promise.all(pitsData.map( async pit => {
    // console.log(pit.duaration)
    return {
      raceId,
      driverId: await driverService.getDriverId(pit.driverId),
      stop: pit.stop,
      lap: pit.lap,
      time: pit.time,
      duaration: pit.duaration,
      // milliseconds: datify.convertToMillis(pit.duaration, 'second'),
    }
  }))
  // console.log(pitsData)
  // const { data, error } = supabase.from('Pits')
  //                                 .insert([{ results }])
}

const updateDriverStandings = async (raceId, round) => {
  const response = await axios.get(`${config.API_URL}/current/${round}/driverStandings.json`)
  const driverStandingsData = await response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  const driverStandings = await Promise.all(driverStandingsData.map( async driver => {
    return {
      raceId,
      driverId: await driverService.getDriverId(driver.Driver.driverId),
      points: driver.points,
      position: driver.position,
      positionText: driver.positionText,
      wins: driver.wins
    }
  })).then(driverStandingsData)

  console.log(driverStandings)

  const { data, error } = await supabase.from('Driver Standings')
                                        .insert([driverStandings[0]], {upsert: true})
  console.log(data,error)
}

const updateConstructorStandings = async (raceId, round) => {
  const response = await axios.get(`${config.API_URL}/current/${round}/constructorStandings.json`)
  const constructorStandingsData = await response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const constructorStandings = await Promise.all(constructorStandingsData.map( async constructor => {
    return {
      raceId,
      constructorId: await constructorService.getConstructorId(constructor.Constructor.constructorId),
      points: constructor.points,
      position: constructor.position,
      positionText: constructor.positionText,
      wins: constructor.wins
    }
  })).then(constructorStandingsData)
  // console.log(constructorStandings)
  // const { data, error } = supabase.from('Constructor Standings')
  //                                 .insert(constructorStandings)
}

const verifyDb = async () => {
  const { offset, limit, raceId } = await checkLastRace()

  if (limit) {
    for (let i=0; i < limit; i++) { 
      offset++
      raceId++
      const results = await updateResults(raceId, offset)
      await updateConstructorResults(results)
      await updateQuali(raceId, offset)
      await updateLaps(raceId, offset)
      await updatePits(raceId, offset)
      await updateDriverStandings(raceId, offset)
      await updateConstructorStandings(raceId, offset)
    }
  }

  return { raceId, updateStatus: 'completed' }
}


export {
  verifyDb
}