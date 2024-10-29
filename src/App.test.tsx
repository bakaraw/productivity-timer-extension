import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Port } from './types/testingTypes';

const mockChromeRuntimeConnect = (): Port['onMessage'] => {
  const onMessageMock = {
    addListener: jest.fn(),
    removeListener: jest.fn(),
    hasListener: jest.fn(),
  };
  const portMock: Port = {
    name: 'timerUpdates',
    onMessage: onMessageMock,
    onDisconnect: {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    },
    postMessage: jest.fn(),
    disconnect: jest.fn(),
  };

  (global.chrome.runtime.connect as jest.Mock) = jest.fn(() => portMock);
  return onMessageMock;
};

test('renders Timer link and connects to Chrome runtime', () => {
  const onMessageMock = mockChromeRuntimeConnect();
  const addListenerSpy = jest.spyOn(onMessageMock, 'addListener');
  render(<App />);
  const linkElement = screen.getByTestId(/app-1/i);
  expect(linkElement).toBeInTheDocument();

  expect(addListenerSpy).toHaveBeenCalled();
});
