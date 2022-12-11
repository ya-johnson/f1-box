import { constructorService } from '../../../../services'


const handler = async (req, res) => {
  const { constructorId } = req.query
  const constructor = await constructorService.getConstructorInfo(constructorId)
  res.status(200).json(constructor)
}


export default handler