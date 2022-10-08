import { wikiService } from '../../../../services'


const handler = async (req, res) => {
  const { url } = req.query
  const image = await wikiService.getWikiImage(url)
  res.status(200).json(image)
}


export default handler