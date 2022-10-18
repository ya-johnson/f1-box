import create from 'zustand'

// seasons: { sesaon, schedule, grid, constructors }

const getSeasonScehdule = (schedules, year) => {
  const season = schedules.filter(season => season.season == year)
  return season[0].schedule
}

const getRaceInfo = (schedules, year, round) => {
  const season = schedules.filter(season => season.season == year)
  const raceInfo = season[0].schedule.filter(race => race.round == round)
  return raceInfo[0]
}

const useGlobalStore = create(set => ({
  lastRace: null,
  setLastRace: (race) => set(() => ({ lastRace: race })),
  nextRace : null,
  setNextRace: (race) => set(() => ({ nextRace: race })),
  seasons: null,
  setSeasons: (list) => set(() => ({ seasons: list })),
  schedules: null,
  setSchedules: (schdules) => set(() => ({ schdules: schdules })),
  getSeasonScehdule,
  getRaceInfo
}))


export default useGlobalStore