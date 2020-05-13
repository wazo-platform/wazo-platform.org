import React from 'react';

import Vendors from './components/Vendors';
import './provisioning.scss';

export default ({ pageContext: { plugins, images, content, title = 'Supported Devices' }}) => (
  <div className="provisioning-vendors wazo-inc">
    <Vendors plugins={plugins} images={images} />
  </div>
);
