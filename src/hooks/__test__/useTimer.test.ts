
import { renderHook, act } from '@testing-library/react';
import useTimer from './../useTimer';
import { Port } from './../../types/testingTypes';

describe('useTimer', () => {
  let onMessageMock: Port['onMessage'];
  let portMock: Port;

  beforeEach(() => {
    onMessageMock = {
      addListener: jest.fn(),
      removeListener: jest.fn(),
      hasListener: jest.fn(),
    };

    portMock = {
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

  });

  test('should set timeLeft based on messages received', () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      onMessageMock.addListener.mock.calls[0][0]({ timeLeft: 100 });
    });
    expect(result.current.timeLeft).toBe(100);
  });

  test('should reset timeLeft to null', () => {
    const { result } = renderHook(() => useTimer());
    act(() => {
      onMessageMock.addListener.mock.calls[0][0]({ timeLeft: 100 });
    });

    expect(result.current.timeLeft).toBe(100);

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.timeLeft).toBeNull();
  });
});
