import { Intro ,Nav } from '../components'
import '../styles/globals.css'


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Intro />
      <Nav />
      <Component {...pageProps} />
    </>
  )
}


export default MyApp
