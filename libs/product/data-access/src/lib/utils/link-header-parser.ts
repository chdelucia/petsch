import { PaginationLinks } from '@petsch/api';

export function parseLinkHeader(header: string): PaginationLinks {
  const links: PaginationLinks = {};
  const parts = header.split(',');

  parts.forEach((part) => {
    const section = part.split(';');
    if (section.length !== 2) return;

    const url = section[0].replace(/<(.*)>/, '$1').trim();
    const name = section[1].replace(/rel="(.*)"/, '$1').trim();

    if (name === 'first') links.first = url;
    if (name === 'prev') links.prev = url;
    if (name === 'next') links.next = url;
    if (name === 'last') links.last = url;
  });

  return links;
}
