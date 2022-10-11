import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'


const News = ({ title ,articles }) => {

  return (
    <div>
      <h3 className="mb-6">{title}</h3>
      <Swiper spaceBetween={40} 
              slidesPerView={4}
              slidesPerGroup={4}
              pagination={{clickable: true}}
              modules={[Pagination]}>
        {articles.map(article => {
          return (
            <SwiperSlide>
              <Link href={article.url} >
                <a className="w-[calc(100%/4)] hover:-translate-y-1" target="_blank">
                  <div className="text-left rounded-xl sdw">
                    <div className="p-0">
                      <img src={article.image} className="w-full h-60 rounded-t-xl"/>
                    </div>
                    <div className="h-40 p-4 bg-neutral-300 dark:bg-neutral-700 rounded-b-xl">
                      <span>{article.type}</span>
                      <p className="text-xl font-medium">{article.header}</p>
                    </div>
                  </div>
                </a>
              </Link>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}


export default News