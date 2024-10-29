// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { ChromeAPI } from './types/testingTypes';

// Create a global mock for chrome
const mockChrome: ChromeAPI = {
  runtime: {
    sendMessage: jest.fn(),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      hasListener: jest.fn(),
    },
    connect: jest.fn(() => ({
      postMessage: jest.fn(),
      onDisconnect: {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      },
      onMessage: {
        addListener: jest.fn(),
        removeListener: jest.fn(),
        hasListener: jest.fn(),
      },
    })),
  },
  storage: {
    sync: {
      get: jest.fn(),
      set: jest.fn(),
    },
  },
};

// Assign the mock to global.chrome
global.chrome = mockChrome;

beforeEach(() => {
  jest.clearAllMocks();
});

