import React from 'react';
import { RedocStandalone } from 'redoc';

const baseUrl = 'https://openapi.wazo.community'
const defaultOptions = { pathInMiddlePanel: true, };

const getSpecPrefix = module => module.coporate ? 'nestbox' : 'wazo-platform'

const getSpecUrl = module => `${baseUrl}/${getSpecPrefix(module)}/${module.repository}.yml`

export default ({ pageContext: { module } }) => <RedocStandalone
  options={defaultOptions}
  specUrl={getSpecUrl(module)}
/>;
