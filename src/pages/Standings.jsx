import dynamic from 'next/dynamic'

const StandingsTable = dynamic(() => import('../components/StandingsTable'), { ssr: false })

const Standings = () => {

  return (
    <main>
      <div className="container">
        <h1>Standings</h1>
        <StandingsTable />
      </div>
    </main>
  )
}


export default Standings