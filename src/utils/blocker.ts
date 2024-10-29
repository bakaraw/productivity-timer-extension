const blockedSites = ['facebook.com', 'youtube.com'];

export function shouldBlockSite(url: string): boolean {
  return blockedSites.some(site => url.includes(site));
}
