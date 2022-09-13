import { useState, useEffect } from 'react'
import { raceService } from '../services'

const Home = () => {

  const [lastRaceId, setLastRaceId] = useState()

  const initApp = async () => {
    // const lastRaceId = await raceService.getLastRace()
    // setLastRaceId(lastRaceId)
  }
  

  useEffect(() => {

    initApp()
  },[])


  return (
      <div className="container">
        <h1>Hello there</h1>
        <p>some regular text</p>
       
      </div>
  )
}


export default Home