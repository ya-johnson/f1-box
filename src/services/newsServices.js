import { FORMULA1_URL } from '../config'
import axios from 'axios'
import cheerio from 'cheerio'


const getRaceReport = async (season, country) => {
  const url = `${FORMULA1_URL}/en/racing/${season}/${country}.html`

  const response = await axios.get(url)
  const data = await response.data

  const page = cheerio.load(data)
  const title = page('.f1--m').text()
  const image = page('.hero-header > picture').html()
  const reportLink = page('.f1-race-hub--race-review .col-lg-6 > .row a').attr('href')

  return {
    title,
    image: image.split(`"`)[3].split(',')[0],
    reportLink: `${FORMULA1_URL}${reportLink}`,
    url
  }
}

const getFormula1News = async () => {
  const response = await axios.get(`${FORMULA1_URL}/en/latest/all.html`)
  const data = await response.data

  const page = cheerio.load(data)
  const articlesData = page('.f1-latest-listing--grid-item.col-lg-4, #article-list').map((i, article) => {
    const type = page(article).find('.misc--tag').html() 
    const image = page(article).find('picture').html()
    return {
      header: page(article).find('.f1--s').text(),
      type,
      image: image.split(`"`)[3].split(',')[0],
      url: `${FORMULA1_URL}${page(article).find('a').attr('href')}`
    }
  }).get()

  const articles = articlesData.slice(1,4)            
  return articles
}


export {
  getRaceReport,
  getFormula1News
}