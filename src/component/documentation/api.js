import React from 'react';
import { RedocStandalone } from 'redoc';
import { getModuleSpecUrl } from './helper';

const defaultOptions = { pathInMiddlePanel: true, };

export default ({ pageContext: { module } }) => <RedocStandalone
  options={defaultOptions}
  specUrl={getModuleSpecUrl(module)}
/>;
