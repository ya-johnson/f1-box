import { useState, useEffect } from 'react'
import useSwr from 'swr'
import axios from 'axios'


const useStats = (type) => {

  const [single, setSingle] = useState(type.substring(0, type.length - 1))
  const [selected, setSelected] = useState()
  const [urls, setUrls] = useState()
  const [stats, setStats] = useState()

  const fetcher = url => axios.get(url).then(res => res.data)
  const multiFetcher = arr => Promise.all(arr.map(url => axios.get(url).then(res => res.data)))
  const { data: statsData, error: statsDataError } = useSwr(urls, multiFetcher)
  const { data: all, error: allError } = useSwr(`api/${type}/all`, fetcher)


  const createUrls = () => {
    const nameList = selected.map(name => all[type].filter(obj => obj[single] === name)[0])
    const urls = nameList.map(obj => `api/${type}/stats/${obj[`${single}Id`]}`)
    setUrls([urls])
  }

  const createStats = () => {
    const seasons = statsData.map(obj => {
      return {
        name: obj.name || obj[single],
        seasons: obj.seasons.length, 
        championships: obj.championships.length 
      }
    })
    
    const races = statsData.map(obj => {
      return {
        name: obj.name || obj[single],
        races: obj.stats.races,
        wins: obj.stats.wins.length, 
        podiums: obj.stats.podiums.length,
        poles: obj.stats.poles.length
      }
    })

    setStats({ seasons, races })
  }


  useEffect(() => {
    if (selected) createUrls()
  }, [selected])

  useEffect(() => {
    if (statsData) createStats()
  }, [statsData])


  return { all, selected, setSelected, statsData, stats }
}


export default useStats