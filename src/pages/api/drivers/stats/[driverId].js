import { driverService } from '../../../../services'


const handler = async (req, res) => {
  const { driverId } = req.query
  const stats = await driverService.getAllDriverResults(driverId)
  res.status(200).json(stats)
}


export default handler