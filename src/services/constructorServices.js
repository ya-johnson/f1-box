import { API_URL } from '../config'
import { raceService,resultService, qualifyService } from '.'
import { algs } from '../utils'
import axios from 'axios'


const mapConstructors = (constructors) => {
  const mappedConstructors = constructors.map(constructor => {
    return {
      constructor: constructor.name,
      constructorId: constructor.constructorId,
      nationality: constructor.nationality,
      url: constructor.url
    }
  })

  return mappedConstructors
}

const getAllConstructors = async () => {
  const response = await axios.get(`${API_URL}/constructors.json?=123&limit=1000`)
  const data = await response.data.MRData.ConstructorTable.Constructors
  const constructors = mapConstructors(data)
  return constructors
}

const getSeasonConstructors = async (season) => {
  const response = await axios.get(`${API_URL}/${season}/constructors.json`)
  const data = await response.data.MRData.ConstructorTable.Constructors
  const constructors = mapConstructors(data)
  return constructors
}

const getAllConstructorResults = async (constructor) => {
  const response = await axios.get(`${API_URL}/constructors/${constructor}/results.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races
  const results = raceService.mapRaces(data, 'results')
  const allResults = algs.groupByKey(results, 'season')
  return allResults
}

const getSeasonConstructorResults = async (season, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/constructors/${constructor}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = resultService.mapResults(data)
  return results
}

const getRoundConstructorResults = async (season, round, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructors/${constructor}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = resultService.mapResults(data)
  return results
}

const getAllConstructorQualify = async (constructor) => {
  const response = await axios.get(`${API_URL}/constructors/${constructor}/qualifying.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const qualify = raceService.mapRaces(data, 'qualify')
  const allQualify = algs.groupByKey(qualify, 'season')
  return allQualify
}

const getSeasonConstructorQualify = async (season, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/constructors/${constructor}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = qualifyService.mapQualify(data)
  return results
}

const getRoundConstructorQualify = async (season, round, constructor) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructors/${constructor}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const results = qualifyService.mapQualify(data)
  return results
}


export {
  getAllConstructors,
  getSeasonConstructors,
  getAllConstructorResults,
  getSeasonConstructorResults,
  getRoundConstructorResults,
  getAllConstructorQualify,
  getSeasonConstructorQualify,
  getRoundConstructorQualify
}