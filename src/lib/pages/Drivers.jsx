import { useState } from 'react'
import { useGlobalStore } from '../../store'
import { Loader, Dropdown } from '../ui'
import Link from 'next/link'
import useSwr from 'swr'
import axios from 'axios'


const Drivers = () => {

  const currentSeason = useGlobalStore(state => state.lastRace.season)
  const seasons = useGlobalStore(state => state.seasons)
  const [season, setSeason] = useState(currentSeason)

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSwr(`api/drivers/grid/${season}`, fetcher)

  
  return (
    <main>
      <section className="container">
        <h1>Drivers</h1>
        <Dropdown type='select'
                    title='season:'
                    list={seasons}
                    defaultItem={currentSeason}
                    setItem={setSeason} />
      
      { !data && !error ? <Loader /> :
        <div className="flex flex-wrap space-x-8 space-y-8 my-10">
        { data.map(driver => {
          return (
            <div className="card">
              <img src={driver.image} className="w-[250px] h-[280px] object-center rounded-t-xl" />
              <p>{driver.driver}</p>
              <p>{driver.number}</p>
              <p>{driver.birth}</p>
            </div>
          )
        })}
        </div>
      }
      </section>
    </main>
  )
}


export default Drivers