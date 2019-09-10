// @see: gist.github.com/mathewbyrne/1280286
// Frontend utils
module.exports.slugify = (text) =>
  text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
