import { PaginationLinks } from '@petsch/api';

const LINK_PARTS_SPLIT_REGEX = /,(?=\s*<)/;
const URL_REGEX = /<([^>]+)>/;
const REL_REGEX = /rel="([^"]+)"/i;

const VALID_RELS = new Set<keyof PaginationLinks>([
  'first',
  'prev',
  'next',
  'last',
]);

export function parseLinkHeader(header: string): PaginationLinks {
  if (!header) return {};

  const parts = header.split(LINK_PARTS_SPLIT_REGEX);

  return parts.reduce<PaginationLinks>((acc, part) => {
    const parsed = parsePart(part);
    if (!parsed) return acc;

    const { url, rels } = parsed;

    for (const rel of rels) {
      if (VALID_RELS.has(rel as keyof PaginationLinks)) {
        (acc as any)[rel] = url;
      }
    }

    return acc;
  }, {});
}

function parsePart(part: string): { url: string; rels: string[] } | null {
  const urlMatch = URL_REGEX.exec(part);
  const relMatch = REL_REGEX.exec(part);

  if (!urlMatch || !relMatch) return null;

  return {
    url: urlMatch[1].trim(),
    rels: relMatch[1].toLowerCase().split(/\s+/),
  };
}
