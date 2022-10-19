import { useState } from 'react'
import { RoundControls } from '../components'
import { Loader, Table } from '../ui'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import useSwr from 'swr'
import axios from 'axios'


const Standings = () => {

  const [race, setRace] = useState()

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSwr(race ? `api/standings/${race.season}-${race.round}` : null, fetcher)

  ChartJS.register(ArcElement, Tooltip, Legend)
  

  return (
    <main>
      <section className="container my-20">
        <div className="flex flex-col">

          <div className="flex items-center space-x-4">
            <h1>Standings</h1>
            {race && <p className="text-2xl">{`Season: ${race.season} round: ${race.round}`}</p>}
          </div>
          <RoundControls setRace={setRace} />
          { !data && !error ? <Loader/> :
            <>
              <div className="mb-10">
                <h2>Drivers</h2>
                <div className="flex">
                  <Table cols={Object.keys(data.drivers.standings[0])} 
                        rows={data.drivers.standings} 
                        width={'min-w-[600px]'}/>
                  <div className="w-full flex justify-center">
                    <div className="w-2/3">
                      <Pie data={data.drivers.chart} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h2>Constructors</h2>
                <div className="flex">
                  <Table cols={Object.keys(data.constructors.standings[0])} 
                        rows={data.constructors.standings} 
                        width={'min-w-[400px]'}/>
                  <div className="w-full flex justify-center">
                    <div className="w-2/5">
                      <Pie data={data.constructors.chart} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </div>
      </section>
    </main>
  )
}


export default Standings