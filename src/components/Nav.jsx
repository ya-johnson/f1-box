import { useEffect } from 'react'
import Link from 'next/link'
import { useCurrentStore, useThemeStore } from '../store'
import { BsSun, BsMoon } from 'react-icons/bs'


const Nav = () => {

  const lastRace = useCurrentStore(state => state.lastRace)
  const nextRace = useCurrentStore(state => state.nextRace)
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }

  const initTheme = () => {
    if (theme === 'light' && (window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.remove('dark')
      setTheme('light')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      setTheme('dark')
    }
  }


  useEffect(() => {
    initTheme()
  }, [])


  return (
      
    <nav>
      <div className="container">
        <Link href='/'>
          <a>
            F1 box
          </a>
        </Link>

        <div className="nav-right">
          { theme === 'dark' ? 
              <BsSun className="icon"
                      onClick={toggleTheme} />
              : 
              <BsMoon className="icon"
                     onClick={toggleTheme} />
          }
        </div>

      </div>
    </nav>
  )
}


export default Nav