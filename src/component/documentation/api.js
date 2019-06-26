import React from 'react';
import { RedocStandalone } from 'redoc';

export default ({ pageContext: { moduleName, module } }) => <RedocStandalone specUrl={module.redocUrl} />;
