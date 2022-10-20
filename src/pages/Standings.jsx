import dynamic from 'next/dynamic'


const Standings = dynamic(() => import('../lib/pages/Standings'), { ssr: false })
const Page = () => <Standings />


export default Page