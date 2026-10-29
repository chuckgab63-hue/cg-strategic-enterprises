import { describe, expect, it } from 'vitest';
import { cleanWebsiteInput, prefillFromSearch, websiteCheckPath } from './prefill';

describe('cleanWebsiteInput', () => {
  it('accepts an address with or without http(s)://', () => {
    expect(cleanWebsiteInput('example.com')).toBe('example.com');
    expect(cleanWebsiteInput('  https://www.example.com/about ')).toBe('https://www.example.com/about');
    expect(cleanWebsiteInput('HTTP://shop.example.co.uk')).toBe('HTTP://shop.example.co.uk');
  });

  it('rejects empty and obviously wrong input', () => {
    for (const bad of ['', '   ', 'mysite', 'https://', 'my site.com', '.com', 'example.', 'a@b.com']) {
      expect(cleanWebsiteInput(bad), bad).toBeNull();
    }
  });
});

describe('the pre-fill link', () => {
  it('round-trips the address through ?url=', () => {
    const path = websiteCheckPath('https://example.com/a?b=1');
    expect(path).toBe('/website-check?url=https%3A%2F%2Fexample.com%2Fa%3Fb%3D1');
    expect(prefillFromSearch(new URLSearchParams(path.split('?')[1]))).toBe('https://example.com/a?b=1');
  });

  it('ignores a missing or unusable parameter', () => {
    expect(prefillFromSearch(new URLSearchParams(''))).toBe('');
    expect(prefillFromSearch(new URLSearchParams('url=not%20a%20site'))).toBe('');
  });
});
