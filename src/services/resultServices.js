import { API_URL } from '../config'
import { colors } from '../utils'
import axios from 'axios'


const getResults = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/results.json`)
  const data = await response.data.MRData.RaceTable.Races[0].Results
  const results = mapResults(data)
  return results
}

const mapResults = (data) => {
  const results = data.map(result => {
    const raceResult = {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      driverId: result.Driver.driverId,
      constructor: result.Constructor.name,
      constructorId: result.Constructor.constructorId,
      // color: colors.getConstructorColor(result.Constructor.name),
      number: result.number,
      grid: result.grid,
      position: result.position,
      points: result.points,
      laps: result.laps,
      status: result.status,
    }

    if (result.FastestLap) {
      raceResult.fastestLap = {
        lap: result.FastestLap.lap,
        rank: result.FastestLap.rank,
        fastestLapTime: result.FastestLap.Time.time,
        fastestLapSpeed: result.FastestLap.AverageSpeed.speed
      }
    }

    if (result.Time) {
      raceResult.time = result.Time.time
      raceResult.millis = result.Time.millis
    }

    return raceResult
  })

  return results
}

const mapResultsMin = (results) => {
  const resultsMin = results.map(result => {
    return {
      position: result.position,
      driver: result.driver,
      constructor: result.constructor,
      time: result.time,
      status: result.status,
      points: result.points
    }
  })

  return resultsMin
}

const mapPodium = (results) => {
  const podium = results.map(result => {
    return {
      position: result.position,
      driver: result.driver,
      time: result.time,
      points: result.points,
    }
  }).sort((a,b) => b.points - a.points).slice(0,3)

  return podium
}


export {
  getResults,
  mapResults,
  mapResultsMin,
  mapPodium
}

