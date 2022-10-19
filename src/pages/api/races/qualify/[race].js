import { qualifyService } from '../../../../services'


const handler = async (req, res) => {
  const [season, round] = req.query.split('-')
  const qualify = await qualifyService.getQualify(season, round)
  res.status(200).json(qualify)
}


export default handler