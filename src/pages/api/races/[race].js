import { resultService,
         qualifyService,
         driverService,
         lapService,
         pitService } from '../../../services'


const handler = async (req, res) => {
  const { race } = req.query
  const [season, round] = race.split('-')

  const results = await resultService.getResults(season, round)
  const qualify = await qualifyService.getQualify(season, round)
  const drivers = await driverService.getDriverPerRace(season, round)
  const laps = await lapService.getRaceLaps(season, round)
  const pits = await pitService.getRacePits(season, round)

  res.status(200).json({ results, qualify, drivers, laps, pits })
}


export default handler