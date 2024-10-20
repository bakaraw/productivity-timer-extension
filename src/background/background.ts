import Timer from './../utils/Timer'

const timer = new Timer();

console.log('Background script running');

timer.setCallbacks(
	() => {
		console.log(`Time Left: ${timer.getTimeLeft()}`)
	},
	() => {
		console.log('Timer finished!');
	}
)

chrome.runtime.onInstalled.addListener(() => {
	console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === 'greet') {
		console.log('Received greeting:', message.payload.content);
		sendResponse({ data: { reply: 'Hello from background.js!' } });
	}

	if (message.type === 'START_TIMER') {
		timer.start(message.payload.duration);
		sendResponse({ data: { status: "Timer started" } });
	} else if (message.type === 'STOP_TIMER') {
		timer.stop();
		sendResponse({ data: { status: "Timer stopped" } });
	} else if (message.type === 'GET_TIME_LEFT') {
		sendResponse({ timeLeft: timer.getTimeLeft() });
	}
});

export { };

