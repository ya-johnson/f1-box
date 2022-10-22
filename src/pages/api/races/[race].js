import { resultService,
         qualifyService,
         lapService,
         pitService } from '../../../services'


const handler = async (req, res) => {
  const { race } = req.query
  const [season, round] = race.split('-')

  const results = await resultService.getResults(season, round)
  const qualify = await qualifyService.getQualify(season, round)
  const laps = await lapService.getRaceLaps(season, round)
  const pits = await pitService.getRacePits(season, round)

  res.status(200).json({ results, qualify, laps, pits })
}


export default handler