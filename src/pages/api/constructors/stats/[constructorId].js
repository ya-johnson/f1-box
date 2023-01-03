import { constructorService, wikiService } from '../../../../services'


const handler = async (req, res) => {
  const { constructorId } = req.query
  const constructor = await constructorService.getConstructorInfo(constructorId)
  const image = await wikiService.getWikiImage(constructor.url)
  const races = await constructorService.getConstructorRacesCount(constructorId)
  const seasons = await constructorService.getAllConstructorSeasons(constructorId)
  const championships = await constructorService.getConstructorChampionships(constructorId)
  const podiums = await constructorService.getAllConstructorPodiums(constructorId)
  const poles = await constructorService.getAllConstructorPoles(constructorId)
  const results = await constructorService.getAllConstructorResults(constructorId)

  const data = {
    ...constructor,
    image,
    races,
    seasons,
    championships,
    results,
    stats: {
      races,
      wins: podiums[0],
      podiums: podiums.flatMap(race => race),
      poles,
    }
  }

  res.status(200).json(data)
}


export default handler