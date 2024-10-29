
interface OnMessage {
  addListener: jest.Mock;
  removeListener: jest.Mock;
  hasListener: jest.Mock;
}

export interface Port {
  name: string;
  onMessage: OnMessage;
  onDisconnect: OnDisconnect;
  postMessage: jest.Mock;
  disconnect: jest.Mock;
}

interface OnDisconnect {
  addListener: jest.Mock;
  removeListener: jest.Mock;
}

interface ChromeRuntime {
  sendMessage: jest.Mock;
  onMessage: OnMessage;
  connect: jest.Mock;
}

interface ChromeStorageSync {
  get: jest.Mock;
  set: jest.Mock;
}

export interface ChromeAPI {
  runtime: ChromeRuntime;
  storage: {
    sync: ChromeStorageSync;
  };
}
