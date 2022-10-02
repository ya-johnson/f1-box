import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useCurrentStore } from '../store'
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }) => {

  const currentRace = useCurrentStore(state => state.currentRace)
  const Intro = dynamic(() => import('../components/Intro'), { ssr: false })
  const Nav = dynamic(() => import('../components/Nav'), { ssr: false })

  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>F1 box</title>
      </Head>

    { !currentRace ? <Intro /> :
      <>
        <Nav />
        <Component {...pageProps} />
      </>
    }
    </>
  )
}


export default MyApp
