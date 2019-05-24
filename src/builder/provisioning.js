const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const { getProvisioningPlugins } = require('./utils');
const { slugify } = require('../utils');

module.exports = async newPage => {
  const plugins = await getProvisioningPlugins();

  // Retrieve images
  const destPath = path.resolve('./public/provisioning/');
  exec(`mkdir -p ${destPath}`);
  const repo = getRepo('wazo-pbx/wazo-doc-ng');
  const images = await retrieveGithubFiles(repo, 'provisioning/static/img', /.png$/, 'provisioning', 'binary');

  Object.keys(images).forEach(basePath => {
    const vendorName = basePath.split('/').pop();
    const isVendor = vendorName === 'vendors';

    Object.keys(images[basePath]).forEach(fileName => {
      const filePath = `${destPath}/${isVendor ? '': `${vendorName}-`}${fileName}`;
      console.log('filePath', filePath);

      fs.writeFileSync(filePath, images[basePath][fileName], { encoding: 'binary' });
    });
  });

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
