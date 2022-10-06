import Link from 'next/link'


const HomeNews = ({ articles }) => {

  return (
    <section className="container px-28">
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
                <a className="w-[calc(100%/3)]" target="__blank">
                  <div className="card text-left h-full sdw-xl">
                    <div className="card-header p-0 brd-b">
                      <img src={article.image} className="w-full h-60 rounded-t-xl"/>
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