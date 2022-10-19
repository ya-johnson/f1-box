import dynamic from 'next/dynamic'


const Constructors = dynamic(() => import('../lib/pages/Constructors'), { ssr: false })
const Page = () => <Constructors />


export default Page