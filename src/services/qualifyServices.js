import { API_URL } from '../config'
import axios from 'axios'

const mapQualify = (qualify) => {
  const mappedQualify = qualify.map(result => {
    const qualifyResult = {
      driver: `${result.Driver.givenName} ${result.Driver.familyName}`,
      constructor: result.Constructor.name,
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


export {
  mapQualify
}