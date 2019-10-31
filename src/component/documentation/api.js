import React from 'react';
import { RedocStandalone } from 'redoc';

const defaultBaseUrl = 'http://openapi.wazo.community';
export default ({ pageContext: { moduleName, module } }) => <RedocStandalone specUrl={`${defaultBaseUrl}/${module.repository}.yml`} />;
