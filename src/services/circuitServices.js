import { supabase } from '../utils'


const getCircuitId = async (ref) => {
  const { data, error } = await supabase.from('Circuits')
                                        .select('circuitId')
                                        .eq('circuitRef', ref)
  return data[0].constructorId
}


export {
  getCircuitId
}