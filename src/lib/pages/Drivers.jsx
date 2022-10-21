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
        <div>
          <Dropdown type='select'
                    title='season:'
                    list={seasons}
                    defaultItem={currentSeason}
                    setItem={setSeason} />
        </div>
      
      { !data && !error ? <Loader /> :
        <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-20 my-10">
        { data.map(driver => {
          return (
            <div className="bg-neutral-300 dark:bg-neutral-700 rounded-xl">
              <img src={driver.image} className="w-full h-[360px] object-center rounded-t-xl" />
              <div className="h-max p-8 space-y-1 rounded-b-xl">
                <Link href={driver.url} target="_blank">
                  <a className="text-3xl font-400 hover:font-semibold duration-75">{driver.driver}</a>
                </Link>
                <p>{`Number: ${driver.number}`}</p>
                <p>{`Date of Birth: ${driver.birth}`}</p>
              </div>
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