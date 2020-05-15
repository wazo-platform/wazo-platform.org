import React  from 'react';

import Layout from '../Layout';
import './provisioning.scss';
const slugify = require('../../builder/slugify');

export const buildTable = data => {
  return Object.keys(data).map(version => {
    return <table className="table">
      <thead>
        <tr>
          <th colspan="2">
            {version}
          </th>
        </tr>
      </thead>
      <tbody>{Object.keys(data[version]).map(key => {
        let value = data[version][key];
        if (value === true) {
          value = 'yes';
        }
        if (value === false) {
          value = 'no';
        }
        return <tr>
          <td className="key">{key.replace('_', ' ')}</td>
          <td className="value">{value}</td>
        </tr>;
      })}</tbody>
    </table>;
  })
}

export default ({ pageContext: { name, vendor, phone, images } }) => {
  const breadcrumbs = [
    { url: '/provisioning/vendors', label: 'Provd plugins' },
    { url: `/provisioning/${slugify(vendor)}`, label: vendor },
  ];

  console.log('darn', phone);

  return (
    <Layout pageTitle={`<a href="/provisioning/vendors">Provd Plugins</a> &gt; <a href="/provisioning/${slugify(vendor)}">${vendor}</a> &gt; ${name}`} breadcrumbs={breadcrumbs} currentPageName={name}>
      <div className="doc-wrapper provisioning-phone">
        <div className="container">
          <div className="row">
            <div className="col-card col col-3">
              <div className="card">
                <div className="body">
                  {images && images.indexOf(`${slugify(name)}.png`) !== -1 ? <img src={`/provisioning/${slugify(vendor)}-${slugify(name)}.png`} alt={`${slugify(vendor)}-${name}`}/> : <img src='/provisioning/img-placeholder.png' alt={`${slugify(vendor)}-${name}`} />}
                </div>
              </div>
            </div>
            <div className="col col-9">{buildTable(phone)}</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
