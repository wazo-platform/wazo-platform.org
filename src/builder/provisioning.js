const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const { getProvisioningPlugins, walk } = require('./utils');
const slugify = require('./slugify');

module.exports = async newPage => {
  const plugins = getProvisioningPlugins();

  // Retrieve images
  const destPath = path.resolve('./public/provisioning/');
  exec(`mkdir -p ${destPath}`);
  const images = walk('content/provisioning/img', /.png$/, 'binary');

  const imgs = {};

  Object.keys(images).forEach(basePath => {
    const vendorName = basePath.split('/').pop();
    const isVendor = vendorName === 'vendors';
  
    Object.keys(images[basePath]).forEach(fileName => {
      const filePath = `${destPath}/${isVendor ? '' : `${vendorName}-`}${fileName}`;
      
      if (!imgs[vendorName]) imgs[vendorName] = [];
      imgs[vendorName].push(fileName);
  
      fs.writeFileSync(filePath, images[basePath][fileName], { encoding: 'binary' });
    });
  });

  // Create vendors page
  newPage('/provisioning/vendors', 'provisioning/vendors', { plugins });

  // Create vendor pages
  Object.keys(plugins).forEach(vendor =>
    newPage(`/provisioning/${slugify(vendor)}`, 'provisioning/vendor', {
      name: vendor,
      vendor: plugins[vendor],
      images: imgs[slugify(vendor)],
    })
  );

  // Create phone pages
  Object.keys(plugins).forEach(vendor => {
    Object.keys(plugins[vendor]).forEach(name => {
      newPage(`/provisioning/${slugify(vendor)}/${slugify(name)}`, 'provisioning/phone', {
        name,
        vendor,
        phone: plugins[vendor][name],
        images: imgs[slugify(vendor)],
      });
    });
  });
};
