import dynamic from 'next/dynamic'


const Races = dynamic(() => import('../lib/pages/Races'), { ssr: false })
const Page = () => <Races />


export default Page