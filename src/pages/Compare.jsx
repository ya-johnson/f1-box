import dynamic from 'next/dynamic'


const ComparePage = dynamic(() => import('../lib/pages/ComparePage'), { ssr: false })


const Compare = () => {
  
  return (
    <ComparePage />
  )
}


export default Compare