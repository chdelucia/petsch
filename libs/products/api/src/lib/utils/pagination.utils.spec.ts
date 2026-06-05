import { parseTotalPages } from './pagination.utils';

describe('pagination.utils', () => {
  describe('parseTotalPages', () => {
    it('should return null if lastLink is undefined', () => {
      expect(parseTotalPages(undefined, '_page')).toBeNull();
    });

    it('should return null if lastLink does not contain pageKey', () => {
      expect(parseTotalPages('http://api.com/products?limit=10', '_page')).toBeNull();
    });

    it('should parse total pages when pageKey is at the end', () => {
      expect(parseTotalPages('http://api.com/products?_page=5', '_page')).toBe(5);
    });

    it('should parse total pages when pageKey is in the middle', () => {
      expect(parseTotalPages('http://api.com/products?_page=10&_limit=12', '_page')).toBe(10);
    });

    it('should parse total pages with custom pageKey', () => {
      expect(parseTotalPages('http://api.com/products?p=20&l=12', 'p')).toBe(20);
    });

    it('should return null if pageKey has no numeric value', () => {
      expect(parseTotalPages('http://api.com/products?_page=abc', '_page')).toBeNull();
    });
  });
});
