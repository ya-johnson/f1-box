import useSwr from 'swr'
import axios from 'axios'


const useConstructorsGrid = (season) => {
  
  const fetcher = async (url) => {
    const response = await axios.get(url)
    const data = await response.data
    return data
  }

  const { data, error } = useSwr(`api/constructors/grid/${season}`, fetcher)
  
  return {
    data,
    isLoding: !data && !error,
    isError: error
  }
}


export default useConstructorsGrid