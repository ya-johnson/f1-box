import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useGlobalStore, useThemeStore } from '../../store'
import { BsSun, BsMoon, BsGithub } from 'react-icons/bs'
import { FiMenu } from 'react-icons/fi'
import Flag from 'react-world-flags'


const Nav = () => {

  const nextRace = useGlobalStore(state => state.nextRace)
  const theme = useThemeStore(state => state.theme)
  const setTheme = useThemeStore(state => state.setTheme)
  const [menu, setMenu] = useState(false)
  const [counter, setCounter] = useState()

  const styleLink = (path) => {
    const router = useRouter()

    if (router.pathname === path) {
      return 'text-amber-400'
    } else {
      return 'hover:text-amber-400'
    }
  }

  const countdwon = () => {
    const remaining = new Date(`${nextRace.date} ${nextRace.time}`) - new Date()
    const counter = {
      days: Math.floor(remaining / (1000 * 60 * 60 * 24)),
      hours: Math.floor(remaining / (1000 * 60 * 60)) % 24,
      minutes: Math.floor(remaining / (1000 * 60)) % 60,
      seconds: Math.floor(remaining / 1000) % 60
    }
    setCounter(counter)
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


  setInterval(countdwon, 1000)

  useEffect(() => {
    initTheme()
    if (nextRace.date) countdwon()
  }, [])


  return (
      
    <nav className="sticky top-0 left-0 w-screen flex justify-center h-16 z-30
                    bg-white dark:bg-neutral-900 brd border-b">
      <div className="w-full px-4 max-w-[2200px] flex items-center justify-between">
        
        <div className="flex items-center space-x-12 lg:space-x-0">
          <Link href='/'>
            <a className="font-Russo-one text-3xl hover:text-amber-400">F1 box</a>
          </Link>
          <div className={`space-x-8 lg:absolute lg:top-[65px] lg:left-full 
                           lg:h-[calc(100vh-65px)] lg:w-screen
                           lg:flex lg:flex-col p-4
                           lg:bg-neutral-300 lg:dark:bg-neutral-900 
                           lg:space-y-6 lg:space-x-0 ${menu && 'lg:left-0'}`}>
            <Link href='/PostRace'><a className={styleLink('/PostRace')}>Post Race</a></Link>
            <Link href='/Drivers'><a className={styleLink('/Drivers')}>Drivers</a></Link>
            <Link href='/Constructors'><a className={styleLink('/Constructors')}>Constructors</a></Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link href="https://github.com/ya-johnson/f1-box">
            <a target="_blank"><BsGithub className="icon" /></a>
          </Link>
          { theme === 'dark' ? 
              <BsSun className="icon"
                      onClick={toggleTheme} />
              : 
              <BsMoon className="icon"
                     onClick={toggleTheme} />
          }
          <FiMenu className={`icon hidden lg:block ${menu && 'lg:rotate-90'}`}
                  onClick={toggleMenu}/>
          {nextRace.date && 
          <div className="flex items-center justify-between space-x-2 
                          py-1 pl-4 pr-2 lg:hidden">
            <div className="flex items-center space-x-2">
              <Flag code={nextRace.country.slice(0,3)} className="h-5"/>
              <p className='text-xl font-bold'>{`${nextRace.country}:`}</p>
            </div>
            { counter && <div className="flex items-center space-x-1 font-bold">
              <p>{`${counter.days}d`}</p>
              <p>{`${counter.hours}h`}</p>
              <p>{`${counter.minutes}m`}</p>
              <p className="w-8">{`${counter.seconds}s`}</p>
            </div>}
          </div>}
        </div>

      </div>
    </nav>
  )
}


export default Nav