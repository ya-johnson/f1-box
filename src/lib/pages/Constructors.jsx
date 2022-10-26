import { useState } from 'react'
import { useGlobalStore } from '../../store'
import { Loader, Dropdown } from '../ui'
import Link from 'next/link'
import useSwr from 'swr'
import axios from 'axios'


const Constructors = () => {

  const currentSeason = useGlobalStore(state => state.lastRace.season)
  const seasons = useGlobalStore(state => state.seasons)
  const [season, setSeason] = useState(currentSeason)

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSwr(`api/constructors/grid/${season}`, fetcher)
  
  return (
    <main>
      <section className="container">
        <h1>Constructors</h1>
        <Dropdown type='select'
                  className='w-min'
                  title='season:'
                  list={seasons}
                  defaultItem={currentSeason}
                  setItem={setSeason} />
                  
        { !data && !error ? <Loader /> :
            <div className="grid grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 gap-20 my-10">
            { data.map(constructor => {
              return (
                <div className="bg-neutral-300 dark:bg-neutral-700 rounded-xl p-4">
                  <img src={constructor.image} alt="" className="w-full object-center"/>
                  <div className="h-max p-8 space-y-1 rounded-b-xl">
                    <Link href={constructor.url}>
                      <a className="text-3xl font-400 hover:font-semibold duration-75" target="_blank">{constructor.constructor}</a>
                    </Link>
                    <p>{constructor.nationality}</p>
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


export default Constructors