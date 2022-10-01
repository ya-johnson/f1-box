import dynamic from 'next/dynamic'
import Head from 'next/head'
import { HomeInfo } from '../components'

const Home = () => {

    
  const HomeHero = dynamic(() => import('../components/HomeHero'), { ssr: false })
  const HomeNews = dynamic(() => import('../components/HomeNews'), { ssr: false })

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>F1 box</title>
      </Head>

      <main>
        <HomeHero />
        <HomeInfo />
        <HomeNews />
      </main>
    </>
  )
}


export default Home