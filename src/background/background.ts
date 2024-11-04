import Timer from './../utils/Timer'

import { blockSites } from './../utils/blocker';

const MESSAGE_TYPES = {
	START_TIMER: 'START_TIMER',
	STOP_TIMER: 'STOP_TIMER',
	START_REST_TIMER: 'START_REST_TIMER',
	PAUSE_TIMER: 'PAUSE_TIMER',
	START_PAUSE_TIMER: 'START_PAUSE_TIMER',
};

const timer = new Timer();
const restTimer = new Timer();

console.log('Background script running');
let port: chrome.runtime.Port | null = null;
let restPort: chrome.runtime.Port | null = null;

function timerTickCallback(port: chrome.runtime.Port | null, timer: Timer): void {
	if (port) {
		port.postMessage({ timeLeft: timer.getTimeLeft() });
	}
}

function timerFinishCallback(port: chrome.runtime.Port | null, timer: Timer, callback: () => void) {
	if (port) {
		port.postMessage({ timeLeft: null });
	}
	callback();
}

timer.setCallbacks(() => timerTickCallback(port, timer), () => timerFinishCallback(port, timer, () => {
	let duration = restTimer.getDuration();
	restTimer.start(duration);
}));

let reps = 0;
restTimer.setCallbacks(() => timerTickCallback(restPort, restTimer), () => timerFinishCallback(restPort, restTimer, () => {
	if (reps > 0) {
		reps--;
		console.log('Reps left:', reps);
		let duration = timer.getDuration();
		timer.start(duration);
	} else {
		console.log('All done');
		timer.stop();
		restTimer.stop();
	}
}));

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
	setupPort(newPort, 'timerUpdates', (p) => {
		port = p;
	});

	setupPort(newPort, 'restTimerUpdates', (p) => {
		restPort = p;
	});
})

function setupPort(newPort: chrome.runtime.Port, portName: string, setPort: (port: chrome.runtime.Port | null) => void) {
	if (newPort.name === portName) {
		setPort(newPort);
		newPort.onDisconnect.addListener(() => {
			setPort(null);
		});
	}
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	switch (message.type) {
		case MESSAGE_TYPES.START_TIMER:
			reps = message.payload.reps - 1;
			timer.setDuration(message.payload.duration);
			timer.start(message.payload.duration);
			restTimer.setDuration(message.payload.restDuration);
			sendResponse({ data: { status: "Timer started" } });
			console.log('Timer started reps: ', reps);
			break;

		case MESSAGE_TYPES.STOP_TIMER:
			timer.stop();
			restTimer.stop();
			sendResponse({ data: { status: "Timer stopped" } });
			break;

		case MESSAGE_TYPES.PAUSE_TIMER:
			restTimer.stop();
			sendResponse({ data: { status: "Rest Timer stopped" } });
			break;

		case MESSAGE_TYPES.START_PAUSE_TIMER:
			if (timer.getTimeLeft() > 0) {
				timer.resume();
			} else if (restTimer.getTimeLeft() > 0) {
				restTimer.resume();
			}
			sendResponse({ data: { status: "Rest Timer stopped" } });
			break;

		default:
			break;
	}
});

export { };
