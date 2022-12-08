import { useState, useEffect} from 'react'
import Link from 'next/link'
import { Loader, Dropdown, Table} from '../ui'
import useSwr from 'swr'
import axios from 'axios'


const Drivers = () => {

  const [selected, setSelected] = useState()
  const [drivers, setDrivers] = useState()

  const fetcher = url => axios.get(url).then(res => res.data)
  const multiFetcher = drivers => {
    Promise.all(drivers.map(driver => axios.get(`api/drivers/stats/${driver.driverId}`).then(res => res.data)))
  }
  const { data: driversData, error: driversDataError } = useSwr(drivers, multiFetcher)
  const { data: allDrivers, error: allDriversError } = useSwr('api/drivers/all', fetcher)


  useEffect(() => {
    if (selected) {
      const drivers = selected.map(selectedDriver => allDrivers.drivers.filter(driver => driver.driver === selectedDriver)[0])
      setDrivers([drivers])
    }
  }, [selected])

  useEffect(() => {
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