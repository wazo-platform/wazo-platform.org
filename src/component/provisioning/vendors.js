import React, { useState } from 'react';

import Layout from '../Layout';
import { buildTable } from './phone';
const slugify = require('../../builder/slugify');

const title = 'Provd Plugins';

export default ({ pageContext: { plugins, images } }) => {
  const [current, setCurrent] = useState(null);

  const onClick = event => {
    event.preventDefault();
    console.log('click', event.target.id, event.target);
    setCurrent(current === event.target.id ? null : event.target.id);
  }
  return (
    <Layout pageTitle={title}>
      <div className="doc-wrapper provisioning-vendors">
        <div className="container">
          <div className="section-block">
            <div className="row">
              {Object.keys(plugins).map(vendor => (
                <div className="vendor" key={vendor}>
                  <div className="card">
                    <a href={`/provisioning/${slugify(vendor)}`} className="card-header">{vendor}</a>
                    <div className="body">
                      <a href={`/provisioning/${slugify(vendor)}`}>
                        <img src={`/provisioning/${slugify(vendor)}.png`} alt=""/>
                      </a>
                    </div>
                  </div>
                  <div className="phones">
                    {Object.keys(plugins[vendor]).map(name => {
                      const id = `${slugify(vendor)}-${slugify(name)}`;
                      return <div className={id === current ? 'selected' : ''} key={id} >
                        <a href={`/provisioning/${slugify(vendor)}/${slugify(name)}`} onClick={onClick} id={id}>{name}</a>
                        {id === current && <div className="slide">
                          <div className="image">
                            {images[slugify(vendor)].indexOf(`${slugify(name)}.png`) !== -1 ? <img src={`/provisioning/${slugify(vendor)}-${slugify(name)}.png`} alt={`${slugify(vendor)}-${name}`}/> : <img src='/provisioning/img-placeholder.png' alt={`${slugify(vendor)}-${name}`} />}
                          </div>
                          <div className="content">{buildTable(plugins[vendor][name])}</div>
                    </div>}
                      </div>;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
