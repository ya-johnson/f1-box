import { useState, useEffect} from 'react'
import Link from 'next/link'
import { Loader, Dropdown, Table} from '../ui'
import useSwr from 'swr'
import axios from 'axios'


const Drivers = () => {

  const [selected, setSelected] = useState()
  const [infoUrls, setInfoUrls] = useState()
  const [statsUrls, setStatsUrls] = useState()

  const fetcher = url => axios.get(url).then(res => res.data)
  const multiFetcher = arr => Promise.all(arr.map( url => axios.get(url).then(res => res.data)))
  // const { data: driversInfo, error: driversInfoError } = useSwr(infoUrls, multiFetcher)
  const { data: driversData, error: driversDataError } = useSwr(statsUrls, multiFetcher)
  const { data: allDrivers, error: allDriversError } = useSwr('api/drivers/all', fetcher)


  useEffect(() => {
    if (selected) {
      const infoUrls = selected.map(selDriver => {
        return `api/drivers/info/${allDrivers.drivers.filter(driver => driver.driver === selDriver)[0].driverId}`
      })
      const statsUrls = selected.map(selDriver => {
        return `api/drivers/stats/${allDrivers.drivers.filter(driver => driver.driver === selDriver)[0].driverId}`
      })

      setInfoUrls(infoUrls)
      setStatsUrls([statsUrls])
    }
  }, [selected])

  useEffect(() => {
    console.log(selected)
    console.log(driversData)
  }, [driversData])


  return (
    <main>
      <section className="container">
        <h1>Drivers</h1>
        <p>Select 1 Driver to see his statistics.</p>
        <p className="mb-4">Select multiple Drivers to preform a comparition.</p>
      { !allDrivers ? <Loader /> :
        <>
          <Dropdown type='multi'
                    className='min-w-[200px] max-w-[800px]'
                    title='Drivers:'
                    list={allDrivers.names}
                    setItem={setSelected} />
    
          <div>
          { allDrivers.drivers.map(driver => {
            return (
              <p className="mb-1">{driver.driver}</p>
            )
          })}
          </div>    
        </>
      }
      </section>
    </main>
  )
}


export default Drivers