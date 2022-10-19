import { lapService } from '../../../../services'


const handler = async (req, res) => {
  const [season, round] = req.query.split('-')
  const laps = await lapService.getResults(season, round)
  res.status(200).json(laps)
}


export default handler