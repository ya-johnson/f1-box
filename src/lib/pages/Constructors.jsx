import Link from 'next/link'
import { useStats } from '../../hooks'
import { colors } from '../../utils'
import { Loader, Dropdown, ToImg } from '../ui'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, 
         Tooltip, Legend, ResponsiveContainer } from 'recharts'


const Constructors = () => {

  const { all, selected, setSelected, statsData, stats } = useStats('constructors')
  
  return (
    <main>
      <div className="container">
        <h1>Constructors</h1>
        {!all ? <Loader />  
              : <Dropdown type='multi'
                          className='min-w-[200px] max-w-[800px] my-6 sm:w-full'
                          title='Constructors:'
                          list={all?.names}
                          setItem={setSelected} 
                          defaultItem={['Red Bull', 'Ferrari', 'Mercedes']}/>}
      </div>
      <section className="container">
      {selected?.length && !statsData ? <Loader /> :
        <div className="flex flex-wrap items-center justify-center">
        {statsData?.map(constructor => {
          return (
            <div className="min-h-[450px] relative bg-white dark:bg-neutral-900 mb-10 mr-10">
              <div className="w-full flex justify-center py-4">
                <img src={constructor.image} className="object-contain" />
              </div>
              <div className="p-4 mb-8">
                <p className="text-2xl font-semibold font-Russo-one">{constructor.name}</p>
                <p>Nationality: {constructor.nationality}</p>
                <p>Seasons: {constructor.seasons.length}</p>
                <p>Championships: {constructor.championships.length}</p>
                <div className="flex space-x-2">
                  <p>First Race:</p>
                  <div className="flex flex-wrap space-x-1 max-w-[180px]">
                    <p>{constructor.results[0].name}</p>
                    <p>{constructor.results[0].date}</p>
                  </div>
                </div>
                <p>Races: {constructor.stats.races}</p>
                <p>Wins: {constructor.stats.wins.length}</p>
                <p>Poles: {constructor.stats.poles.length}</p>
                <p>Podiums: {constructor.stats.podiums.length}</p>
              </div>
              <Link href={constructor.url}>
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
                <YAxis interval={0}/>
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


export default Constructors