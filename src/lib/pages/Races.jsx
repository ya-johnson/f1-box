import { useState, useEffect } from 'react'
import { RoundControls } from '../components'
import { Loader, Table } from '../ui'
import { colors } from '../../utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import useSwr from 'swr'
import axios from 'axios'


const Races = () => {

  const [race, setRace] = useState()
  const [raceData, setRaceData] = useState()

  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSwr(race ? `api/races/${race.season}-${race.round}` : null, fetcher)

  const mapData = () => {
    const { results, qualify, drivers, laps, pits } = data

    const resultsTable = results.map(result => {
      return {
        position: result.position,
        driver: result.driver,
        constructor: result.constructor,
        time: result.time,
        status: result.status,
        points: result.points
      }
    })

    const qualifyTable = qualify.map(result => {
      return {
        position: result.position,
        driver: result.driver,
        constructor: result.constructor,
        Q1: result.Q1,
        Q2: result.Q2,
        Q3: result.Q3
      }
    })

    const positionPerLap = laps.map(lap => {
      const lapNumber = {
        name: lap.number
      }
      lap.Timings.forEach((driverTime, index) => {
        lapNumber[driverTime.driverId] = driverTime.position
      })
      return lapNumber
    })
    

    const raceData = {
      results: {
        table: resultsTable
      },
      qualify: {
        table: qualifyTable
      },
      positionPerLap
    }
    console.log(raceData, laps, Object.keys(raceData.positionPerLap[0]))
    setRaceData(raceData)
  }

  useEffect(() => {
    if (data) {
      mapData()
    }
  }, [data])

  return (
    <div className="container">
      { data && <h1>{`Season: ${race.season} Round: ${race.round}`}</h1>}
      <RoundControls setRace={setRace} />
      { !raceData ? <Loader /> :
        <>
          <div className="flex space-x-20">
            <Table cols={Object.keys(raceData.results.table[0])}
                  rows={raceData.results.table} />
            <Table cols={Object.keys(raceData.qualify.table[0])}
                  rows={raceData.qualify.table} />
          </div>
          <div className="w-full my-14">
            <ResponsiveContainer height={800}>
              <LineChart data={raceData.positionPerLap}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0}/>
                <YAxis reversed={true}/>
                <Tooltip />
                <Legend />
                {Object.keys(raceData.positionPerLap[0]).map((driver, index) => {
                  if (index > 0) {
                    return (
                      <Line type="monotone" dataKey={driver} stroke={colors.random[index]} strokeWidth={4}/>
                    )
                  }
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      }
    </div>
  )
}


export default Races