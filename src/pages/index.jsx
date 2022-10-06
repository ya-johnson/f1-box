import { HomeHero ,HomeInfo, HomeNews } from '../components'
import { seasonService,
         raceService,
         newsService,
         resultService } from '../services'


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

  console.log(lastRace)

  return {
    props: {
      season,
      lastRace,
      results,
      podium,
      report,
      F1News
    }
  }
}

const Home = ({
  season,
  lastRace,
  results,
  podium,
  report,
  F1News
}) => {


  return (
    <main>
      <HomeHero lastRace={lastRace}
                podium={podium}
                report={report} />
      <HomeInfo />
      <HomeNews articles={F1News} />
    </main>
  )
}


export default Home