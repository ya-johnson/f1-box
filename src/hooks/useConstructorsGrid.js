import useSwr from 'swr'
import axios from 'axios'


const useConstructorsGrid = (season) => {
  
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSwr(`api/constructors/grid/${season}`, fetcher)
  
  return {
    data,
    isLoding: !data && !error,
    isError: error
  }
}


export default useConstructorsGrid