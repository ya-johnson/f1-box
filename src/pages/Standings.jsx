import dynamic from 'next/dynamic'


const StandingsPage = dynamic(() => import('../components/StandingsPage'), { ssr: false })


const Standings = () => {

  return (
    <StandingsPage />
  )
}


export default Standings