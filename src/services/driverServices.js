import { supabase } from '../utils'


const getDriverId = async (ref) => {
  const { data, error } = await supabase.from('Drivers')
                                        .select('driverId')
                                        .eq('driverRef', ref)
  return data[0].driverId
}


export {
  getDriverId
}