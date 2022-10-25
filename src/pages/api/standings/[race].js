import { standingsService } from '../../../services'

const setChartData = (type, standings) => {
  if (type === 'drivers') {
    const data = standings.map(driver => {
      return {
        name: driver.driver,
        points: parseInt(driver.points)
      }
    })

    return data
  } 
  else if (type === 'constructors') {
    const data = standings.map(constructor => {
      return {
        name: constructor.constructor,
        points: parseInt(constructor.points)
      }
    })
    
    return data
  }
}

const handler = async (req, res) => {
  const { race } = req.query
  const [season, round] = race.split('-')
  const driverStandingsData = await standingsService.getDriverStandings(season, round)
  const constructorStandingsData = await standingsService.getConstructorStandings(season, round)
  const driverStandings = standingsService.mapDriverStandings(driverStandingsData)
  const constructorStandings = standingsService.mapConstructorStandings(constructorStandingsData)
  const driverStandingsChart = setChartData('drivers', driverStandingsData)
  const constructorStandingsChart = setChartData('constructors', constructorStandingsData)
  const data = {
    drivers: {
      standings: driverStandings,
      chart: driverStandingsChart
    },
    constructors: {
      standings: constructorStandings,
      chart: constructorStandingsChart
    }
  }
  
  res.status(200).json(data)
}


export default handler