import React from 'react';
import { RedocStandalone } from 'redoc';
import { getModuleSpecUrl } from './helper';

import './api.css';

const theme = {
  typography: {
    fontSize: '15px',
    code: {
      fontSize: '14px',
      lineHeight: '1.5em',
    },
  },
  logo: {
    gutter: '30px',
  },
  sidebar: {
    groupItems: {
      activeTextColor: 'var(--main-color)',
    },
  },
};

const defaultOptions = {
  pathInMiddlePanel: true,
  sortOperationsAlphabetically: true,
  sortTagsAlphabetically: true,
  theme,
};

const Page = ({ pageContext: { module } }) => (
  <RedocStandalone options={defaultOptions} specUrl={getModuleSpecUrl(module)} />
);

export default Page;
