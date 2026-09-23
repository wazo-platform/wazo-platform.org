import { describe, expect, it } from 'vitest';

import { normalizeBaseUrl } from './helper';

describe('normalizeBaseUrl', () => {
  it.each([
    ['', ''],
    ['  ', ''],
    ['host', 'https://host'],
    [' host ', 'https://host'],
    ['host:8443', 'https://host:8443'],
    ['10.0.0.1', 'https://10.0.0.1'],
    ['http://host', 'http://host'],
    ['HTTPS://host', 'HTTPS://host'],
    ['host/', 'https://host'],
    ['https://host//', 'https://host'],
    ['https://host/prefix/', 'https://host/prefix'],
  ])('%j -> %j', (value, expected) => {
    expect(normalizeBaseUrl(value)).toBe(expected);
  });
});
