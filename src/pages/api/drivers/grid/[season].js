import { driverService ,wikiService } from '../../../services'


const handler = async (req, res) => {
  const { season } = req.query
  const driversData = await driverService.getSeasonDrivers(season)
  const drivers = await Promise.all(driversData.map(async driver => {
    return {
      ...driver,
      image: await wikiService.getWikiImage(driver.url)
    }
  }))

  res.status(200).json(drivers)
}


export default handler