import { supabase } from '../utils'


const getStatusId = async (ref) => {
  const { data, error } = await supabase.from('Status')
                                        .select('statusId')
                                        .eq('status', ref)
  return data[0].statusId
}


export {
  getStatusId
}