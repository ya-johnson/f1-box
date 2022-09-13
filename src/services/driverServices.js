import { supabase } from '../utils'


const getDriverId = async (ref) => {
  const { data, error } = await supabase.from('Drivers')
                                        .select('driverId')
                                        .eq('driverRef', ref)
  return data[0].driverId
}

const getGridByYear = async (year) => {
  const { data, error } = await supabase.from('Driver Standings')
                                        .select('*')
  return data
}


export {
  getDriverId
}