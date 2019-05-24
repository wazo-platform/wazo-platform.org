const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const { retrieveGithubFiles, getRepo } = require('./utils');
const { slugify } = require('../utils');

module.exports = async newPage => {
  const provdRepo = getRepo('wazo-pbx/xivo-provd-plugins');
  const pluginInfoFiles = await retrieveGithubFiles(provdRepo, '/', /plugin-info/, 'WAZO-428-gigaset-N870');
  const plugins = {};

  // Parse plugin-info files
  Object.keys(pluginInfoFiles).forEach(basePath => {
    Object.keys(pluginInfoFiles[basePath]).forEach(fileName => {
      const content = JSON.parse(pluginInfoFiles[basePath][fileName]);
      Object.keys(content.capabilities).forEach(capabilityName => {
        const [vendor, phone, firmware] = capabilityName.split(', ');
        if (!(vendor in plugins)) {
          plugins[vendor] = {};
        }
        if (!(phone in plugins[vendor])) {
          plugins[vendor][phone] = {};
        }

        plugins[vendor][phone][firmware] = content.capabilities[capabilityName];
      });
    });
  });

  // Retrieve images
  // const destPath = path.resolve('./public/provisioning/');
  // exec(`mkdir -p ${destPath}`);
  // const repo = getRepo('wazo-pbx/wazo-doc-ng');
  // const images = await retrieveGithubFiles(repo, 'provisioning/static/img', /.png$/, 'provisioning', 'binary');
  //
  // Object.keys(images).forEach(basePath => {
  //   const vendorName = basePath.split('/').pop();
  //   const isVendor = vendorName === 'vendors';
  //
  //   Object.keys(images[basePath]).forEach(fileName => {
  //     const filePath = `${destPath}/${isVendor ? '': `${vendorName}-`}${fileName}`;
  //     console.log('filePath', filePath);
  //
  //     fs.writeFileSync(filePath, images[basePath][fileName], { encoding: 'binary' });
  //   });
  // });

  delete plugins['*'];

  // Create vendors page
  newPage('/provisioning/vendors.html', 'provisioning/vendors', { plugins });

  // Create vendor pages
  Object.keys(plugins).forEach(vendor =>
    newPage(`/provisioning/${slugify(vendor)}.html`, 'provisioning/vendor', {
      name: vendor,
      vendor: plugins[vendor],
    })
  );

  // Create phone pages
  Object.keys(plugins).forEach(vendor => {
    Object.keys(plugins[vendor]).forEach(name => {
      newPage(`/provisioning/${slugify(name)}.html`, 'provisioning/phone', {
        name,
        vendor,
        phone: plugins[vendor][name],
      });
    });
  });
};
