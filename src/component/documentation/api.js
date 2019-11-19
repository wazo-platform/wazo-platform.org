import React from 'react';
import { RedocStandalone } from 'redoc';

const defaultBaseUrl = 'https://openapi.wazo.community/wazo-platform';
export default ({ pageContext: { module } }) => <RedocStandalone specUrl={`${defaultBaseUrl}/${module.repository}.yml`} />;
