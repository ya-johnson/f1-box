import { constructorService } from '../../../services'


const handler = async (req, res) => {
  const allConstructors = await constructorService.getAllConstructors()
  const constructors = allConstructors.sort((a,b) => a.constructor.localeCompare(b.constructor))
  const names = constructors.map(constructor => constructor.constructor)
  res.status(200).json({constructors, names})
}


export default handler