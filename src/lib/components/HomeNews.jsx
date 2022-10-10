import Link from 'next/link'


const HomeNews = ({ articles }) => {

  return (
    <section className="container">
      <div className="brd border-b  mb-8">
        <h2>Press</h2>
      </div>

      <div>
        <h3>Officel Formula 1</h3>
        { articles && 
        <div className="flex space-x-14 my-8">
          {articles.map(article => {
            return (
              <Link href={article.url} >
                <a className="w-[calc(100%/3)] hover:-translate-y-1" target="_blank">
                  <div className="text-left rounded-xl sdw">
                    <div className="p-0 brd-b">
                      <img src={article.image} className="w-full h-60 rounded-t-xl"/>
                    </div>
                    <div className="h-40 p-4 brd border-b border-x rounded-b-xl">
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