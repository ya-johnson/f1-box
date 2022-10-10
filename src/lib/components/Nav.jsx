import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobalStore, useThemeStore } from '../../store'
import { BsSun, BsMoon } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'
import Flag from 'react-world-flags'


const Nav = () => {

  const nextRace = useGlobalStore(state => state.nextRace)
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)
  const [menu, setMenu] = useState(false)

  const styleLink = (path) => {
    const router = useRouter()

    if (router.pathname === path) {
      return 'text-amber-400'
    } else {
      return 'hover:text-amber-400'
    }
  }

  const toggleMenu = () => {
    !menu ? setMenu(true) : setMenu(false)
  }

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
      
    <nav className="sticky w-screen flex justify-center mb-14 h-16 z-30
                  bg-neutral-200 dark:bg-neutral-800 brd border-b">
      <div className="container flex items-center justify-between">
        
        <div className="flex items-center space-x-12 lg:space-x-0">
          <Link href='/'>
            <a className="font-Russo-one text-3xl hover:text-amber-400">F1 box</a>
          </Link>
          <div className={`space-x-8 lg:absolute lg:top-[65px] lg:left-full 
                           lg:h-[calc(100vh-65px)] lg:w-screen
                           lg:flex lg:flex-col p-4
                           lg:bg-neutral-300 lg:dark:bg-neutral-900 
                           lg:space-y-6 lg:space-x-0 ${menu && 'lg:left-0'}`}>
            <Link href='/Races'><a className={styleLink('/Races')}>Races</a></Link>
            <Link href='/Standings'><a className={styleLink('/Standings')}>Standings</a></Link>
            <Link href='/Drivers'><a className={styleLink('/Drivers')}>Drivers</a></Link>
            <Link href='/Constructors'><a className={styleLink('/Constructors')}>Constructors</a></Link>
            <Link href='/Compare'><a className={styleLink('/Compare')}>Compare</a></Link>
            <Link href='/RaceSim'><a className={styleLink('/RaceSim')}>Race Sim</a></Link>
            <Link href='/About'><a className={styleLink('/About')}>About</a></Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          { theme === 'dark' ? 
              <BsSun className="icon"
                      onClick={toggleTheme} />
              : 
              <BsMoon className="icon"
                     onClick={toggleTheme} />
          }
          <FiMenu className={`icon hidden lg:block ${menu && 'lg:rotate-90'}`}
                  onClick={toggleMenu}/>
          <div className="flex items-center space-x-2 py-1 px-2 brd border rounded-md">
            <Flag code={nextRace.country.slice(0,3)} className="h-5"/>
            <p>{`${nextRace.country}: ${nextRace.time}`}</p>
          </div>
        </div>

      </div>
    </nav>
  )
}


export default Nav