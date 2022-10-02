import create from 'zustand'


const useCurrentStore = create(set => ({
  dbLastRace : null,
  setDBLastRace: (race) => set(() => ({ dbLastRace: race })),
  currentRace: null,
  setCurrentRace: (race) => set(() => ({ currentRace: race })),
  nextRace : null,
  setNextRace: (race) => set(() => ({ nextRace: race }))
}))



export default useCurrentStore