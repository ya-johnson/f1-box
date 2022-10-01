import { useState, useEffect } from 'react'
import { useCurrentStore } from '../store'
import { standingsService } from '../services'
import { Table, Loader } from './'


const StandingsTable = () => {

  const lastRace = useCurrentStore(state => state.lastRace)
  const [offset, setOffset] = useState(lastRace.raceId)
  const [driverStandings, setDriverStandings] = useState()
  const [constructorStandings, setConstructorStandings] = useState()
  const [loading, setLoading] = useState(true)

  const getStandings = async () => {
    const driversData = await standingsService.getDriverStandings(offset)
    const constructorData = await standingsService.getConstructorStandings(offset)
    
    const driverStandings = driversData.map(driver => {
      return {
        round: driver.Races.round,
        driver: `${driver.Drivers.forename} ${driver.Drivers.surname}`,
        position: driver.position,
        wins: driver.wins,
        points: driver.points
      }
    }).sort((a,b) => b.points - a.points)
    
    const constructorStandings = constructorData.map(constructor => {
      return {
        round: constructor.Races.round,
        constructor: constructor.Constructors.name,
        position: constructor.position,
        wins: constructor.wins,
        points: constructor.points
      }
    }).sort((a,b) => b.points - a.points)

    setDriverStandings(driverStandings)
    setConstructorStandings(constructorStandings)
    setLoading(false)
  }


  useEffect(() => {
    getStandings()
  }, [])
  

  return (
    <>
    { loading ? <Loader /> :
      <div className="flex flex-col">
        <div>
          <h2>Drivers</h2>
          {driverStandings && <Table cols={Object.keys(driverStandings[0])} 
                                     rows={driverStandings} 
                                     width='w-full' />}
        </div>
        <div>
        <h2>Constructors</h2>
          {constructorStandings && <Table cols={Object.keys(constructorStandings[0])} 
                                          rows={constructorStandings} 
                                          width='w-full' />}
        </div>
      </div>
    }
    </>
  )
}


export default StandingsTable