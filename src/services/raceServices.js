import { API_URL } from '../config'
import { resultService, qualifyService } from '.'
import axios from 'axios'


const getLoadedRaceInfo = (schedules, year, round) => {
  const season = schedules.filter(season => season.season == year)
  const raceInfo = season[0].schedule.filter(race => race.round == round)
  if (raceInfo.length < 1) {
    return 'next season'
  } else {
    return raceInfo[0]
  }  
}

const getLastRace = async () => {
  const response = await axios.get(`${API_URL}/current/last/results.json?limit=1`)
  const data = await response.data.MRData.RaceTable.Races[0]
  const lastRace = sortRaceInfo(data)
  return lastRace
}

const getRace = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}.json`)
  const data = await response.data.MRData
  const race = sortRaceInfo(data)
  return race
}

const sortRaceInfo = (race) => {
  const raceInfo = {
    season: race.season,
    round: race.round,
    name: race.raceName,
    circuitId: race.Circuit.circuitId,
    circuitName: race.Circuit.circuitName,
    country: race.Circuit.Location.country,
    date: race.date,
    time: race.time
  }

  return raceInfo
}

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
      raceClean.results = resultService.mapResults(race.Results)
    }

    if (type === 'qualify') {
      raceClean.qualifying = qualifyService.mapQualify(race.Qualifying)
    }

    return raceClean
  })

  return mappedRaces
}


export {
  getLoadedRaceInfo,
  getLastRace,
  getRace,
  mapRaces
}