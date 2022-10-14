import { API_URL } from '../config'
import axios from 'axios'


const mapSchedule = (season) => {
  const schedule = {
    season: season.season,
    schdule: season.Races.map(race => {
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
        firstPractice: {
          date: race.FirstPractice.date,
          time: race.FirstPractice.time,
        },
        secondPractice: {
          date: race.SecondPractice.date,
          time: race.SecondPractice.time,
        },
        qualifying: {
          date: race.Qualifying.date,
          time: race.Qualifying.time
        }
      }

      race.Sprint ? 
        raceInfo.sprint = {
          date: race.Sprint.date,
          time: race.Sprint.time
        } 
        :
        raceInfo.thirdPractice = {
          date: race.ThirdPractice.date,
          time: race.ThirdPractice.time,
        }

      return raceInfo
    }) 
  }

  return schedule
}

const getSeasonsList = async () => {
  const response = await axios.get(`${API_URL}/seasons.json?limit=100`)
  const data = await response.data.MRData.SeasonTable.Seasons
  const seasonsData = data.map(season => season.season)
  const seasons = [...seasonsData].reverse()
  return seasons
}

const getSeasonSchdule = async (year) => {
  const response = await axios.get(`${API_URL}/${!year ? 'current' : year}.json`)
  const data = await response.data.MRData.RaceTable
  const schedule = mapSchedule(data)
  return schedule
}


export {
  getSeasonsList,
  getSeasonSchdule
}