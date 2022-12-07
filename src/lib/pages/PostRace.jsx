import { useState } from 'react'
import { RoundControls } from '../components'
import { Loader, Table } from '../ui'
import { colors } from '../../utils'
import { LineChart, Line, BarChart, Bar, 
         XAxis, YAxis, CartesianGrid, Tooltip,
         Legend, ResponsiveContainer } from 'recharts'
import useSwr from 'swr'
import axios from 'axios'

// fix sprint
// fix ticks margin - standings

const PostRace = () => {

  const [race, setRace] = useState()
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data: raceData } = useSwr(race ? `api/races/${race.season}-${race.round}` : null, fetcher)
  const { data: standings } = useSwr(race ? `api/standings/${race.season}-${race.round}` : null, fetcher)  


  return (
    <main>
      <section className="container">
        { raceData && <h1>{`Season: ${race.season} Round: ${race.round}`}</h1>}
        <RoundControls setRace={setRace} />
        { !raceData ? <Loader /> :
          <>
            <div className="flex space-x-20">
              <div>
                <p className="font-semibold text-4xl mb-2">Results</p>
                <Table cols={Object.keys(raceData.results.table[0])}
                       rows={raceData.results.table} />
              </div>
              <div>
                <p className="font-semibold text-4xl mb-2">Qualifying</p>
                <Table cols={Object.keys(raceData.qualify.table[0])}
                       rows={raceData.qualify.table} />
              </div>
            </div>
            <div className="w-full">
              <p className="font-semibold text-4xl mb-2">Standings</p>
              <div className="mb-10">
                <p className="font-semibold text-3xl mb-2">Drivers</p>
                <div className="flex">
                  <Table cols={Object.keys(standings.drivers.standings[0])} 
                         rows={standings.drivers.standings} 
                         width={'min-w-[600px]'}/>
                  <div className="w-full flex justify-center">
                    <ResponsiveContainer>
                      <BarChart data={standings.drivers.chart} barCategoryGap={'15%'}>
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
              <p className="font-semibold text-3xl mb-2">Constructors</p>
                <div className="flex">
                  <Table cols={Object.keys(standings.constructors.standings[0])} 
                         rows={standings.constructors.standings} 
                         width={'min-w-[400px]'}/>
                  <div className="w-full flex justify-center">
                    <div className="w-2/5">
                      <ResponsiveContainer>
                        <BarChart data={standings.constructors.chart} barCategoryGap={'15%'}>
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
            </div>
            <div className="w-full my-14">
              <p className="font-semibold text-3xl">Position per Lap</p>
              <p className="mb-8">Each driver position on every Lap of the Race</p>
              <ResponsiveContainer height={800}>
                <LineChart data={raceData.laps.positionPerLap} margin={{ left: -30, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" interval={0}/>
                  <YAxis reversed={true}/>
                  <Tooltip />
                  <Legend />
                  {Object.keys(raceData.laps.positionPerLap[0]).map((driver, index) => {
                    if (index > 0) {
                      return (
                        <Line type="monotone" dataKey={driver} stroke={colors.random[index]} strokeWidth={4}/>
                      )
                    }
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full my-14">
              <p className="font-semibold text-3xl">Lap Times</p>
              <p className="mb-8">Lap times getting faster as fuel tank empties.</p>
              <ResponsiveContainer height={800}>
                <LineChart data={raceData.laps.lapsInMillis} margin={{ left: 0, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" interval={0}/>
                  <YAxis reversed={true} domain={['dataMin - 2000', 'dataMax + 2000']} />
                  <Tooltip />
                  <Legend />
                  {Object.keys(raceData.laps.lapsInMillis[0]).map((driver, index) => {
                    if (index > 0) {
                      return (
                        <Line type="monotone" dataKey={driver} stroke={colors.random[index]} strokeWidth={2} />
                      )
                    }
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        }
      </section>
    </main>

  )
}


export default PostRace