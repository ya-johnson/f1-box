import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useCurrentStore } from '../store'
import { resultService } from '../services'
import { Table, Loader } from './'
import Flag from 'react-world-flags'


const HomeHero = () => {

  const lastRace = useCurrentStore(state => state.lastRace)
  const [raceInfo, setRaceInfo] = useState()
  const [podium, setPodium] = useState()
  const [loading, setLoading] = useState(true)


  const getPodium = async () => {
    const response = await resultService.getLastResults()
    const results = response.map(result => {
      return {
        position: result.position,
        driver: `${result.Drivers.forename} ${result.Drivers.surname}`,
        time: result.time,
        points: result.points,
      }
    }).sort((a,b) => b.points - a.points).slice(0,3)
    return results
  }

  const initSection = async () => {
    const response = await axios.get(`/api/news/race/${lastRace.year}-${lastRace.Circuits.country}`)
    const raceInfo = await response.data
    const podium = await getPodium()
    setRaceInfo(raceInfo)
    setPodium(podium)
    setLoading(false)
  }


  useEffect(() => {
    if (lastRace) {
      initSection()
    } else {
      return
    }
    
  }, [lastRace])


  return (
    <>
    { loading ? <Loader /> :
      <div className="container flex items-center justify-between space-x-6 h-[90vh] pb-20">
        <div className="w-1/2">
          { lastRace &&
          <div className="flex items-center space-x-2">
            <p className="mute-text text-xl">
            {`Last Race: Round ${lastRace.round} - ${lastRace.name}`}
            </p> 
            <Flag code={lastRace.Circuits.country.slice(0,3)} className="h-5"/>
          </div>
          }
    
          <h1>{raceInfo.title}</h1>
          <Table cols={Object.keys(podium[0])} rows={podium} />
    
          <div className="flex space-x-6">
            <Link href={'/Races'}>
              <a className="btn amber-btn">Results and Analytics</a>
            </Link>
            <Link href={raceInfo.reportLink}>
              <a className="btn neutral-btn" target="__blank">Officel Formula 1 Race Report</a>
            </Link>
          </div>
        </div>

        <Link href={raceInfo.url} >
          <a className="hover:-translate-y-2" target="__blank">
            <img src={raceInfo.image} className="w-[60vw]"/>
          </a>
        </Link>
      </div>
    }
    </>
  )
}


export default HomeHero