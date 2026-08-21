import { buildHttpParams } from './http-params';

describe('buildHttpParams', () => {
  it('should build HttpParams ignoring empty, null, and undefined values', () => {
    const params = buildHttpParams({
      search: 'query',
      category: null,
      page: 1,
      empty: '',
      active: true,
      missing: undefined,
    });

    expect(params.get('search')).toBe('query');
    expect(params.get('page')).toBe('1');
    expect(params.get('active')).toBe('true');
    expect(params.has('category')).toBe(false);
    expect(params.has('empty')).toBe(false);
    expect(params.has('missing')).toBe(false);
  });
});
