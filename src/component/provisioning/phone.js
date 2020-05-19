import React  from 'react';

import Layout from '../Layout';
import './provisioning.scss';
const slugify = require('../../builder/slugify');

export const buildTable = data => {
  return Object.keys(data).map(version => {
    const capabilities = data[version];
    const wazoPlugin = capabilities.wazo_plugin;
    delete capabilities.wazo_plugin;

    return <table key={version} className="table">
      <thead>
        <tr>
          <th className="key">Firmware <br />
          Wazo Plugin</th>
          <th className="value">
            {version}<br />
            {wazoPlugin || <>&nbsp;</>}
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(capabilities).map(key => {
        let value = capabilities[key];
        if (value === true) {
          value = 'yes';
        }
        if (value === false) {
          value = 'no';
        }
        return <tr key={`${version}-${key}`}>
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
