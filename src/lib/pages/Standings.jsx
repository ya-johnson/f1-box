import { useState } from 'react'
import { RoundControls } from '../components'
import { Loader, Table } from '../ui'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useSwr from 'swr'
import axios from 'axios'

// fix ticks margin

const Standings = () => {

  const [race, setRace] = useState()

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSwr(race ? `api/standings/${race.season}-${race.round}` : null, fetcher)  

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
                    <ResponsiveContainer>
                      <BarChart data={data.drivers.chart} barCategoryGap={'15%'}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={45} interval={0} />
                        <YAxis dataKey="points"/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="points" fill="#FBBF24" />
                      </BarChart>
                    </ResponsiveContainer>
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
                      <ResponsiveContainer>
                        <BarChart data={data.constructors.chart} barCategoryGap={'15%'}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" angle={45} interval={0} />
                          <YAxis dataKey="points"/>
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="points" fill="#FBBF24" />
                        </BarChart>
                      </ResponsiveContainer>
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