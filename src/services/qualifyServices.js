import { API_URL } from '../config'
import { colors } from '../utils'
import axios from 'axios'

const mapQualify = (qualify) => {
  const mappedQualify = qualify.map(result => {
    const qualifyResult = {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      driverId: result.Driver.driverId,
      constructor: result.Constructor.name,
      constructorId: result.Constructor.constructorId,
      // color: colors.getConstructorColor(result.Constructor.name),
      number: result.number,
      position: result.position,
      Q1: result.Q1,
    }

    if (result.Q2) {
      qualifyResult.Q2 = result.Q2
    }

    if (result.Q3) {
      qualifyResult.Q3 = result.Q3
    }

    return qualifyResult
  })

  return mappedQualify
}

const getQualify = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/qualifying.json`)
  const data = await response.data.MRData.RaceTable.Races[0].QualifyingResults
  const qualify = mapQualify(data)
  return qualify
}


export {
  mapQualify,
  getQualify
}