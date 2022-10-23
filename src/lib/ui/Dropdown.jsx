import { useState, useRef, useEffect } from 'react'
import { IoMdArrowDropdown, IoMdCloseCircleOutline } from 'react-icons/io'


const Dropdown = ({ 
  type,
  className,
  title,
  list,
  defaultItem,
  setItem,
  loading
}) => {

  const drop = useRef(null)
  const [isMenu, setIsMenu] = useState('dd-close')
  const [selected, setSelected] = useState(defaultItem && defaultItem)
  

  const toggleDropdown = () => {
    isMenu === 'dd-close' ? setIsMenu('dd-open') : setIsMenu('dd-close')
  }

  const onItemClick = (item) => {
    if (type === 'action') {
      item.method()
      toggleDropdown()
    } 
    else if (type === 'select') {
      setItem(item)
      setSelected(item)
      toggleDropdown()
    }
  }

  useEffect(() => {
    setSelected(defaultItem)
  }, [defaultItem])


  return (
    <div className={`relative cursor-pointer mb-8
                     py-2 px-4 border brd rounded-lg
                   bg-neutral-300 dark:bg-neutral-700 
                     ${className && className} ${isMenu}`}
         onClick={toggleDropdown} ref={drop}>

      <div className="flex justify-between items-center space-x-2 capitalize">
        <span>{title}</span>
        { selected && 
          <div className="flex items-center pl-2 rounded-md
                        bg-blue-400 dark:bg-blue-500">
            <p>{selected}</p>
            <div className="h-full ml-2 p-1 rounded-r-md 
                          bg-neutral-400 dark:bg-neutral-500">
              <IoMdCloseCircleOutline className="h-5 w-5 hover:text-red-600" 
                                    onClick={() => setSelected(null)}/> 
            </div>     
          </div>}
          { loading ?       
            <div className="h-6 w-6 self-center animate-spin
                            rounded-full border-4 border-solid 
                          border-neutral-800 border-t-neutral-300">
            </div>
            :
            <IoMdArrowDropdown className={`h-6 w-6 ${isMenu === 'dd-close' ? 'rotate-0' : 'rotate-180'}`}/>
          } 
      </div>

      <div className={`${isMenu === 'dd-close' && 'opacity-0 invisible'} 
                      absolute top-[115%] left-0 -translate-x-[1px] overflow-scroll
                      w-[calc(100%+2px)] max-h-[calc(100%*4+8px)] py-2 px-4 space-y-2
                      border brd rounded-lg bg-neutral-300 dark:bg-neutral-700 z-20`}>
        { list.map((item, index) => {
          return (
            <div key={index} 
                 className={`dd-item ${type === 'action' && item.className}`}
                 onClick={() => onItemClick(item)}>
                 {type === 'select' ? item : item.name}
            </div>
          )
        })}
      </div>

    </div>
  )
}


export default Dropdown