import create from 'zustand'
import { persist } from 'zustand/middleware'


let themeStore = set => ({
  theme: null,
  setTheme: (theme) => set(() => ({ theme: theme }))
})

themeStore = persist(themeStore, { name: 'theme' })
const useThemeStore = create(themeStore)


export default useThemeStore