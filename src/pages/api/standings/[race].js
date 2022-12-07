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
  const driverStandings = await standingsService.getDriverStandings(season, round)
  const constructorStandings = await standingsService.getConstructorStandings(season, round)
  const driverStandingsChart = setChartData('drivers', driverStandings)
  const constructorStandingsChart = setChartData('constructors', constructorStandings)
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