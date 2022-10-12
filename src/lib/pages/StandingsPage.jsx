import { useState, useEffect } from 'react'
import { useGlobalStore } from '../../store'
import { standingsService } from '../../services'
import { Dropdown , Loader, Table } from '../ui'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'


const StandingsPage = () => {

  const lastRace = useGlobalStore(state => state.lastRace)
  const [driverStandings, setDriverStandings] = useState()
  const [constructorStandings, setConstructorStandings] = useState()
  const [driversChartData, setDriversChartData] = useState()
  const [constructorsChartData, setConstructorsChartData] = useState()
  const [loading, setLoading] = useState(true)

  const setChartData = (type, standings) => {
    if (type === 'drivers') {
      const data = {
        labels: standings.map(driver => driver.driver),
        datasets: [{
          data: standings.map(driver => driver.points)
        }]
      }
      return data
    } 
    else if (type === 'constructors') {
      const data = {
        labels: standings.map(constructor => constructor.constructor),
        datasets: [{
          data: standings.map(constructor => constructor.points)
        }]
      }
      return data
    }
  }

  const getStandings = async () => {
    const driverStandings = await standingsService.getDriverStandings(lastRace.season, lastRace.round)
    const constructorStandings = await standingsService.getConstructorStandings(lastRace.season, lastRace.round)

    setDriverStandings(driverStandings)
    setConstructorStandings(constructorStandings)
    setDriversChartData(setChartData('drivers', driverStandings))
    setConstructorsChartData(setChartData('constructors', constructorStandings))
    setLoading(false)
  }

  ChartJS.register(ArcElement, Tooltip, Legend)


  useEffect(() => {
    getStandings()
  }, [])
  

  return (
    <main>
    { loading ? <Loader /> :
      <section className="container my-20">
        <div className="flex flex-col">

          <div className="flex items-center space-x-4">
            <h1>Standings</h1>
            <p className="text-2xl">{`Season: ${lastRace.season} round: ${lastRace.round}`}</p>
          </div>

          <div className="mb-10">
            <h2>Drivers</h2>
            <div className="flex">
              <Table cols={Object.keys(driverStandings[0])} 
                     rows={driverStandings} 
                     width={'min-w-[600px]'}/>
              <div className="w-full flex justify-center">
                <div className="w-2/3">
                  <Pie data={driversChartData} />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2>Constructors</h2>
            <div className="flex">
              <Table cols={Object.keys(constructorStandings[0])} 
                     rows={constructorStandings} 
                     width={'min-w-[400px]'}/>
              <div className="w-full flex justify-center">
                <div className="w-2/5">
                  <Pie data={constructorsChartData} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    }
    </main>
  )
}


export default StandingsPage