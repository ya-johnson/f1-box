import { useEffect } from 'react'
import { useCurrentStore } from '../store'
import { dataService } from '../services'


const Intro = () => {

  const setDBLastRace = useCurrentStore(state => state.setDBLastRace)
  const setCurrentRace = useCurrentStore(state => state.setCurrentRace)

  const initApp = async () => {
    const { dbLastRace, currentRace, nextRace } = await dataService.checkLastRace()
    setDBLastRace(dbLastRace)
    setCurrentRace(currentRace)
  }


  useEffect(() => {
    initApp()
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