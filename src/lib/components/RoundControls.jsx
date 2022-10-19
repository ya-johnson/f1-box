import { useState, useEffect } from 'react'
import { useGlobalStore } from '../../store'
import { Dropdown } from '../ui'

// fix: limit current season rounds list, set initial to last race

const RoundControls = ({ setRace }) => {

  const lastRace = useGlobalStore(state => state.lastRace)
  const seasons = useGlobalStore(state => state.seasons)
  const schedules = useGlobalStore(state => state.schedules)
  const getSeasonSchedule = useGlobalStore(state => state.getSeasonSchedule)
  const [season, setSeason] = useState(lastRace.season)
  const [round, setRound] = useState(lastRace.round)
  const [seasonSchedule, setSeasonSchedule] = useState()

  const mapRounds = () => {
    const schedule = getSeasonSchedule(schedules, season)
    const rounds = schedule.map(race => `${race.round}-${race.name}`)
    setSeasonSchedule(rounds)
    setRound(rounds[0])
  }


  useEffect(() => {
    mapRounds()
  }, [season])

  useEffect(() => {
    const roundNumber = round.split('-')[0]
    setRace({ season, round: roundNumber })
  }, [round])


  return (
    <div className="flex space-x-8">

      <Dropdown type='select'
                title='Season:'
                list={seasons}
                defaultItem={season}
                setItem={setSeason} />

      {seasonSchedule && <Dropdown type='select'
                title='Round:'
                list={seasonSchedule}
                defaultItem={round}
                setItem={setRound} />}

    </div>
  )
}


export default RoundControls