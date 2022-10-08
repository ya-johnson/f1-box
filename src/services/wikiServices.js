import axios from 'axios'
import cheerio from 'cheerio'


const getWikiImage = async (url) => {
  const response = await axios.get(url)
  const data = await response.data
  const page = cheerio.load(data)
  const image = page('.infobox-image > .image > img').attr('src')
  return image
} 


export {
  getWikiImage,
}