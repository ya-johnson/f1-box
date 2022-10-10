import dynamic from 'next/dynamic'


const DriversPage = dynamic(() => import('../lib/pages/DriversPage'), { ssr: false })


const Drivers = () => {
  
  return (
    <DriversPage />
  )
}


export default Drivers