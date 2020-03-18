import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Link } from 'gatsby';

const sortArticles = a => a.sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  if(dateA > dateB) return -1;
  if(dateA < dateB) return 1;
  return 0;
});

export default ({ location, pageContext: { articles: articlesRaw  } }) => {
  const [ filter, setFilter ] = useState((location.state && location.state.filter) || {}); 
  const [ articles, setArticles ] = useState(articlesRaw); 

  // sort articles
  sortArticles(articles);

  useEffect(() => {
    // filter articles
    let a;
    switch (filter.type) {
      case 'category':
        a = articlesRaw.filter(item => item.category === filter.value);
        break;
      case 'author':
        a = articlesRaw.filter(item => item.author === filter.value);
        break;
      case 'tag':
        a = articlesRaw.filter(item => {
          const tags = item.tags && item.tags.split(',');
          return tags && tags.length && tags.includes(filter.value);
        });
        break;
      default:
        a = articlesRaw;
    }

    setArticles(a);
  }, [filter, articlesRaw])

  return (
    <Layout pageTitle="Blog" section="blog" className="blog">
      <div className="container">
        {filter.type && <div className="filter">Filtering by {filter.type}: {filter.value} <div onClick={() => setFilter({})}>Reset filter</div></div>}
        <div className="articles">
          {articles.map(({ title, slug, date: dateRaw, author, category, tags: tagsRaw, summary }) => {
            const date = new Date(dateRaw);
            const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
            const tags = tagsRaw && tagsRaw.split(',');
 
            return <div key={slug} className="item">
              <Link to={`/blog/${slug}`} className="title">{title}</Link>
              <div className="summary">{summary}...</div>
              <div className="head">
                Posted on {formattedDate}  {" "}
                in <Link className="hilite" to="/blog" state={{ filter: { type: 'category', value: category }}}>{category}</Link> {" "}
                by <Link className="hilite" to="/blog" state={{ filter: { type: 'author', value: author }}}>{author}</Link>  {" "}
                {tags && tags.length &&
                  <span className="tags"> * Tagged with {tags.map(item => <Link key={item} className="hilite" to="/blog" state={{ filter: { type: 'tag', value: item }}}>{item}</Link>)}</span>}
              </div> 
            </div>; 
          })}
        </div>
      </div>
      
    </Layout>
  );
}
