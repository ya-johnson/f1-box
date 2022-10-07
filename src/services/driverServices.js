import { API_URL } from '../config'
import axios from 'axios'


const getAllDrivers = async () => {
  const response = await axios.get(`${API_URL}/drivers.json?=123&limit=2000`)
  const data = await response.data.MRData.DriverTable.Drivers
  const drivers = data.map(driver => {
    return {
      driver: `${driver.givenName} ${driver.familyName}`,
      number: driver.permanentNumber,
      code: driver.code,
      birth: driver.dateOfBirth,
      nationality: driver.nationality,
      url: driver.url
    }
  })

  return drivers
}

const getSeasonDrivers = async (season) => {
  const response = await axios.get(`${API_URL}/${season}/drivers.json`)
  const data = await response.data.MRData.DriverTable.Drivers
  const drivers = data.map(driver => {
    return {
      driver: `${driver.givenName} ${driver.familyName}`,
      number: driver.permanentNumber,
      code: driver.code,
      birth: driver.dateOfBirth,
      nationality: driver.nationality,
      url: driver.url
    }
  })

  return drivers
}

const getAllDriverResults = async (driver) => {
  const response = await axios.get(`${API_URL}/drivers/${driver}/results.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = data.map(result => {
    return {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor: result.Constructor.name,
      number: result.number,
      position: result.position,
      points: result.position,
      grid: result.grid,
      laps: result.laps,
      status: result.status,
      time: result.Time.time,
      fastestLap: {
        rank: result.FastestLap.rank,
        lap: result.FastestLap.lap,
        time: result.FastestLap.Time.time
      },
      averageSpeed: result.AverageSpeed.speed
    }
  })

  return results
}

const getSeasonDriverResults = async (season, driver) => {
  const response = await axios.get(`${API_URL}/${season}/drivers/${driver}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = data.map(result => {
    return {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor: result.Constructor.name,
      number: result.number,
      position: result.position,
      points: result.position,
      grid: result.grid,
      laps: result.laps,
      status: result.status,
      time: result.Time.time,
      fastestLap: {
        rank: result.FastestLap.rank,
        lap: result.FastestLap.lap,
        time: result.FastestLap.Time.time
      },
      averageSpeed: result.AverageSpeed.speed
    }
  })

  return results
}

const getRoundDriverResults = async (season, round, driver) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/drivers/${driver}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = data.map(result => {
    return {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor: result.Constructor.name,
      number: result.number,
      position: result.position,
      points: result.position,
      grid: result.grid,
      laps: result.laps,
      status: result.status,
      time: result.Time.time,
      fastestLap: {
        rank: result.FastestLap.rank,
        lap: result.FastestLap.lap,
        time: result.FastestLap.Time.time
      },
      averageSpeed: result.AverageSpeed.speed
    }
  })

  return results
}

const getAllDriverQualify = async (driver) => {
  const response = await axios.get(`${API_URL}/drivers/${driver}/qualifying.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = data.map(result => {
    return {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor: result.Constructor.name,
      number: result.number,
      position: result.position,
      Q1: result.Q1,
      Q2: result.Q2,
      Q3: result.Q3
    }
  })

  return results
}

const getSeasonDriverQualify = async (season, driver) => {
  const response = await axios.get(`${API_URL}/${season}/drivers/${driver}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = data.map(result => {
    return {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor: result.Constructor.name,
      number: result.number,
      position: result.position,
      Q1: result.Q1,
      Q2: result.Q2,
      Q3: result.Q3
    }
  })

  return results
}

const getRoundDriverQualify = async (season, round, driver) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/drivers/${driver}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = data.map(result => {
    return {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor: result.Constructor.name,
      number: result.number,
      position: result.position,
      Q1: result.Q1,
      Q2: result.Q2,
      Q3: result.Q3
    }
  })

  return results
}


export {
  getAllDrivers,
  getSeasonDrivers,
  getAllDriverResults,
  getSeasonDriverResults,
  getRoundDriverResults,
  getAllDriverQualify,
  getSeasonDriverQualify,
  getRoundDriverQualify
}