import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import { AiOutlineSave } from 'react-icons/ai'


const ToImg = ({ children, className }) => {

  const ref = useRef()
  const [icon, setIcon] = useState('hidden')

  const downloadAsImg = async () => {
    const dataUrl = await toPng(ref.current, {cacheBust: true})
    const link = document.createElement('a')
    link.download = 'f1-box.png'
    link.href = dataUrl
    link.click()
  }

  return (
    <div className={`${className} relative bg-neutral-100 dark:bg-neutral-800`}
         ref={ref} 
         onMouseOver={() => setIcon('block')} 
         onMouseLeave={() => setIcon('hidden')}>
      <AiOutlineSave className={`${icon} cursor-pointer absolute top-0 right-0 
                                 h-5 w-5 text-neutral-500 
                                 hover:text-neutral-800 dark:hover:text-neutral-200`} 
                     onClick={downloadAsImg} />      
      {children}
    </div>
  )
}


export default ToImg