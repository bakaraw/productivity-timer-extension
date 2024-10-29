import Timer from './Timer'
const blockedSites: string[] = ['facebook.com', 'youtube.com'];
const blockedSitesMap = blockedSites.map(site => `*://*.${site}/*`);

function shouldBlockSite(url: string): boolean {
  return blockedSites.some(site => url.includes(site));
}

function getBlockedSites(): string[] {
  return blockedSites.map(site => `*://*.${site}/*`);
}

export const blockSites = (details: chrome.webRequest.WebRequestDetails, timer: Timer): chrome.webRequest.BlockingResponse => {
  const url = new URL(details.url);
  if (timer.isActive() && shouldBlockSite(url.hostname)) {
    chrome.tabs.query({ url: blockedSitesMap }, (tabs: chrome.tabs.Tab[]) => {
      tabs.forEach((tab) => {
        if (tab.id !== undefined) {
          chrome.tabs.remove(tab.id);
        }
      });
    });
    return { cancel: true };
  }

  return { cancel: false }
}
