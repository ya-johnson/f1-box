import create from 'zustand'
import { persist } from 'zustand/middleware'


let currentStore = set => ({
  lastRace: null,
  setLastRace: (race) => set(() => ({ lastRace: race })),
  nextRace : null,
  setNextRace: (race) => set(() => ({ nextRace: race })),
})

currentStore = persist(currentStore, { name: 'current' })
const useCurrentStore = create(currentStore)


export default useCurrentStore