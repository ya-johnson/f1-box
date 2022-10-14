import { API_URL } from '../config'
import axios from 'axios'


const getDriverStandings = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/driverStandings.json`)
  const data = await response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  const driverStandings = data.map( driver => {
    return {
      driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      driverId: driver.Driver.driverId,
      number: driver.Driver.permanentNumber,
      wins: driver.wins,
      position: driver.position,
      points: driver.points,
    }
  })
  return driverStandings
}

const getConstructorStandings = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructorStandings.json`)
  const data = await response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const constructorStandings = data.map( constructor => {
    return {
      constructor: result.Constructor.name,
      constructorId: result.Constructor.constructorId,
      position: constructor.position,
      wins: constructor.wins,
      points: constructor.points,
    }
  })
  return constructorStandings
}


export {
  getDriverStandings,
  getConstructorStandings
}