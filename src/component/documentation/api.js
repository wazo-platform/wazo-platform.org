import React from 'react';
import { RedocStandalone } from 'redoc';

const defaultBaseUrl = 'https://openapi.wazo.community/wazo-platform';

const defaultOptions = { pathInMiddlePanel: true, };

export default ({ pageContext: { module } }) => <RedocStandalone
  options={defaultOptions}
  specUrl={`${defaultBaseUrl}/${module.repository}.yml`}
/>;
