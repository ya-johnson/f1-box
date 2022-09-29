import { dbService } from '../../../services'


const handler = async (req, res) => {
  const response = await dbService.verifyDb()
  res.status(200).json(response)
}


export default handler