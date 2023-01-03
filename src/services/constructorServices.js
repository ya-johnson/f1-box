import { API_URL } from '../config'
import { raceService, resultService, qualifyService } from '.'
import axios from 'axios'


const getConstructorInfo = async (constructorId) => {
  const response = await axios.get(`${API_URL}/constructors/${constructorId}.json`)
  const constructor = await response.data.MRData.ConstructorTable.Constructors[0]
  return constructor
}

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

const getConstructorRacesCount = async (constructorId) => {
  const response = await axios.get(`${API_URL}/constructors/${constructorId}/results.json`)
  const raceCount = await response.data.MRData.total
  return parseInt(raceCount)
}

const getAllConstructorResults = async (constructorId) => {
  const response = await axios.get(`${API_URL}/constructors/${constructorId}/results.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races
  const results = raceService.mapRaces(data, 'results')
  return results
}

const getAllConstructorPodiums = async (constructorId) => {
  const first = await axios.get(`${API_URL}/constructors/${constructorId}/results/1.json?limit=1000`)
  const second = await axios.get(`${API_URL}/constructors/${constructorId}/results/2.json?limit=1000`)
  const third = await axios.get(`${API_URL}/constructors/${constructorId}/results/3.json?limit=1000`)
  const podiums = await Promise.all([first, second, third].map(async response => {
    return await response.data.MRData.RaceTable.Races
  }))

  return podiums
}

const getSeasonConstructorResults = async (season, constructorId) => {
  const response = await axios.get(`${API_URL}/${season}/constructors/${constructorId}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = resultService.mapResults(data)
  return results
}

const getRoundConstructorResults = async (season, round, constructorId) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructors/${constructorId}/results.json`)
  const data = await response.data.MRData.RaceTable.Races.Results
  const results = resultService.mapResults(data)
  return results
}

const getAllConstructorPoles = async (constructorId) => {
  const response = await axios.get(`${API_URL}/constructors/${constructorId}/qualifying/1.json?limit=1000`)
  const poles = await response.data.MRData.RaceTable.Races
  return poles
}

const getAllConstructorQualify = async (constructorId) => {
  const response = await axios.get(`${API_URL}/constructors/${constructorId}/qualifying.json?limit=2000`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const qualify = raceService.mapRaces(data, 'qualify')
  return qualify
}

const getSeasonConstructorQualify = async (season, constructorId) => {
  const response = await axios.get(`${API_URL}/${season}/constructors/${constructorId}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const qualify = qualifyService.mapQualify(data)
  return qualify
}

const getRoundConstructorQualify = async (season, round, constructorId) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructors/${constructorId}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races.QualifyingResults
  const qualify = qualifyService.mapQualify(data)
  return qualify
}

const getAllConstructorSeasons = async (constructorId) => {
  const response = await axios.get(`${API_URL}/constructors/${constructorId}/constructorStandings.json?limit=100`)
  const data = await response.data.MRData.StandingsTable.StandingsLists
  const championships = data.map(season => season.season)
  return championships
}

const getConstructorChampionships = async (constructorId) => {
  const response = await axios.get(`${API_URL}/constructors/${constructorId}/constructorStandings/1.json`)
  const data = await response.data.MRData.StandingsTable.StandingsLists
  const championships = data.map(season => season.season)
  return championships
}


export {
  getConstructorInfo,
  getAllConstructors,
  getSeasonConstructors,
  getConstructorRacesCount,
  getAllConstructorResults,
  getAllConstructorPodiums,
  getSeasonConstructorResults,
  getRoundConstructorResults,
  getAllConstructorPoles,
  getAllConstructorQualify,
  getSeasonConstructorQualify,
  getRoundConstructorQualify,
  getAllConstructorSeasons,
  getConstructorChampionships
}