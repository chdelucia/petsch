export function parseTotalPages(
  lastLink: string | undefined,
  pageKey: string,
): number | null {
  if (!lastLink) {
    return null;
  }
  const regex = new RegExp(`${pageKey}=(\\d+)(?:&|$)`);
  const match = lastLink.match(regex);
  return match ? Number(match[1]) : null;
}
