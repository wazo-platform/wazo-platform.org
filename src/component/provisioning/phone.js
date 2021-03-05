import React  from 'react';
import ReactMarkdown from 'react-markdown';

import Layout from '../Layout';
import './provisioning.scss';
const slugify = require('../../builder/slugify');


const MarkedDown = ({ label, content }) => {
  if (!content) {
    return null;
  }

  const toggleContent = event => {
    event.currentTarget.classList.toggle('selected')
    event.currentTarget.nextSibling.classList.toggle('hidden')
  };

  // @FIXME: this is quite a lazy assumption -- that the first line is the title
  const editedContent = content.split("\n").slice(1).join("\n")

  return (
    <>
      <tr className="marked-button" onClick={toggleContent}>
        <td>{label}</td>
        <td>
          <div className="status"></div>
        </td>
      </tr>
      <tr className="marked-content hidden">
        <td colSpan={2} >
          <div><ReactMarkdown source={editedContent} /></div>
        </td>
      </tr>
    </>
  );
}

export const buildTable = data => {
  return Object.keys(data).map(version => {
    const allCapabilities = data[version];
    const { install, limitations, wazo_plugin: wazoPlugin, ...capabilities } = allCapabilities;

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
        <MarkedDown label="Installation" content={install} />
        <MarkedDown label="Limitations" content={limitations} />
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
        })}
      </tbody>
    </table>;
  })
}

export default ({ pageContext: { name, vendor, phone, vendor_images } }) => {
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
                  {vendor_images && vendor_images.indexOf(`${slugify(name)}.png`) !== -1 ? <img src={`/provisioning/${slugify(vendor)}-${slugify(name)}.png`} alt={`${slugify(vendor)}-${name}`}/> : <img src='/provisioning/img-placeholder.png' alt={`${slugify(vendor)}-${name}`} />}
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
