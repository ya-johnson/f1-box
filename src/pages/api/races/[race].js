import { resultService, qualifyService } from '../../../services'


const handler = async (req, res) => {
  const { race } = req.query
  const [season, round] = race.split('-')
  const results = await resultService.getResults(season, round)
  const qualify = await qualifyService.getQualify(season, round)
  res.status(200).json({results, qualify})
}


export default handler