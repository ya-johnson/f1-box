import config from '../config'
import axios from 'axios'
import { resultService, raceService } from '.'


const checkLastRace = async () => {
  const response = await axios.get(`${config.API_URL}/current/last/results.json?limit=1`)
  const currentLastResult  = await response.data.MRData.RaceTable.Races[0]
  const dbLastResult = await resultService.getLastResult()
  const race = await raceService.getRaceById(dbLastResult.raceId)
  const data = {
    dbLastRace: {
      year: race.year,
      round: race.round,
      name: race.name,
      country: race.Circuits.country,
      date: race.date,
      time: race.time
    },
    currentLastRace: {
      year: currentLastResult.season,
      round: currentLastResult.round,
      name: currentLastResult.raceName,
      country: currentLastResult.Circuit.Location.country,
      date: currentLastResult.date,
      time: currentLastResult.time
    },
    nextRace: {
      year: currentLastResult.season,
      round: currentLastResult.round,
      name: currentLastResult.raceName,
      country: currentLastResult.Circuit.Location.country,
      date: currentLastResult.date,
      time: currentLastResult.time
    }
  }
  
  return data
}


export {
  checkLastRace
}