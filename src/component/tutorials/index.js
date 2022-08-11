import React, { useState } from 'react';
import Layout from '../Layout';
import { Link, withPrefix } from 'gatsby';

const sortTutorials = (a) =>
  a.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (dateA > dateB) return -1;
    if (dateA < dateB) return 1;
    return 0;
  });

const Page = ({ pageContext: { tutorials: tutorialsRaw } }) => {
  const [tutorials] = useState(sortTutorials(tutorialsRaw));

  return (
    <Layout pageTitle="Tutorials" section="tutorials" className="tutorials">
      <div className="container">
        <div className="tutorials-items">
          {tutorials.map(({ title, slug, author, summary, thumbnail }) => (
            <Link key={slug} to={withPrefix(`/tutorials/${slug}`)} className="tutorials-items-item">
              <div class="thumbnail" style={{ backgroundImage: `url(${withPrefix('/images/tutorials/${thumbnail')}})` }} />

              <h2 className="title">{title}</h2>
              <p className="summary">{summary}...</p>
              <p className="author">{author}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Page
