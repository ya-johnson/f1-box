import { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useGlobalStore } from '../store'
import { Footer } from '../lib/components'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { toastify } from '../utils'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }) => {

  const nextRace = useGlobalStore(state => state.nextRace)
  const Intro = dynamic(() => import('../lib/components/Intro'), { ssr: false })
  const Nav = dynamic(() => import('../lib/components/Nav'), { ssr: false })

  const Welcome = ({ closeToast, toastProps }) => (
    <div className="p-2">
      <p className="text-2xl font-bold mb-2">Welcome to F1 box!</p>
      <p>We are still building some features, consider this app as unstable.</p>
      <p>Data from seasons 1950-2000 may not be presented.</p>
      <p>Thank you and happy racing!</p>  
    </div>
  )

  const displayWelcome = () => {
    toast(Welcome, toastify.openSettings)
  }


  useEffect(() => {
    if (nextRace) {
      displayWelcome()
    }
  }, [nextRace])


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>F1 box</title>
      </Head>

    { !nextRace ? <Intro /> :
      <>
        <ToastContainer position='top-center'
                        hideProgressBar={true}
                        className='toast-container'
                        toastClassName='toast-body' 
                        transition={Slide} />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </>
    }
    </>
  )
}


export default MyApp
