import { driverService, wikiService } from '../../../../services'
import { algs } from '../../../../utils'


const calcStats = (resultsData) => {
  const results = resultsData.map(data => data.results[0])
  const poles = results.filter(result => result.grid == 1)
  const poleWins = results.filter(result => result.grid == 1 && result.position == 1)

  return {
    races: results.length,
    wins: results.filter(result => result.position == 1),
    podiums: results.filter(result => result.position <= 3),
    poles,
    poleWins: { count: poleWins.length, ratio: poles.length / poleWins.length }
  }
}

// add teams by season

const handler = async (req, res) => {
  const { driverId } = req.query
  const driver = await driverService.getDriverInfo(driverId)
  const image = await wikiService.getWikiImage(driver.url)
  const championships = await driverService.getDriverChampionships(driverId)
  const results = await driverService.getAllDriverResults(driverId)
  const resultsBySeason = algs.groupByKey(results, 'season')
  const stats = calcStats(results)

  const data = {
    ...driver,
    image,
    seasons: Object.keys(resultsBySeason),
    championships,
    results,
    stats
  }

  res.status(200).json(data)
}


export default handler