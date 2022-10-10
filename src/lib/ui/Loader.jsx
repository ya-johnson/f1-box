
const Loader = () => {

  return (
    <div className="w-screen h-screen flex items-center justify-center 
                    fixed top-0 left-0 bg-neutral-500 bg-opacity-10 dark:bg-neutral-900 dark:bg-opacity-10">
      <div className="loader h-10 w-10 self-center m-10 
                      rounded-full border-4 border-solid 
                      border-neutral-700 border-t-neutral-300 animate-spin">
      </div>
    </div>

  )
}


export default Loader