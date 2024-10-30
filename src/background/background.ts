import Timer from './../utils/Timer'

import { blockSites } from './../utils/blocker';

const timer = new Timer();
const restTimer = new Timer();

console.log('Background script running');
let port: chrome.runtime.Port | null = null;
let restPort: chrome.runtime.Port | null = null;

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
			port.postMessage({ timeLeft: timer.getTimeLeft() });
		}
		restTimer.start(5);
	}
);

restTimer.setCallbacks(
	() => {
		console.log(`Rest Time Left: ${restTimer.getTimeLeft()}`);
		if (restPort) {
			restPort.postMessage({ timeLeft: restTimer.getTimeLeft() });
		}
	},
	() => {
		console.log('Rest Timer finished!');

		if (restPort) {
			restPort.postMessage({ timeLeft: restTimer.getTimeLeft() });
		}

		let duration = timer.getDuration();
		timer.start(duration);
	}
);

chrome.webRequest.onBeforeRequest.addListener(
	(details) => {
		return blockSites(details, timer);
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

	if (newPort.name === 'restTimerUpdates') {
		restPort = newPort;
		restPort.onDisconnect.addListener(() => {
			restPort = null;
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
	} else if (message.type === 'START_REST_TIMER') {
		restTimer.start(60);
		sendResponse({ data: { status: "Rest Timer started" } });
	}
});

export { };
