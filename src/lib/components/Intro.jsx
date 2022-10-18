import { useEffect } from 'react'
import { useGlobalStore } from '../../store'
import { seasonService, raceService } from '../../services'


const Intro = () => {

  const setLastRace = useGlobalStore(state => state.setLastRace)
  const setNextRace = useGlobalStore(state => state.setNextRace)
  const setSeasons = useGlobalStore(state => state.setSeasons)
  const setSchedules = useGlobalStore(state => state.setSchedules)
  const getRaceInfo = useGlobalStore(state => state.getRaceInfo)

  const getGlobalData = async () => {
    const seasons = await seasonService.getSeasonsList()
    const schedules = await seasonService.getAllSeasonsSchedules()
    const lastRace = await raceService.getLastRace()
    const nextRace = getRaceInfo(schedules, lastRace.season, parseInt(lastRace.round) + 1)

    setSeasons(seasons)
    setLastRace(lastRace)
    setNextRace(nextRace)
    setSchedules(schedules)
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