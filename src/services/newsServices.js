import cheerio from 'cheerio'


const FORMULA_1_URL = 'https://formula1.com'

const getRaceReport = (html) => {
  const page = cheerio.load(html)
  const title = page('.f1--m').text()
  const image = page('.hero-header > picture').html()
  const reportLink = page('.f1-race-hub--race-review .col-lg-6 > .row a').attr('href')

  return {
    title,
    image: image.split(`"`)[3].split(',')[0],
    reportLink: `${FORMULA_1_URL}${reportLink}`
  }
}

const getFormula1News = (html) => {
  const page = cheerio.load(html)
  const articlesData = page('.f1-latest-listing--grid-item.col-lg-4, #article-list').map((i, article) => {
    const type = page(article).find('.misc--tag').html() 
    const image = page(article).find('picture').html()
    return {
      header: page(article).find('.f1--s').text(),
      type: type.includes('News') ? 'News' : false,
      image: image.split(`"`)[3].split(',')[0],
      url: `${FORMULA_1_URL}${page(article).find('a').attr('href')}`
    }
  }).get()

  const articles = articlesData.filter(article => article.type === 'News').slice(1,4)            
  return articles
}


export {
  getRaceReport,
  getFormula1News
}