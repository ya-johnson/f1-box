import { API_URL } from '../config'
import axios from 'axios'


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
  getLastRace,
  getRace
}