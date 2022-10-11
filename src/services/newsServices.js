import { FORMULA1_URL,
         SKY_F1_URL,
         MOTOR_SPORT_F1_URL } from '../config'
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
  articlesData.shift()
  const articles = articlesData.filter(article => !article.type.includes('Video'))
  return articles
}

const getSkyF1News = async () => {
  const response = await axios.get(`${SKY_F1_URL}/news`)
  const data = await response.data

  const page = cheerio.load(data)
  const articlesData = page('.news-list__item, .news-list').map((i, article) => {
    return {
      header: page(article).find('.news-list__headline').text(),
      type: page(article).find('.lable__tag').text(),
      image: page(article).find('.news-list__image').attr('data-src'),
      url: page(article).find('a').attr('href')
    }
  }).get()
  articlesData.shift()

  return articlesData
}


export {
  getRaceReport,
  getFormula1News,
  getSkyF1News
}