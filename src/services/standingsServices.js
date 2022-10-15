import { API_URL } from '../config'
import { colors } from '../utils'
import axios from 'axios'


const mapDriverStandings = (driverStandings) => {
  const mappedDriverStandings = driverStandings.map(driver => {
    return {
      driver: driver.driver,
      number: driver.number,
      wins: driver.wins,
      position: driver.position,
      points: driver.points,
    }
  })

  return mappedDriverStandings
}

const mapConstructorStandings = (constructorStandings) => {
  const mappedConstructorStandings = constructorStandings.map(constructor => {
    return {
      constructor: constructor.constructor,
      position: constructor.position,
      wins: constructor.wins,
      points: constructor.points,
    }
  })

  return mappedConstructorStandings
}

const getDriverStandings = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/driverStandings.json`)
  const data = await response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  const driverStandings = data.map(driver => {
    return {
      driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      driverId: driver.Driver.driverId,
      constructor: driver.Constructors[0].name,
      constructorId: driver.Constructors[0].constructorId,
      color: colors.getConstructorColor(driver.Constructors[0].name),
      number: driver.Driver.permanentNumber,
      wins: driver.wins,
      position: driver.position,
      points: driver.points,
    }
  })
  console.log(driverStandings)
  return driverStandings
}

const getConstructorStandings = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructorStandings.json`)
  const data = await response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const constructorStandings = data.map(constructor => {
    return {
      constructor: constructor.Constructor.name,
      constructorId: constructor.Constructor.constructorId,
      color: colors.getConstructorColor(constructor.Constructor.name),
      position: constructor.position,
      wins: constructor.wins,
      points: constructor.points,
    }
  })
  return constructorStandings
}


export {
  mapDriverStandings,
  mapConstructorStandings,
  getDriverStandings,
  getConstructorStandings
}