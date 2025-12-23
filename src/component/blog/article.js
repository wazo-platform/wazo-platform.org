import React from 'react';
import { Link } from 'gatsby';

import Layout from '../Layout';

const Page = ({
  pageContext: { title, author, tags: tagsRaw, date: dateRaw, category, content },
}) => {
  const date = new Date(dateRaw);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  const tags = tagsRaw && tagsRaw.split(',');

  return (
    <Layout pageTitle={title} pageTitleDate={formattedDate} className="article" section="blog">
      <div className="container main">
        <div className="article--content">
          <div dangerouslySetInnerHTML={{ __html: content }} />

          <div className="article--content--footer">
            <Link
              className="article--content--footer-author"
              to="/blog"
              state={{ filter: { type: 'author', value: author } }}
            >
              {author}
            </Link>
            <p>
              Category:{' '}
              <Link to="/blog" state={{ filter: { type: 'category', value: category } }}>
                {category}
              </Link>
            </p>
            {tags && tags.length && (
              <p className="tags">
                Tags:{' '}
                {tags.map(item => (
                  <Link key={item} to="/blog" state={{ filter: { type: 'tag', value: item } }}>
                    {item}
                  </Link>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
