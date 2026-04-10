import { parseLinkHeader } from './link-header-parser';

describe('LinkHeaderParser', () => {
  it('should parse a full link header', () => {
    const header =
      '<https://api.example.com/pets?_page=1>; rel="first", ' +
      '<https://api.example.com/pets?_page=2>; rel="prev", ' +
      '<https://api.example.com/pets?_page=4>; rel="next", ' +
      '<https://api.example.com/pets?_page=10>; rel="last"';

    const result = parseLinkHeader(header);

    expect(result.first).toBe('https://api.example.com/pets?_page=1');
    expect(result.prev).toBe('https://api.example.com/pets?_page=2');
    expect(result.next).toBe('https://api.example.com/pets?_page=4');
    expect(result.last).toBe('https://api.example.com/pets?_page=10');
  });

  it('should handle missing links', () => {
    const header = '<https://api.example.com/pets?_page=4>; rel="next"';
    const result = parseLinkHeader(header);

    expect(result.next).toBe('https://api.example.com/pets?_page=4');
    expect(result.first).toBeUndefined();
    expect(result.last).toBeUndefined();
  });
});
