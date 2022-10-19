import { resultService } from '../../../../services'


const handler = async (req, res) => {
  const [season, round] = req.query.split('-')
  const results = await resultService.getResults(season, round)
  res.status(200).json(results)
}


export default handler