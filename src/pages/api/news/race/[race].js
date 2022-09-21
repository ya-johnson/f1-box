import axios from 'axios'
import { newsService } from '../../../../services'

const handler = async (req, res) => {
  const { race } = req.query
  const [season, country] = race.split('-')
  const fixture = country[0].toUpperCase() + country.substring(1)
  const url = `https://www.formula1.com/en/racing/${season}/${fixture}.html`

  const response = await axios.get(url)
  const data = await response.data
  const raceInfo = newsService.getRaceReport(data)
  raceInfo.url = url
  res.status(200).json(raceInfo)
}


export default handler