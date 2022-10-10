import dynamic from 'next/dynamic'


const StandingsPage = dynamic(() => import('../lib/pages/StandingsPage'), { ssr: false })


const Standings = () => {

  return (
    <StandingsPage />
  )
}


export default Standings