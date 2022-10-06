import Link from 'next/link'
import { Table } from './'
import Flag from 'react-world-flags'


const HomeHero = ({ lastRace, podium, report }) => {


  return (
    
    <section>
      <div className="container flex items-center justify-between space-x-6 h-[90vh] pb-20">
        <div className="w-1/2">
          
          <div className="flex items-center space-x-2">
            <p className="mute-text text-xl">
            {`Last Race: Round ${lastRace.round} - ${lastRace.name}`}
            </p> 
            <Flag code={lastRace.country.slice(0,3)} className="h-5"/>
          </div>

          <h1>{report.title}</h1>
          <Table cols={Object.keys(podium[0])} rows={podium} />

          <div className="flex space-x-6">
            <Link href={'/Races'}>
              <a className="btn amber-btn">Results and Analytics</a>
            </Link>
            <Link href={report.reportLink}>
              <a className="btn neutral-btn" target="__blank">Officel Formula 1 Race Report</a>
            </Link>
          </div>
        </div>

        <Link href={report.url} >
          <a className="hover:-translate-y-2 sdw-xl" target="__blank">
            <img src={report.image} className="w-[60vw]"/>
          </a>
        </Link>
      </div>
    </section>    
    
  )
}


export default HomeHero