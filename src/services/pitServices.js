import { API_URL } from '../config'
import axios from 'axios'


const getRacePits = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/pitstops.json?limit=200`)
  const data = await response.data.MRData.RaceTable.Races.PitStops
  return data
}


export {
  getRacePits
}