import { useState, useEffect } from 'react'
import { useGlobalStore } from '../store'
import { standingsService } from '../services'
import { Table, Loader } from './'


const StandingsPage = () => {

  const lastRace = useGlobalStore(state => state.lastRace)
  const [driverStandings, setDriverStandings] = useState()
  const [constructorStandings, setConstructorStandings] = useState()
  const [loading, setLoading] = useState(true)

  const getStandings = async () => {
    const driverStandings = await standingsService.getDriverStandings(lastRace.season, lastRace.round)
    const constructorStandings = await standingsService.getConstructorStandings(lastRace.season, lastRace.round)

    setDriverStandings(driverStandings)
    setConstructorStandings(constructorStandings)
    setLoading(false)
  }


  useEffect(() => {
    getStandings()
  }, [])
  

  return (
    <main>
    { loading ? <Loader /> :
      <section className="container">
        <div className="flex flex-col">
          <div className="flex items-center space-x-4">
            <h1>Standings</h1>
            <p className="text-2xl">{`Season: ${lastRace.season} round: ${lastRace.round}`}</p>
          </div>
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
      </section>
    }
    </main>
  )
}


export default StandingsPage