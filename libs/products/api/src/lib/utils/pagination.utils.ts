import { PaginationLinks } from '../models/product';

export function parseTotalPages(
  pagination: PaginationLinks,
  pageKey: string,
  currentPage = 1,
): number {
  if (pagination.pages) {
    return pagination.pages;
  }
  const last = pagination.last;
  if (!last) {
    return currentPage;
  }
  const regex = new RegExp(`${pageKey}=(\\d+)(?:&|$)`);
  const match = last.match(regex);
  return match ? Number(match[1]) : currentPage;
}
