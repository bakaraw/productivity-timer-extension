import Timer from './../utils/Timer'
import { shouldBlockSite, getBlockedSites } from './../utils/blocker';

const timer = new Timer();

console.log('Background script running');
let port: chrome.runtime.Port | null = null;

timer.setCallbacks(
	() => {
		console.log(`Time Left: ${timer.getTimeLeft()}`);
		if (port) {
			port.postMessage({ timeLeft: timer.getTimeLeft() });
		}

	},
	() => {
		console.log('Timer finished!');
		if (port) {
			port.postMessage({ timeLeft: 0 });
		}
	}
);

chrome.webRequest.onBeforeRequest.addListener(
	(details) => {
		const url = new URL(details.url);
		if (timer.isActive() && shouldBlockSite(url.hostname)) {
			chrome.tabs.query({ url: getBlockedSites() }, (tabs: chrome.tabs.Tab[]) => {
				tabs.forEach((tab) => {
					if (tab.id !== undefined) {
						chrome.tabs.remove(tab.id);
					}
				});
			});
			return { cancel: true };
		}
		return { cancel: false };
	},
	{ urls: ["<all_urls>"] },
	["blocking"]
);


chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed');
});

chrome.runtime.onConnect.addListener((newPort) => {
	if (newPort.name === 'timerUpdates') {
		port = newPort;
		port.onDisconnect.addListener(() => {
			port = null;
		});
	}
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'START_TIMER') {
		timer.start(message.payload.duration);
		sendResponse({ data: { status: "Timer started" } });
	} else if (message.type === 'STOP_TIMER') {
		timer.stop();
		sendResponse({ data: { status: "Timer stopped" } });
	}
});

export { };
