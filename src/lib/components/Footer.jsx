import Link from 'next/link'
import * as config from '../../config'


const Footer = () => {

  return ( 
    <footer className="bg-white dark:bg-neutral-900 py-14 mt-10 brd border-t">
      <div className="container flex justify-between space-x-8">
        <div className="flex flex-col">
          <Link href="/">
            <a className="text-3xl font-bold mb-2 hover:text-amber-400">F1 box</a>
          </Link>
          <div className="flex space-x-20">
            <div className="flex flex-col space-y-1">
              <Link href='/PostRace'><a className='hover:text-amber-400'>Post Race</a></Link>
              <Link href='/Drivers'><a className='hover:text-amber-400'>Drivers</a></Link>
              <Link href='/Constructors'><a className='hover:text-amber-400'>Constructors</a></Link>
            </div>
            <div>
              <p>Although we strive to keep all data on this website correct and up to date, we do not state that it always is.</p>
              <p>The use of these data is at your own risk. By using this website you acknowledge that you are aware of this.</p>
              <p>A special thanks to Ergast for providing a comprehensive database of Formula 1 history data!</p>
              <p>F1 box claims no rights to this data.</p>
              <p>All names, brands and otherwise copyrighted material are and remain property of their respective owners.</p>
              <p>This website is unofficial and is not associated in any way with the Formula 1 companies.</p>
              <p>F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks</p>
              <p>are trade marks of Formula One Licensing B.V.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1">
          <Link href={config.API_URL}>
            <a target='_blank' className="text-xl font-bold hover:text-amber-400">Ergast F1 API</a>
          </Link>
          <Link href={config.FORMULA1_URL}><a target='_blank' className='hover:text-amber-400'>Formula1.com</a></Link>
          <Link href={config.SKY_F1_URL}><a target='_blank' className='hover:text-amber-400'>Skysport.com/f1</a></Link>
          <Link href={config.MOTOR_SPORT_F1_URL}><a target='_blank' className='hover:text-amber-400'>Motorsport.com/f1</a></Link>
        </div>
      </div>
    </footer>
  )
}


export default Footer