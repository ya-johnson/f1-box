import dynamic from 'next/dynamic'


const PostRace = dynamic(() => import('../lib/pages/PostRace'), { ssr: false })
const Page = () => <PostRace />


export default Page