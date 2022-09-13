import { supabase } from '../utils'


const getConstructorId = async (ref) => {
  const { data, error } = await supabase.from('Constructors')
                                        .select('constructorId')
                                        .eq('constructorRef', ref)
  return data[0].constructorId
}


export {
  getConstructorId
}