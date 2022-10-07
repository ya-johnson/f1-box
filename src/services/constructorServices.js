import { API_URL } from '../config'
import axios from 'axios'


const getAllConstructors = async () => {
  const response = await axios.get(`${API_URL}/constructors.json?=123&limit=1000`)
  const data = await response.data.MRData.ConstructorTable.Constructors
  const constructors = data.map(constructor => {
    return {
      constructor: constructor.name,
      nationality: constructor.nationality,
      url: constructor.url
    }
  })

  return constructors
}

const getSeasonConstructors = async (season) => {
  const response = await axios.get(`${API_URL}/${season}/constructors.json`)
  const data = await response.data.MRData.ConstructorTable.Constructors
  const constructors = data.map(constructor => {
    return {
      constructor: constructor.name,
      nationality: constructor.nationality,
      url: constructor.url
    }
  })

  return constructors
}

const getAllConstructorResults = async (constructor) => {
  const response = await axios.get(`${API_URL}/constructors/${constructor}/results.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = data.map(result => {
    return {
      constructor: `${result.Driver.givenName} ${result.Driver.familyName}`,
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

const getSeasonConstructorResults = async (season, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/constructors/${constructor}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = data.map(result => {
    return {
      constructor: `${result.Driver.givenName} ${result.Driver.familyName}`,
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

const getRoundConstructorResults = async (season, round, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructors/${constructor}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = data.map(result => {
    return {
      constructor: `${result.Driver.givenName} ${result.Driver.familyName}`,
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

const getAllConstructorQualify = async (constructor) => {
  const response = await axios.get(`${API_URL}/constructors/${constructor}/qualifying.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = data.map(result => {
    return {
      constructor: `${result.Driver.givenName} ${result.Driver.familyName}`,
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

const getSeasonConstructorQualify = async (season, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/constructors/${constructor}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = data.map(result => {
    return {
      constructor: `${result.Driver.givenName} ${result.Driver.familyName}`,
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

const getRoundConstructorQualify = async (season, round, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructors/${constructor}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = data.map(result => {
    return {
      constructor: `${result.Driver.givenName} ${result.Driver.familyName}`,
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
  getAllConstructors,
  getSeasonConstructors,
  getAllConstructorResults,
  getSeasonConstructorResults,
  getRoundConstructorResults,
  getAllConstructorQualify,
  getSeasonConstructorQualify,
  getRoundConstructorQualify
}