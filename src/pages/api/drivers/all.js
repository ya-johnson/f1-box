import { driverService } from '../../../services'


const handler = async (req, res) => {
  const allDrivers = await driverService.getAllDrivers()
  const drivers = allDrivers.sort((a,b) => a.driver.localeCompare(b.driver))
  const names = drivers.map(driver => driver.driver)
  res.status(200).json({drivers, names})
}


export default handler