import type { DocModule } from './builder';

export const specBaseUrl = 'https://openapi.wazo.community';

export const getModuleSpecUrl = (module: DocModule) =>
  `${specBaseUrl}/wazo-platform/${module.repository}.yml`;

export const getServiceName = (redocUrl: string) => {
  const url = new URL(redocUrl);
  return url.pathname.split('/')[2];
};

// sections.yaml uses Font Awesome classes (e.g. "fa fa-key", "fab fa-js");
// map them to iconify names as used elsewhere on the site.
export const iconifyName = (icon?: string) => {
  if (!icon) {
    return null;
  }

  const parts = icon.trim().split(/\s+/);
  const prefix = parts[0] === 'fab' ? 'fa-brands' : 'fa-solid';
  const name = (parts.find((part) => part.startsWith('fa-')) || '').replace(
    'fa-',
    '',
  );
  return name ? `${prefix}:${name}` : null;
};

export const getStoredValue = (key: string) => {
  try {
    return window.localStorage.getItem(key) || '';
  } catch {
    return '';
  }
};

export const setStoredValue = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore storage failures (private mode, etc.)
  }
};
