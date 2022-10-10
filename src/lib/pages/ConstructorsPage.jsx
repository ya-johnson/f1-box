import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useGlobalStore } from '../../store'
import { Loader, Dropdown } from '../ui'


const ConstructorPage = () => {

  const currentSeason = useGlobalStore(state => state.season.season)
  const seasonsList = useGlobalStore(state => state.seasonsList)
  const [constructors, setConstructors] = useState()
  const [season, setSeason] = useState(currentSeason)
  const [loading, setLoading] = useState(true)

  const getConstructors = async () => {
    setLoading(true)
    const response = await axios.get(`/api/constructors/${season}`)
    const constructors = await response.data
    setConstructors(constructors)
    setLoading(false)
  }


  useEffect(() => {
    getConstructors()
  }, [season])

  
  return (
    <main>
      <section className="container">
        <h1>Constructors</h1>
        <Dropdown type='select'
                  title='season:'
                  list={seasonsList}
                  defaultItem={currentSeason}
                  setItem={setSeason} />
        { loading ? <Loader /> :
            <div className="flex flex-wrap space-x-8 space-y-8 my-10">
            { constructors.map(constructor => {
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


export default ConstructorPage