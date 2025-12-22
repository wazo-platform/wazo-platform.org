import React from 'react';

import Layout from '../Layout';
import TableOfContents from '../uc-doc/TableOfContents';
import Vendors from './components/Vendors';
import './provisioning.scss';

const breadcrumbs = [
  { link: '/uc-doc/ecosystem/supported_devices', label: 'Supported Devices', active: true },
];
const Page = ({ pageContext: { plugins, images, content, title = 'Supported Devices' } }) => (
  <Layout
    pageTitle="Supported Devices"
    PageTitleComponent="p"
    breadcrumbs={breadcrumbs}
    className="template-uc-doc contribute"
  >
    <div className="container principal">
      <div className="main-content main-content-on-right-side">
        <div className="main-content-left-col">
          <TableOfContents />
        </div>

        <div className="provisioning-vendors platform">
          <Vendors plugins={plugins} images={images} />
        </div>
      </div>
    </div>
  </Layout>
);

export default Page;
