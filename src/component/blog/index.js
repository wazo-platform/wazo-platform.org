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

const Page = ({ location, pageContext: { articles: articlesRaw  } }) => {
  const [ filter, setFilter ] = useState(location?.state?.filter || {});
  const [ articles, setArticles ] = useState(articlesRaw);

  // sort articles
  sortArticles(articles);

  useEffect(() => {
    const { value: newFilterValue, type: newFilterType } = location?.state?.filter || {};
    setFilter(location?.state?.filter);

    // filter articles
    let filtredArticles;
    switch (newFilterType) {
      case 'category':
        filtredArticles = articlesRaw.filter(item => item.category === newFilterValue);
        break;

      case 'author':
        filtredArticles = articlesRaw.filter(item => item.author === newFilterValue);
        break;

      case 'tag':
        filtredArticles = articlesRaw.filter(item => {
          const tags = item.tags && item.tags.split(',');
          console.log(`🤠 -> useEffect -> tags`, tags);
          return tags && tags.length && tags.includes(newFilterValue);
        });
        break;

      default:
        filtredArticles = articlesRaw;
    }

    setArticles(filtredArticles);
  }, [location?.state?.filter, articlesRaw])

  return (
    <Layout pageTitle="Blog" section="blog" className="blog">
      <div className="container">
        { filter?.type && (
          <div className="filter">Filtering by {filter?.type}: {filter?.value} <Link className="reset-filter" to="/blog" state={{ filter: { }}}>Reset filter</Link></div>
        )}
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

export default Page
