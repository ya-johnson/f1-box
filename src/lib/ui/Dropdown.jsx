import { useState } from 'react'
import { IoMdArrowDropdown, IoMdCloseCircleOutline } from 'react-icons/io'


const Dropdown = ({ type,
                    className,
                    title,
                    list,
                    defaultItem,
                    setItem,
                    loading }) => {

  const setInitialState = () => {
    if (type === 'multi' && defaultItem) return [defaultItem]
    else if (type === 'multi' && !defaultItem) return []
    else if (type === 'select' && defaultItem) return defaultItem
    else if (type === 'select' && !defaultItem) return null
  }

  const [drop, setDrop] = useState('dd-close')
  const [selected, setSelected] = useState(setInitialState())

  const toggleDropdown = () => drop === 'dd-close' ? setDrop('dd-open') : setDrop('dd-close')

  const onItemClick = (item) => {
    if (type === 'select') {
      setItem(item)
      setSelected(item)
      toggleDropdown()
    } 
    else if (type === 'multi') {
      setItem([...selected, item])
      setSelected([...selected, item])
      toggleDropdown()
    }
  }

  const removeMultiItem = (item) => {
    setItem(selected.filter(listItem => listItem !== item))
    setSelected(selected.filter(listItem => listItem !== item))
    toggleDropdown()
  }


  return (
    <div className="flex">
      <div className={`dropdown relative cursor-pointer mb-8
                       py-2 px-4 border brd rounded-lg
                       bg-neutral-200 dark:bg-neutral-900 
                      ${className && className} ${drop}`}
           tabIndex="0" 
           onClick={toggleDropdown}
           onFocus={toggleDropdown} 
           onBlur={() => setDrop('dd-close')}>

        <div className="flex justify-between items-center space-x-2 capitalize">
          <span>{title}</span>
          {(type === 'multi' && selected.length > 0) && selected.map(item => {
            return (
              <div className="flex items-center pl-2 rounded-md
                              bg-amber-400 text-neutral-800">
                <p>{item}</p>
                <div className="h-full ml-2 p-1 rounded-r-md 
                                bg-neutral-300 dark:bg-neutral-700">
                  <IoMdCloseCircleOutline className="h-5 w-5 hover:text-red-600" 
                                          onClick={() => removeMultiItem(item)}/> 
                </div>     
              </div>)
          })}

          {(type === 'select' && selected) &&
            <div className="flex items-center pl-2 rounded-md
                            bg-amber-400 text-neutral-800">
              <p>{selected}</p>
              <div className="h-full ml-2 p-1 rounded-r-md 
                              bg-neutral-400 dark:bg-neutral-700">
                <IoMdCloseCircleOutline className="h-5 w-5 hover:text-red-600 dark:text-neutral-500" 
                                        onClick={() => setSelected(null)}/> 
              </div>     
            </div>
          }

          {loading ?       
            <div className="h-6 w-6 self-center animate-spin
                            rounded-full border-4 border-solid 
                            border-neutral-800 border-t-neutral-300">
            </div>
                   :
            <IoMdArrowDropdown className={`h-6 w-6 ${drop === 'dd-close' ? 'rotate-0' : 'rotate-180'}`}/>
          } 
        </div>

        <div className={`${drop === 'dd-close' && 'opacity-0 invisible'} 
                        absolute top-[125%] left-0 -translate-x-[1px] overflow-scroll
                        w-[calc(100%+2px)] max-h-[calc(100%*4+8px)] py-2 px-4 space-y-2
                        border brd rounded-lg bg-neutral-200 dark:bg-neutral-900 z-20`}>
        {list.map((item, index) => {
          return (
            <div key={index} 
                 className={`dd-item ${item === selected || selected.filter(listItem => listItem === item)[0] && 'text-amber-400'}`}
                 onClick={() => onItemClick(item)}>
                 {item}
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}


export default Dropdown