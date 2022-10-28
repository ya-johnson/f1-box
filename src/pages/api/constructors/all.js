import { constructorService } from '../../../services'


const handler = async (req, res) => {
  const allConstructors = await constructorService.getAllConstructors()
  const sortedAllConstructors = allConstructors.sort((a,b) => a.constructor.localeCompare(b.constructor))
  res.status(200).json(sortedAllConstructors)
}


export default handler