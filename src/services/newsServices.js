import cheerio from 'cheerio'

const getRaceReport = (html) => {
  const page = cheerio.load(html)
  const title = page('.f1--m').text()
  const image = page('.hero-header > picture').html()
  const reportLink = page('.f1-race-hub--race-review .col-lg-6 > .row a').attr('href')
  
  console.log(reportLink)
  return {
    title,
    image: image.split(`"`)[3].split(',')[0],
    reportLink: `https://formula1.com${reportLink}`
  }
}


export {
  getRaceReport
}