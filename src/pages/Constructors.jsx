import dynamic from 'next/dynamic'


const ConstructorsPage = dynamic(() => import('../lib/pages/ConstructorsPage'), { ssr: false })


const Constructors = () => {
  
  return (
    <ConstructorsPage />
  )
}


export default Constructors