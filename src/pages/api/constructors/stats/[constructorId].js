import { constructorService } from '../../../../services'


const handler = async (req, res) => {
  const { constructorId } = req.query
  const stats = await constructorService.getAllconstructorResults(constructorId)
  res.status(200).json(stats)
}


export default handler