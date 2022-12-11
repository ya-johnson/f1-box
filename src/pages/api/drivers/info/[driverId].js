import { driverService } from '../../../../services'


const handler = async (req, res) => {
  const { driverId } = req.query
  const driver = await driverService.getDriverInfo(driverId)
  res.status(200).json(driver)
}


export default handler