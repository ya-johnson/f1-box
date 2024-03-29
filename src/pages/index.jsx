import Link from 'next/link'
import { seasonService, raceService, newsService, resultService } from '../services'
import { Table } from '../lib/ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import { BsGraphUp } from 'react-icons/bs'
import { GiFullMotorcycleHelmet } from 'react-icons/gi'
import { MdGroups } from 'react-icons/md'
import Flag from 'react-world-flags'
import 'swiper/css'
import 'swiper/css/pagination'


export const getServerSideProps = async () => {
  const season = await seasonService.getSeasonSchedule()
  const lastRace = await raceService.getLastRace()
  const results = await resultService.getResults(lastRace.season, lastRace.round)
  const podium = resultService.mapPodium(results)
  const report = await newsService.getRaceReport(lastRace.season, lastRace.circuitId)
  const F1News = await newsService.getFormula1News()
  const skyF1News = await newsService.getSkyF1News()
  const motorsportF1News = await newsService.getMotorsportNews()

  return {
    props: {
      season,
      lastRace,
      results,
      podium,
      report,
      news: [
        { title: 'Offical Formula 1', articles: F1News }, 
        { title: 'Sky Sports F1', articles: skyF1News },
        { title: 'Motorsport F1', articles: motorsportF1News }
      ]
    }
  }
}

const Home = ({ season,
                lastRace,
                results,
                podium,
                report,
                news
              }) => {

  return (
    <main className="lg:mt-0 lg:mb-20">
      <section className="container flex items-center justify-between space-x-6 h-[90vh] pb-20 
                          lg:flex-col-reverse lg:justify-end lg:space-x-0 lg:px-0 lg:pb-0">
        <div className="w-1/2 lg:w-full lg:flex lg:flex-col lg:items-center lg:justify-center lg:px-4 lg:text-center">
          <div className="flex items-center space-x-2">
            <p className="mute-text text-xl lg:text-base">
            {`Last Race: Round ${lastRace.round} - ${lastRace.name}`}
            </p> 
            <Flag code={lastRace.country.slice(0,3)} className="h-5"/>
          </div>

          <h1>{report.title}</h1>
          <Table cols={Object.keys(podium[0])} rows={podium} />

          <div className="flex space-x-6 sm:flex-col-reverse sm:space-x-0 sm:space-y-reverse sm:space-y-4">
            <Link href={'/PostRace'}><a className="btn amber-btn sdw">Results and Analytics</a></Link>
            <Link href={report.reportLink}><a className="btn neutral-btn sdw" target="_blank">Officel Formula 1 Race Report</a></Link>
          </div>
        </div>

        <Link href={report.url} >
          <a className="hover:-translate-y-2 sdw lg:w-screen lg:mb-8" target="_blank">
            <img src={report.image} className="w-[60vw] lg:w-full lg:max-h-[45vh]"/>
          </a>
        </Link>
      </section>  

      <section className="container  mb-14">
        <div>
          <div className="text-center mb-10">
            <h2>F1 Data made Easy</h2>
            <p>In depth Analytics about Races, Drivers, Constructors and more.<br/>
              Easy to use, all graphics are free to Download (no copyrights restrictions).
            </p>
          </div>
          <div className="flex items-center justify-center space-x-20 mb-12 md:flex-col md:space-x-0 md:space-y-6">
            <div className="max-w-[340px]">
              <div className="flex items-center space-x-4 pb-4">
                <BsGraphUp className="h-6 w-6"/>
                <Link href='/PostRace'><a className="text-xl font-medium">Post Race</a></Link>
              </div>
              <p>
                Discover how One standout over the other. <br/>
                What makes One strong and who is likely to.
              </p>
            </div>

            <div className="max-w-[340px]">
              <div className="flex items-center space-x-4 pb-4">
                <GiFullMotorcycleHelmet className="h-6 w-6"/>
                <Link href='/Drivers'><a className="text-xl font-medium">Drivers</a></Link>
              </div>
              <p>
                Discover how One standout over the other. <br/>
                What makes One strong and who is likely to.
              </p>
            </div>
            <div className="max-w-[340px]">
              <div className="flex items-center space-x-4 pb-4">
                <MdGroups className="h-6 w-6"/>
                <Link href='/Constructors'><a className="text-xl font-medium">Constructors</a></Link>
              </div>
              <p>
                Enroll full Race or Qualifying season. <br/>
                Recap highlights on more abstract manner.
              </p>
            </div>
          </div>
        </div>

        <Swiper slidesPerView={5}
                spaceBetween={40}
                initialSlide={lastRace.round}
                pagination={{clickable: true}}
                modules={[Pagination]}
                breakpoints={{
                  100: {slidesPerView: 1, slidesPerGroup: 1},
                  480: {slidesPerView: 2, slidesPerGroup: 2},
                  767: {slidesPerView: 3, slidesPerGroup: 3},
                  1023: {slidesPerView: 4, slidesPerGroup: 4},
                }}>
          {season.schedule.map(race => {
            return (
            <SwiperSlide>
              <div className={`h-[200px] p-4 bg-white dark:bg-neutral-900
                              ${race.round === lastRace.round &&
                              'bg-amber-400 dark:bg-amber-400 text-neutral-900'}`}>
                <p className="text-lg font-semibold">{race.name}</p>
                <p>Round: {race.round}</p>
                <p>Country: {race.country}</p>
                <p>Circuit: {race.circuit}</p>
                <p>Date: {race.date}</p>
                <p>Time: {race.time}</p>
              </div>
            </SwiperSlide>
            )
          })}
        </Swiper>
      </section>

      <section className="container py-12">
        <div className="brd border-b  mb-8">
          <h2>F1 News</h2>
        </div>
        {news.map(source => {
          return (
            <div className="mb-6">
              <h3 className="mb-6">{source.title}</h3>
              <Swiper spaceBetween={40} 
                      slidesPerView={4}
                      slidesPerGroup={4}
                      pagination={{clickable: true}}
                      modules={[Pagination]}
                      breakpoints={{
                        100: {slidesPerView: 1, slidesPerGroup: 1},
                        550: {slidesPerView: 2, slidesPerGroup: 2},
                        991: {slidesPerView: 3, slidesPerGroup: 3},
                        1140: {slidesPerView: 4, slidesPerGroup: 4},
                      }}>
                {source.articles.map(article => {
                  return (
                    <SwiperSlide>
                      <Link href={article.url} >
                        <a className="hover:-translate-y-1" target="_blank">
                          <div className="text-left sdw">
                            <div className="p-0">
                              <img src={article.image} className="w-full h-60"/>
                            </div>
                            <div className="h-40 md:h-48 p-4 bg-white dark:bg-neutral-900">
                              {/* <span>{article.type}</span> */}
                              <p className="text-xl font-medium">{article.header}</p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          )
        })}
      </section>
    </main>
  )
}


export default Home