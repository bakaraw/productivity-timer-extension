const blockedSites = ['facebook.com', 'youtube.com'];

export function shouldBlockSite(url: string): boolean {
  return blockedSites.some(site => url.includes(site));
}

export function getBlockedSites(): string[] {
  return blockedSites;
}
