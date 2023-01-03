import { API_URL } from '../config'
import axios from 'axios'


const mapSchedule = (season) => {
  const schedule = {
    season: season.season,
    schedule: season.Races.map(race => {
      const raceInfo = {
        season: race.season,
        round: race.round,
        wiki: race.url,
        name: race.raceName,
        circuit: race.Circuit.circuitName,
        country: race.Circuit.Location.country,
        city: race.Circuit.Location.locality,
        date: race.date,
        time: race.time,
      }

      if (race.FirstPractice) {
        raceInfo.firstPractice = {
          date: race.FirstPractice.date,
          time: race.FirstPractice.time,
        }
      }

      if (race.SecondPractice) {
        raceInfo.secondPractice = {
          date: race.SecondPractice.date,
          time: race.SecondPractice.time,
        }
      }

      if (race.ThirdPractice) {
        raceInfo.secondPractice = {
          date: race.ThirdPractice.date,
          time: race.ThirdPractice.time,
        }
      }

      if (race.Qualifying) {
        raceInfo.qualifying = {
          date: race.Qualifying.date,
          time: race.Qualifying.time
        }
      }

      if (race.Sprint) {
        raceInfo.sprint = {
          date: race.Sprint.date,
          time: race.Sprint.time
        } 
      }

      return raceInfo
    }) 
  }

  return schedule
}

const getLoadedSeasonSchedule = (schedules, year) => {
  const season = schedules.filter(season => season.season == year)
  return season[0].schedule
}

const getSeasonsList = async () => {
  const response = await axios.get(`${API_URL}/seasons.json?limit=100`)
  const data = await response.data.MRData.SeasonTable.Seasons
  const seasonsData = data.map(season => season.season)
  const seasons = [...seasonsData].reverse()
  return seasons
}

const getSeasonSchedule = async (year) => {
  const response = await axios.get(`${API_URL}/${!year ? 'current' : year}.json`)
  const data = await response.data.MRData.RaceTable
  const schedule = mapSchedule(data)
  return schedule
}

const getAllSeasonsSchedules = async () => {
  const seasons = await getSeasonsList()
  const schedules = await Promise.all(seasons.map(async season => await getSeasonSchdule(season)))
  return schedules
}


export {
  getLoadedSeasonSchedule,
  getSeasonsList,
  getSeasonSchedule,
  getAllSeasonsSchedules,
}