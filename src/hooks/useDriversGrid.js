import useSwr from 'swr'
import axios from 'axios'


const useDriversGrid = (season) => {
  
  const fetcher = url => axios.get(url).then(res => res.data)
  const { data, error } = useSwr(`api/drivers/grid/${season}`, fetcher)
  
  return {
    data,
    isLoding: !data && !error,
    isError: error
  }
}


export default useDriversGrid