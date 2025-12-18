const visit = require('unist-util-visit');

// Admonition types and their default titles
const ADMONITION_TYPES = {
  note: { title: 'Note', className: 'admonition-note' },
  tip: { title: 'Tip', className: 'admonition-tip' },
  info: { title: 'Info', className: 'admonition-info' },
  warning: { title: 'Warning', className: 'admonition-warning' },
  danger: { title: 'Danger', className: 'admonition-danger' },
  caution: { title: 'Caution', className: 'admonition-caution' },
};

// Regex to match opening admonition: :::type optional title
const ADMONITION_START_REGEX = /^:::(note|tip|info|warning|danger|caution)(?:\s+(.+))?$/;
// Regex to match closing admonition: :::
const ADMONITION_END_REGEX = /^:::$/;

module.exports = ({ markdownAST }, pluginOptions = {}) => {
  const nodesToProcess = [];

  // First pass: find all admonition blocks
  visit(markdownAST, 'paragraph', (node, index, parent) => {
    if (!node.children || node.children.length === 0) return;

    const firstChild = node.children[0];
    if (firstChild.type !== 'text') return;

    const text = firstChild.value;
    const match = text.match(ADMONITION_START_REGEX);

    if (match) {
      nodesToProcess.push({
        startNode: node,
        startIndex: index,
        parent: parent,
        type: match[1],
        customTitle: match[2] || null,
      });
    }
  });

  // Process each found admonition (in reverse to preserve indices)
  for (let i = nodesToProcess.length - 1; i >= 0; i--) {
    const { startIndex, parent, type, customTitle } = nodesToProcess[i];
    const admonitionConfig = ADMONITION_TYPES[type];
    const title = customTitle || admonitionConfig.title;

    // Find the closing :::
    let endIndex = -1;
    for (let j = startIndex + 1; j < parent.children.length; j++) {
      const child = parent.children[j];
      if (
        child.type === 'paragraph' &&
        child.children &&
        child.children[0] &&
        child.children[0].type === 'text' &&
        ADMONITION_END_REGEX.test(child.children[0].value.trim())
      ) {
        endIndex = j;
        break;
      }
    }

    if (endIndex === -1) {
      // No closing tag found, skip
      continue;
    }

    // Get all content nodes between start and end (these stay as AST nodes)
    const contentNodes = parent.children.slice(startIndex + 1, endIndex);

    // Create opening HTML node
    const openingHtml = {
      type: 'html',
      value: `<div class="admonition ${admonitionConfig.className}">
  <div class="admonition-heading">
    <h5>${escapeHtml(title)}</h5>
  </div>
  <div class="admonition-content">`,
    };

    // Create closing HTML node
    const closingHtml = {
      type: 'html',
      value: `  </div>
</div>`,
    };

    // Replace: remove start marker through end marker, insert wrapper + content + closer
    // New structure: [openingHtml, ...contentNodes, closingHtml]
    const newNodes = [openingHtml, ...contentNodes, closingHtml];
    parent.children.splice(startIndex, endIndex - startIndex + 1, ...newNodes);
  }

  return markdownAST;
};

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
