import { useState, useEffect } from 'react'
import { useGlobalStore } from '../../store'
import axios from 'axios'
import { Loader, Dropdown } from '../ui'


const DriversPage = () => {

  const currentSeason = useGlobalStore(state => state.season.season)
  const seasonsList = useGlobalStore(state => state.seasonsList)
  const [drivers, setDrivers] = useState()
  const [season, setSeason] = useState(currentSeason)
  const [loading, setLoading] = useState(true)

  const getDrivers = async () => {
    setLoading(true)
    const response = await axios.get(`/api/drivers/${season}`)
    const drivers = await response.data
    setDrivers(drivers)
    setLoading(false)
  }


  useEffect(() => {
    getDrivers()
  }, [season])

  
  return (
    <main>
      <section className="container">
        <h1>Drivers</h1>
        <Dropdown type='select'
                    title='season:'
                    list={seasonsList.reverse()}
                    defaultItem={currentSeason}
                    setItem={setSeason} />
      
      { loading ? <Loader /> :
        <div className="flex flex-wrap space-x-8 space-y-8 my-10">
        { drivers.map(driver => {
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


export default DriversPage