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
  const data = {
    results: { table: resultService.mapResultsMin(results) },
    qualify: { table: qualifyService.mapQualifyMin(qualify) },
    laps: {
      positionPerLap: lapService.mapPositionPerLap(laps),
      lapsInMillis: lapService.mapLapsToMillis(laps)
    },
    pits
  }
  
  res.status(200).json(data)
}


export default handler