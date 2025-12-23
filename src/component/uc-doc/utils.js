// Helper to remove a key from the array and push it first
//
// @return Array
const pushLinkFirst = (keys, keyToPush) => {
  const keyIndex = keys.indexOf(keyToPush);
  if (keyIndex !== -1) {
    keys = [keyToPush, ...keys.filter(key => key !== keyToPush)];
  }

  return keys;
};

// Helper to remove a key from the array and push it last
//
// @return Array
const pushLinkLast = (keys, keyToPush) => {
  const keyIndex = keys.indexOf(keyToPush);
  if (keyIndex !== -1) {
    keys = [...keys.filter(key => key !== keyToPush), keyToPush];
  }

  return keys;
};

// Extracted the logic for custom links ordering
//
// @return Array
export const tableOfContentLinksOrdering = (itemKey, titleSortedKeys) => {
  let reorderedTitleSortedKeys = [...titleSortedKeys];

  // /uc-doc/upgrade custom ordering
  if (itemKey === 'uc-doc-upgrade') {
    reorderedTitleSortedKeys = pushLinkFirst(reorderedTitleSortedKeys, 'upgrade_specific_version');
    reorderedTitleSortedKeys = pushLinkFirst(reorderedTitleSortedKeys, 'upgrade_notes_details');
    reorderedTitleSortedKeys = pushLinkFirst(reorderedTitleSortedKeys, 'upgrade_notes');

    reorderedTitleSortedKeys = pushLinkLast(reorderedTitleSortedKeys, 'old_upgrade_notes');
  }

  // /uc-doc/api_sdk/rest_api custom ordering
  if (itemKey === 'uc-doc-api_sdk-rest_api') {
    reorderedTitleSortedKeys = pushLinkFirst(reorderedTitleSortedKeys, 'quickstart');
  }

  // (Keep last) Introduction always first
  reorderedTitleSortedKeys = pushLinkFirst(reorderedTitleSortedKeys, 'introduction');

  return reorderedTitleSortedKeys;
};
