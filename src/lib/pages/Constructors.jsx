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
                  title='season:'
                  list={seasons}
                  defaultItem={currentSeason}
                  setItem={setSeason} />
        { !data && !error ? <Loader /> :
            <div className="flex flex-wrap space-x-8 space-y-8 my-10">
            { data.map(constructor => {
              return (
                <div className="card p-4">
                  <img src={constructor.image} alt="" />
                  <p>{constructor.constructor}</p>
                  <p>{constructor.nationality}</p>
                  <Link href={constructor.url}><a target="_blank">Wiki</a></Link>
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