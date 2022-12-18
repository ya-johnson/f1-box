import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Loader, Dropdown, ToImg } from '../ui'
import { colors } from '../../utils'
import { BarChart, Bar, 
         XAxis, YAxis, CartesianGrid, Tooltip,
         Legend, ResponsiveContainer } from 'recharts'
import useSwr from 'swr'
import axios from 'axios'


const Constructors = () => {

  const [selected, setSelected] = useState()
  const [urls, setUrls] = useState()
  const [stats, setStats] = useState()

  const fetcher = url => axios.get(url).then(res => res.data)
  const multiFetcher = arr => Promise.all(arr.map(url => axios.get(url).then(res => res.data)))
  const { data: constructorsData, error: constructorsDataError } = useSwr(urls, multiFetcher)
  const { data: allConstructors, error: allConstructorsError } = useSwr('api/constructors/all', fetcher)

  const createUrls = () => {
    const constructors = selected.map(selCon => allConstructors.constructors.filter(con => con.constructor === selCon)[0])
    const urls = constructors.map(constructor => `api/constructors/stats/${constructor.constructorId}`)
    console.log(urls)
    setUrls([urls])
  }

  const createStats = () => {
    const seasons = constructorsData.map(constructor => {
      return {
        name: constructor.name,
        seasons: constructor.seasons.length,
        championships: constructor.championships.length
      }
    })

    const races = constructorsData.map(constructor => {
      return { 
        name: constructor.name,
        races: constructor.races,
        wins: constructor.wins,
        podiums: constructor.podiums,
        poles: constructor.poles
      }
    })

    setStats({ seasons, races })
  }


  useEffect(() => {
    if (selected) createUrls()
  }, [selected])

  useEffect(() => {
    if (constructorsData) createStats()
  }, [constructorsData])

  
  return (
    <main>
      <div className="container">
        <h1>Constructors</h1>
        {!allConstructors ? <Loader />  
                          : <Dropdown type='multi'
                                      className='min-w-[200px] max-w-[800px] mt-4'
                                      title='Constructors:'
                                      list={allConstructors?.names}
                                      setItem={setSelected} 
                                      defaultItem={['Red Bull', 'Ferrari', 'Mercedes']}/>}
      </div>
      <section className="container">
      {selected?.length && !constructorsData ? <Loader /> :
        <div className="flex space-x-20">
        {constructorsData?.map(constructor => {
          return (
            <div className="relative bg-white dark:bg-neutral-900">
              <img src={constructor.image} className="object-contain" />
              <div className="p-4 mb-8">
                <p className="text-2xl font-semibold font-Russo-one">{constructor.name}</p>
                <p>Nationality: {constructor.nationality}</p>
                <div className="flex space-x-2">
                  <p>Seasons:</p>
                  <div className="flex flex-wrap space-x-1 max-w-[180px]">
                  {constructor.seasons?.map(season => <p>{`${season}, `}</p>)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <p>Championships: ({constructor.championships.length})</p>
                  {constructor.championships.length > 0 &&
                  <div className="flex flex-wrap space-x-1 max-w-[120px]">
                  {constructor.championships?.map(season => <p>{`${season}, `}</p>)}
                  </div>}
                </div>
                <div className="flex space-x-2">
                  <p>First Race:</p>
                  <div className="flex flex-wrap space-x-1 max-w-[180px]">
                    <p>{constructor.results[0].name}</p>
                    <p>{constructor.results[0].date}</p>
                  </div>
                </div>
                <p>Races: {constructor.races}</p>
                <p>Wins: {constructor.wins}</p>
                <p>Poles: {constructor.poles}</p>
                <p>Podiums: {constructor.podiums}</p>
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

      {(constructorsData && stats) &&
      <section className="container flex space-x-8">
        <div className="w-1/2 h-[800px] py-20">
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
        <div className="w-1/2 h-[800px] py-20">
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