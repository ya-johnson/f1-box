import Link from 'next/link'
import { useStats } from '../../hooks'
import { colors } from '../../utils'
import { Loader, Dropdown, ToImg } from '../ui'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
         Tooltip, Legend, ResponsiveContainer } from 'recharts'


const Drivers = () => {

  const { all, selected, setSelected, statsData, stats } = useStats('drivers')

  return (
    <main>
      <div className="container">
        <h1>Drivers</h1>
        <p>Select Drivers to see stats and preform comparition.</p>
        {!all ? <Loader />  
              : <Dropdown type='multi'
                          className='min-w-[200px] max-w-[800px] mt-4'
                          title='Drivers:'
                          list={all?.names}
                          setItem={setSelected} 
                          defaultItem={['Max Verstappen', 'Charles Leclerc']}/>}
      </div>
      <section className="container">
      {selected?.length && !statsData ? <Loader /> :
        <div className="flex flex-wrap items-center justify-center">
        {statsData?.map(driver => {
          return (
            <div className="relative bg-white dark:bg-neutral-900 mb-10 mr-10">
              <img src={driver.image} className="h-[350px] w-[300px] object-cover" />
              <div className="p-4 mb-8">
                <p className="text-2xl font-semibold font-Russo-one">{driver.driver}</p>
                <p>Nationality: {driver.nationality}</p>
                <p>Born: {driver.birth}</p>
                <p>Seasons: {driver.seasons.length}</p>
                <p>Championships: {driver.championships.length}</p>
                <div className="flex space-x-2">
                  <p>First Race:</p>
                  <div className="flex flex-wrap space-x-1 max-w-[180px]">
                    <p>{driver.results[0].name}</p>
                    <p>{driver.results[0].date}</p>
                  </div>
                </div>
                <p>Races: {driver.stats.races}</p>
                <p>Wins: {driver.stats.wins.length}</p>
                <p>Poles: {driver.stats.poles.length}</p>
                <p>Podiums: {driver.stats.podiums.length}</p>
              </div>
              <Link href={driver.url}>
                <a target="_blank" 
                   className="font-Russo-one absolute bottom-2 left-1/2 -translate-x-1/2 hover:text-amber-400">
                   Learn More
                </a>
              </Link>
            </div>
          )
        })}
        </div> 
      }

      {/* {(allDrivers && !selected?.length) && 
        <div>
        {allDrivers?.drivers.map(driver => {
           return (
             <p className="mb-1">{driver.driver}</p>
           )
         })}
         </div>
      } */}
      </section>

      {(statsData && stats) &&
      <section className="container flex space-x-8 lg:flex-col lg:space-x-0 lg:space-y-8">
        <div className="w-1/2 h-[800px] py-20 lg:w-full">
          <ToImg>
            <p className="text-2xl font-semibold my-4">Seasons/Championships</p>
            <ResponsiveContainer>
              <BarChart data={stats.seasons} barCategoryGap={'15%'}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="seasons" fill="#8884d8" />
                <Bar dataKey="championships" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </ToImg>
        </div>
        <div className="w-1/2 h-[800px] py-20 lg:w-full">
          <ToImg>
            <p className="text-2xl font-semibold my-4">Races/Wins/Podiums/Poles</p>
            <ResponsiveContainer>
              <BarChart data={stats.races} barCategoryGap={'15%'}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="races" fill={colors.random[0]} />
                <Bar dataKey="wins" fill={colors.random[4]} />
                <Bar dataKey="podiums" fill={colors.random[5]} />
                <Bar dataKey="poles" fill={colors.random[6]} />
              </BarChart>
            </ResponsiveContainer>
          </ToImg>
        </div>
      </section>
      }
    </main>
  )
}


export default Drivers