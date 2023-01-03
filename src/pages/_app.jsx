import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useGlobalStore } from '../store'
import { Footer } from '../lib/components'
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }) => {

  const nextRace = useGlobalStore(state => state.nextRace)
  const Intro = dynamic(() => import('../lib/components/Intro'), { ssr: false })
  const Nav = dynamic(() => import('../lib/components/Nav'), { ssr: false })


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>F1 box</title>
      </Head>

    { !nextRace ? <Intro /> :
      <>
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </>
    }
    </>
  )
}


export default MyApp
