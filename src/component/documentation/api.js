import React from 'react';
import { RedocStandalone } from 'redoc';

const defaultBaseUrl = 'https://openapi.wazo.community';
export default ({ pageContext: { module } }) => <RedocStandalone specUrl={`${defaultBaseUrl}/${module.repository}.yml`} />;
