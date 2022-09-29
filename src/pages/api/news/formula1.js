import axios from 'axios'
import { newsService } from '../../../services'


const handler = async (req, res) => {
  const response = await axios.get('https://www.formula1.com/en/latest/all.html')
  const data = await response.data
  const formula1News = newsService.getFormula1News(data)
  res.status(200).json(formula1News)
}


export default handler