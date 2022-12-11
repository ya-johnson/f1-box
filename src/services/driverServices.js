import { API_URL } from '../config'
import { raceService , resultService, qualifyService } from '.'
import { algs } from '../utils'
import axios from 'axios'


const getDriverInfo = async (driverId) => {
  const response = await axios.get(`${API_URL}/drivers/${driverId}.json`)
  const driver = await response.data
  return driver
}

const mapDrivers = (drivers) => {
  const mappedDrivers = drivers.map(driver => {
    return {
      driver: `${driver.givenName} ${driver.familyName}`,
      driverId: driver.driverId,
      number: driver.permanentNumber,
      code: driver.code,
      birth: driver.dateOfBirth,
      nationality: driver.nationality,
      url: driver.url
    }
  })

  return mappedDrivers
}

const getAllDrivers = async () => {
  const response = await axios.get(`${API_URL}/drivers.json?=123&limit=2000`)
  const data = await response.data.MRData.DriverTable.Drivers
  const drivers = mapDrivers(data)
  return drivers
}

const getSeasonDrivers = async (season) => {
  const response = await axios.get(`${API_URL}/${season}/drivers.json`)
  const data = await response.data.MRData.DriverTable.Drivers
  const drivers = mapDrivers(data)
  return drivers
}

const getDriverPerRace = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/drivers.json`)
  const data = await response.data.MRData.DriverTable.Drivers
  const drivers = data.map(driver => {
    return {
      driverId: driver.driverId,
      name: `${driver.givenName} ${driver.familyName}`,
      number: driver.number
    }
  })
  return drivers
}

const getAllDriverResults = async (driver) => {
  const response = await axios.get(`${API_URL}/drivers/${driver}/results.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races
  const results = raceService.mapRaces(data, 'results')
  const allResults = algs.groupByKey(results, 'season')
  return allResults
}

const getSeasonDriverResults = async (season, driver) => {
  const response = await axios.get(`${API_URL}/${season}/drivers/${driver}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = resultService.mapResults(data)
  return results
}

const getRoundDriverResults = async (season, round, driver) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/drivers/${driver}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = resultService.mapResults(data)
  return results
}

const getAllDriverQualify = async (driver) => {
  const response = await axios.get(`${API_URL}/drivers/${driver}/qualifying.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const qualify = raceService.mapRaces(data, 'qualify')
  const allQualify = algs.groupByKey(qualify, 'season')
  return allQualify
}

const getSeasonDriverQualify = async (season, driver) => {
  const response = await axios.get(`${API_URL}/${season}/drivers/${driver}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = qualifyService.mapQualify(data)
  return results
}

const getRoundDriverQualify = async (season, round, driver) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/drivers/${driver}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = qualifyService.mapQualify(data)
  return results
}


export {
  getDriverInfo,
  getAllDrivers,
  getSeasonDrivers,
  getDriverPerRace,
  getAllDriverResults,
  getSeasonDriverResults,
  getRoundDriverResults,
  getAllDriverQualify,
  getSeasonDriverQualify,
  getRoundDriverQualify
}