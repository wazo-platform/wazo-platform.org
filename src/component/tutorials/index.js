import React, { useState } from 'react';
import Layout from '../Layout';
import { Link } from 'gatsby';

const Tutorials = ({ pageContext: { tutorials: tutorialsRaw } }) => {
  const [tutorials] = useState(tutorialsRaw);

  return (
    <Layout pageTitle="Tutorials" section="tutorials" className="tutorials">
      <div className="container">
        <div className="tutorials-items">
          {tutorials.map(({ title, slug, author, summary, thumbnail }) => (
            <Link key={slug} to={`/tutorials/${slug}`} className="tutorials-items-item">
              <div class="thumbnail" style={{ backgroundImage: `url(/images/tutorials/${thumbnail})` }} />

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

export default Tutorials
