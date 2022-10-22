import { API_URL } from '../config'
import axios from 'axios'


const getRaceLaps = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/laps.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races[0].Laps
  return data
}


export {
  getRaceLaps
}