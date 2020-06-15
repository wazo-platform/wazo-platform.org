import React from 'react';
import { RedocStandalone } from 'redoc';
import { getModuleSpecUrl } from './helper';

const defaultOptions = { pathInMiddlePanel: true };

export default ({ pageContext: { module } }) => (
  <>
    {/* @patch Fix sticky menu on Chrome 80+ : https://github.com/Redocly/redoc/pull/1185 */}
    <style
      dangerouslySetInnerHTML={{
        __html: `
    @media (min-width: 801px) {
      .menu-content {
        position: fixed !important;
        z-index: 10;
      }

      .api-content {
        width: 100% !important;
        padding-left: 260px;
      }
    }
  `,
      }}
    />
    <RedocStandalone options={defaultOptions} specUrl={getModuleSpecUrl(module)} />;
  </>
);
