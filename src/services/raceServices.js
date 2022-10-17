import { API_URL } from '../config'
import { resultService, qualifyService } from '.'
import axios from 'axios'


const mapRaces = (races, type) => {
  const mappedRaces = races.map(race => {
    const raceClean = {
      season: race.season,
      round: race.round,
      name: race.raceName,
      circuit: race.Circuit.circuitName,
      country: race.Circuit.Location.country,
      date: race.date,
      time: race.time,
    }

    if (type === 'results') {
      mappedRaces.results = resultService.mapResults(race.Results)
    }

    if (type === 'qualify') {
      mappedRaces.qualifying = qualifyService.mapQualify(race.Qualifying)
    }

    return raceClean
  })

  return mappedRaces
}

const getLastRace = async () => {
  const response = await axios.get(`${API_URL}/current/last/results.json?limit=1`)
  const data = await response.data.MRData.RaceTable.Races[0]
  const lastRace = {
    season: data.season,
    round: data.round,
    name: data.raceName,
    country: data.Circuit.Location.country,
    date: data.date,
    time: data.time
  }

  return lastRace
}

const getRace = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}.json`)
  const data = await response.data.MRData
  const race = data
  return race
}


export {
  mapRaces,
  getLastRace,
  getRace
}