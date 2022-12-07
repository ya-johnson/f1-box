import { API_URL } from '../config'
import axios from 'axios'


const getRaceLaps = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/laps.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races[0].Laps
  return data
}

const mapLapsToMillis = (laps) => {
  const lapTimes = laps.map(lap => {
    const lapNumber = { name: lap.number }
    lap.Timings.forEach(driverTime => {
      const minutes = driverTime.time.split(':')[0] * 60
      const seconds = driverTime.time.split(':')[1].split('.')[0]
      const millis = driverTime.time.split(':')[1].split('.')[1]
      // console.log(parseInt(minutes) + parseInt(seconds) + millis)
      lapNumber[driverTime.driverId] = parseInt(parseInt(minutes) + parseInt(seconds) + millis)
    })
    return lapNumber
  })

  return lapTimes
}

const mapPositionPerLap = (laps) => {
  const positionPerLap = laps.map(lap => {
    const lapNumber = { name: lap.number }
    lap.Timings.forEach((driverTime, index) => {
      lapNumber[driverTime.driverId] = driverTime.position
    })
    return lapNumber
  })

  return positionPerLap
}


export {
  getRaceLaps,
  mapLapsToMillis,
  mapPositionPerLap
}