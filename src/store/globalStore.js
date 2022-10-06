import create from 'zustand'


const useGlobalStore = create(set => ({
  seasonsList: null,
  setSeasonsList: (list) => set(() => ({ seasonsList: list })),
  season: null,
  setSeason: (schdule) => set(() => ({ season: schdule })),
  lastRace: null,
  setLastRace: (race) => set(() => ({ lastRace: race })),
  nextRace : null,
  setNextRace: (race) => set(() => ({ nextRace: race }))
}))


export default useGlobalStore