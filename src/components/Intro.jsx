import { useEffect } from 'react'
import { useGlobalStore } from '../store'
import { seasonService, raceService } from '../services'


const Intro = () => {

  const setSeasonsList = useGlobalStore(state => state.setSeasonsList)
  const setSeason = useGlobalStore(state => state.setSeason)
  const setLastRace = useGlobalStore(state => state.setLastRace)
  const setNextRace = useGlobalStore(state => state.setNextRace)

  const getGlobalData = async () => {
    const seasonsList = await seasonService.getSeasonsList() 
    const season = await seasonService.getSeasonSchdule()
    const lastRace = await raceService.getLastRace()
    const nextRace = season.schdule[lastRace.round]
    setSeasonsList(seasonsList)
    setSeason(season)
    setLastRace(lastRace)
    setNextRace(nextRace)
  }


  useEffect(() => {
    getGlobalData()
  },[])


  return (
    <div className="intro h-full w-full fixed top-0 left-0
                    flex flex-col items-center justify-center 
                    bg-stone-900 z-50">
      <h1 className="text-9xl text-stone-300 animate-pulse">F1 box</h1>
      <p className="text-2xl text-stone-400 animate-pulse">Loading ...</p>
    </div>
  )
}


export default Intro