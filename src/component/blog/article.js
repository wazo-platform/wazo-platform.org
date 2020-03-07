import React from 'react';
import Layout from '../Layout';
import ReactMarkdown from 'react-markdown';
import { Link } from 'gatsby';

export default ({ pageContext: { title, author, tags: tagsRaw, date: dateRaw, category, body } }) => {
  const date = new Date(dateRaw);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  const tags = tagsRaw && tagsRaw.split(',');
    
  return (
    <Layout pageTitle={title} className="article" section="blog">
      <div className="container main" style={{ padding: '50px 15px 70px' }}>
        <div className="head">
          Posted on {formattedDate}  {" "}
          in <Link className="hilite" to="/blog" state={{ filter: { type: 'category', value: category }}}>{category}</Link> {" "}
          by <Link className="hilite" to="/blog" state={{ filter: { type: 'author', value: author }}}>{author}</Link>  {" "}
          {tags && tags.length &&
            <span className="tags"> * Tagged with {tags.map(item => <Link key={item} className="hilite" to="/blog" state={{ filter: { type: 'tag', value: item }}}>{item}</Link>)}</span>}
        </div>
        <ReactMarkdown source={body} />
      </div>
      
    </Layout>
  );
}