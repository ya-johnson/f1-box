import { seasonService,
         raceService,
         newsService,
         resultService } from '../services'
import { Hero,
         Info,
         News } from '../lib/pages/Home'


export const getServerSideProps = async () => {
  const season = await seasonService.getSeasonSchdule()
  const lastRace = await raceService.getLastRace()
  const nextRace = season.schdule[lastRace.round]
  const results = await resultService.getResults(lastRace.season, lastRace.round)
  const podium = results.map(result => {
    return {
      position: result.position,
      driver: result.driver,
      time: result.time,
      points: result.points,
    }
  }).sort((a,b) => b.points - a.points).slice(0,3)
  const report = await newsService.getRaceReport(lastRace.season, lastRace.country)
  const F1News = await newsService.getFormula1News()
  const skyF1News = await newsService.getSkyF1News()

  return {
    props: {
      season,
      lastRace,
      results,
      podium,
      report,
      F1News,
      skyF1News
    }
  }
}

const Home = ({
  season,
  lastRace,
  results,
  podium,
  report,
  F1News,
  skyF1News
}) => {


  return (
    <main>
      <Hero lastRace={lastRace}
                podium={podium}
                report={report} />
      <Info schdule={season.schdule}
            lastRace={lastRace} />
      <section className="container py-12">
        <div className="brd border-b  mb-8">
          <h2>F1 News</h2>
        </div>
        <News title='Officel Formula 1'
              articles={F1News} />
        <News title='Sky Sports F1'
              articles={skyF1News} />
      </section>
    </main>
  )
}


export default Home