import {
  headerLinkApiMapper,
  createNestedApiMapper,
  dragonballApiMapper,
} from './api-mappers';

describe('API Mappers', () => {
  describe('headerLinkApiMapper', () => {
    it('should map array body and parse link headers', () => {
      const body = [{ id: 1, name: 'Item 1' }];
      const headers = new Map([
        ['Link', '<http://api.com?page=2>; rel="next", <http://api.com?page=5>; rel="last"'],
      ]);
      const mockHeaders = {
        get: (key: string) => headers.get(key) ?? null,
      } as any;

      const result = headerLinkApiMapper(body, mockHeaders);
      expect(result.products).toEqual(body);
      expect(result.pagination.next).toBe('http://api.com?page=2');
      expect(result.pagination.last).toBe('http://api.com?page=5');
    });

    it('should handle non-array body safely', () => {
      const result = headerLinkApiMapper(null, null);
      expect(result.products).toEqual([]);
      expect(result.pagination).toEqual({});
    });
  });

  describe('createNestedApiMapper', () => {
    it('should map nested objects with default paths', () => {
      const mapper = createNestedApiMapper();
      const body = {
        info: { pages: 3, next: 'next-url', prev: 'prev-url' },
        results: [{ id: 10, name: 'Rick' }],
      };

      const result = mapper(body);
      expect(result.products).toEqual([{ id: 10, name: 'Rick' }]);
      expect(result.pagination).toEqual({
        pages: 3,
        next: 'next-url',
        prev: 'prev-url',
      });
    });

    it('should map nested objects with custom paths', () => {
      const mapper = createNestedApiMapper({
        resultsPath: 'data.items',
        pagesPath: 'data.totalPages',
        nextPath: 'links.nextPage',
      });
      const body = {
        data: { totalPages: 10, items: [{ id: 1 }] },
        links: { nextPage: 'page2' },
      };

      const result = mapper(body);
      expect(result.products).toEqual([{ id: 1 }]);
      expect(result.pagination.pages).toBe(10);
      expect(result.pagination.next).toBe('page2');
    });

    it('should return empty result for invalid body', () => {
      const mapper = createNestedApiMapper();
      expect(mapper('invalid')).toEqual({ products: [], pagination: {} });
    });
  });

  describe('dragonballApiMapper', () => {
    it('should handle direct array body', () => {
      const result = dragonballApiMapper([{ id: 1 }]);
      expect(result.products).toEqual([{ id: 1 }]);
      expect(result.pagination).toEqual({ pages: 1 });
    });

    it('should handle dragonball dto body', () => {
      const body = {
        items: [{ id: 1, name: 'Goku' }],
        meta: { totalPages: 5 },
        links: { next: 'next-db-url', previous: 'prev-db-url' },
      };
      const result = dragonballApiMapper(body);
      expect(result.products).toEqual([{ id: 1, name: 'Goku' }]);
      expect(result.pagination).toEqual({
        pages: 5,
        next: 'next-db-url',
        prev: 'prev-db-url',
      });
    });

    it('should fallback gracefully for unknown body structures', () => {
      expect(dragonballApiMapper(null)).toEqual({ products: [], pagination: {} });
    });
  });
});
