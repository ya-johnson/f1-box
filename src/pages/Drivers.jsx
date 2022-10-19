import dynamic from 'next/dynamic'


const Drivers = dynamic(() => import('../lib/pages/Drivers'), { ssr: false })
const Page = () => <Drivers />


export default Page