import { BsGraphUp, BsArrowsCollapse, BsFlag } from 'react-icons/bs'


const HomeInfo = () => {

  return (
    <section className="container mb-28 px-28">
      <div className="text-center mb-10">
        <h2>F1 Data made Easy</h2>
        <p>In depth Analytics about Races, Drivers, Constructors and more.<br/>
           Easy to use, free to Download.
        </p>
      </div>
      <div className="flex items-center justify-between space-x-14">
        <div className="card">
          <div className="card-header brd-b">
            <BsGraphUp className="h-6 w-6"/>
            <p className="text-xl font-medium">Analytics</p>
          </div>
          <p className="p-4">View in depth Analytics about Races, Drivers, Constructors and more.</p>
        </div>

        <div className="card">
          <div className="card-header brd-b">
            <BsArrowsCollapse className="h-6 w-6 rotate-90"/>
            <p className="text-xl font-medium">Compare</p>
          </div>
          <p className="p-4">View in depth Analytics about Races, Drivers, Constructors and more.</p>
        </div>

        <div className="card">
          <div className="card-header brd-b">
            <BsFlag className="h-6 w-6"/>
            <p className="text-xl font-medium">Race Simulator</p>
          </div>
          <p className="p-4">View in depth Analytics about Races, Drivers, Constructors and more.</p>
        </div>
      </div>
    </section>
  )
}


export default HomeInfo