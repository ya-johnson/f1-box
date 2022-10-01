import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'

const HomeNews = () => {

  const [articles, setArticles] = useState()

  const initSection = async () => {
    const response = await axios.get('/api/news/formula1')
    const articles = await response.data
    setArticles(articles)
  }


  useEffect(() => {
    initSection()
  }, [])


  return (
    <section className="container px-28">
      <div className="brd-b pb-2 mb-14">
        <h2>News</h2>
      </div>

      <div>
        <h3>Officel Formula 1</h3>
        { articles && 
        <div className="flex space-x-14 my-8">
          {articles.map(article => {
            return (
              <Link href={article.url} >
                <a className="w-[calc(100%/3)]" target="__blank">
                  <div className="card text-left h-full sdw-xl">
                    <div className="card-header p-0 brd-b">
                      <img src={article.image} className="w-full h-60 object-coverr"/>
                    </div>
                    <div className="p-4">
                      <span>{article.type}</span>
                      <p className="text-xl font-medium">{article.header}</p>
                    </div>
                  </div>
                </a>
              </Link>
            )
          })}
        </div>}
      </div>
    </section>
  )
}


export default HomeNews