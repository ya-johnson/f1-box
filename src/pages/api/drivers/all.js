import { driverService } from '../../../services'


const handler = async (req, res) => {
  const allDrivers = await driverService.getAllDrivers()
  const sortedAllDrivers = allDrivers.sort((a,b) => a.driver.localeCompare(b.driver))
  res.status(200).json(sortedAllDrivers)
}


export default handler