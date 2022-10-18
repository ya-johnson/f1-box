import { constructorService ,wikiService } from '../../../../services'


const handler = async (req, res) => {
  const { season } = req.query
  const constructorsData = await constructorService.getSeasonConstructors(season)
  const constructors = await Promise.all(constructorsData.map(async constructor => {
    return {
      ...constructor,
      image: await wikiService.getWikiImage(constructor.url)
    }
  }))

  res.status(200).json(constructors)
}


export default handler