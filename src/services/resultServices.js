import { API_URL } from '../config'
import axios from 'axios'


const getResults = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/results.json`)
  const data = await response.data.MRData.RaceTable.Races[0].Results
  const results = data.map(result => {
    const raceResult = {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor:result.Constructor.constructorId,
      number: result.number,
      grid: result.grid,
      position: result.position,
      positionText: result.positionText,
      positionOrder: result.position,
      points: result.points,
      laps: result.laps,
      fastestLap: result.FastestLap.lap,
      rank: result.FastestLap.rank,
      fastestLapTime: result.FastestLap.Time.time,
      fastestLapSpeed: result.FastestLap.AverageSpeed.speed,
      status: result.status
    }

    if (result.Time) {
      raceResult.time = result.Time.time
      raceResult.millis = result.Time.millis
    }

    return raceResult
  })

  return results
}


export {
  getResults
}

