import { standingsService } from '../../../services'


const handler = async (req, res) => {
  const { race } = req.query
  const [season, round] = race.split('-')
  const driverStandings = await standingsService.getDriverStandings(season, round)
  const constructorStandings = await standingsService.getConstructorStandings(season, round)
  const data = {
    drivers: {
      standings: driverStandings,
      chart: driverStandings.map(driver => ({name: driver.driver, points: parseInt(driver.points)}))
    },
    constructors: {
      standings: constructorStandings,
      chart: constructorStandings.map(constructor => ({name: constructor.constructor, points: parseInt(constructor.points)}))
    }
  }
  
  res.status(200).json(data)
}


export default handler