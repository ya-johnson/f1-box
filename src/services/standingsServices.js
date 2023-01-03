import { API_URL } from '../config'
// import { colors } from '../utils'
import axios from 'axios'


const getDriverStandings = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/driverStandings.json`)
  const data = await response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  const driverStandings = mapDriverStandings(data)
  return driverStandings
}

const getConstructorStandings = async (season, round) => {
  const response = await axios.get(`${API_URL}/${season}/${round}/constructorStandings.json`)
  const data = await response.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  const constructorStandings = mapConstructorStandings(data)
  return constructorStandings
}

const mapDriverStandings = (data) => {
  const driverStandings = data.map(driver => {
    return {
      position: driver.position,
      driver: `${driver.Driver.givenName} ${driver.Driver.familyName}`,
      // driverId: driver.Driver.driverId,
      constructor: driver.Constructors[0].name,
      // constructorId: driver.Constructors[0].constructorId,
      // color: colors.getConstructorColor(driver.Constructors[0].name),
      number: driver.Driver.permanentNumber,
      wins: driver.wins,
      points: driver.points,
    }
  })

  return driverStandings
}

const mapConstructorStandings = (data) => {
  const constructorStandings = data.map(constructor => {
    return {
      position: constructor.position,
      constructor: constructor.Constructor.name,
      // constructorId: constructor.Constructor.constructorId,
      // color: colors.getConstructorColor(constructor.Constructor.name),
      wins: constructor.wins,
      points: constructor.points,
    }
  })

  return constructorStandings
}

const mapDriverStandingsMin = (standings) => {
  const driverStandings = standings.map(driver => {
    return {
      driver: driver.driver,
      number: driver.number,
      wins: driver.wins,
      position: driver.position,
      points: driver.points,
    }
  })

  return driverStandings
}

const mapConstructorStandingsMin = (standings) => {
  const constructorStandings = standings.map(constructor => {
    return {
      constructor: constructor.constructor,
      position: constructor.position,
      wins: constructor.wins,
      points: constructor.points,
    }
  })

  return constructorStandings
}


export {
  getDriverStandings,
  getConstructorStandings,
  mapDriverStandings,
  mapConstructorStandings,
  mapDriverStandingsMin,
  mapConstructorStandingsMin
}