import create from 'zustand'


const useGlobalStore = create(set => ({
  lastRace: null,
  setLastRace: (race) => set(() => ({ lastRace: race })),
  nextRace : null,
  setNextRace: (race) => set(() => ({ nextRace: race })),
  seasons: null,
  setSeasons: (list) => set(() => ({ seasons: list })),
  schedules: null,
  setSchedules: (schedules) => set(() => ({ schedules: schedules }))
}))


export default useGlobalStore