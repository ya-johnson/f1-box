import { BsGraphUp, 
         BsArrowsCollapse,
         BsFlag } from 'react-icons/bs'


const HomeInfo = () => {

  return (
    <section className="container mb-28">
      <div className="mb-10">
        <h2>F1 Data made Easy</h2>
        <p>In depth Analytics about Races, Drivers, Constructors and more.<br/>
           Easy to use, free to Download.
        </p>
      </div>
      <div className="flex items-center justify-start space-x-8">
        <div className="w-96 h-44">
          <div className="flex items-center space-x-4 pb-4">
            <BsGraphUp className="h-6 w-6"/>
            <p className="text-xl font-medium">Race Weekend Analytics</p>
          </div>
          <p>
            All the little details in one place, <br/>
            See how results came to be.
          </p>
        </div>

        <div className="w-96 h-44">
          <div className="flex items-center space-x-4 pb-4">
            <BsArrowsCollapse className="h-6 w-6 rotate-90"/>
            <p className="text-xl font-medium">Compare</p>
          </div>
          <p>
            Discover how One standout over the other. <br/>
            What makes One strong and who is likely to break records.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-start space-x-8">
        <div className="w-96 h-44">
          <div className="flex items-center space-x-4 pb-4">
            <BsFlag className="h-6 w-6"/>
            <p className="text-xl font-medium">Simulator</p>
          </div>
          <p>
            Enroll full Race or Qualifying season. <br/>
            Recap highlights on more abstract manner.
          </p>
        </div>

        <div className="w-96 h-44">
          <div className="flex items-center space-x-4 pb-4">
            <BsFlag className="h-6 w-6"/>
            <p className="text-xl font-medium">Simulator</p>
          </div>
          <p>
            Enroll full Race or Qualifying season. <br/>
            Recap highlights on more abstract manner.
          </p>
        </div>
      </div>
    </section>
  )
}


export default HomeInfo