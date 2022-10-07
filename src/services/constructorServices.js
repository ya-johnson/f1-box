import { API_URL } from '../config'
import axios from 'axios'


const getAllConstructors = async () => {
  const response = await axios.get(`${API_URL}/constructors.json?=123`)
  const data = await response.data.MRData.ConstructorTable.Constructors
  const constructors = data.map(constructor => {
    return {
      constructor: constructor.name,
      nationality: constructor.nationality,
      url: constructor.url
    }
  })

  return constructors
}

const getSeasonConstructors = async (season) => {
  const response = await axios.get(`${API_URL}/${season}/constructors.json`)
  const data = await response.data.MRData.ConstructorTable.Constructors
  const constructors = data.map(constructor => {
    return {
      constructor: constructor.name,
      nationality: constructor.nationality,
      url: constructor.url
    }
  })

  return constructors
}


export {
  getAllConstructors,
  getSeasonConstructors
}