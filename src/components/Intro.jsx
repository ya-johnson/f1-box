import { useState, useEffect } from 'react'
import { useCurrentStore } from '../store'
import { dbService } from '../services'
import axios from 'axios'
// load 'current'

const Intro = () => {

  const setLastRace = useCurrentStore(state => state.setLastRace)

  const initApp = async () => {
    const lastRace = await axios.get('/api/data/verify')
    setLastRace(lastRace)
    document.querySelector('.intro').classList.add('hidden')
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