import { API_URL } from '../config'
import axios from 'axios'


const getAllDrivers = async () => {
  const response = await axios.get(`${API_URL}/drivers.json?=123`)
  const data = await response.data.MRData.DriverTable.Drivers
  const drivers = data.map(driver => {
    return {
      driver: `${driver.givenName} ${driver.familyName}`,
      number: driver.permanentNumber,
      code: driver.code,
      birth: driver.dateOfBirth,
      nationality: driver.nationality,
      url: driver.url
    }
  })

  return drivers
}

const getSeasonDrivers = async (season) => {
  const response = await axios.get(`${API_URL}/${season}/drivers.json`)
  const data = await response.data.MRData.DriverTable.Drivers
  const drivers = data.map(driver => {
    return {
      driver: `${driver.givenName} ${driver.familyName}`,
      number: driver.permanentNumber,
      code: driver.code,
      birth: driver.dateOfBirth,
      nationality: driver.nationality,
      url: driver.url
    }
  })

  return drivers
}


export {
  getAllDrivers,
  getSeasonDrivers
}