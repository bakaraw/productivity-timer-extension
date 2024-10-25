export interface Message<T = any> {
  type: string;
  payload?: T;
}

export interface Response<T = any> {
  data?: T;
  error?: string;
}

export function sendMessage<TMessage, TResponse>(message: Message<TMessage>):
  Promise<Response<TResponse>> {
  return new Promise((resolve, reject) => {
    const callback = (response: Response<TResponse>) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(response);
      }
    }

    chrome.runtime.sendMessage(message, callback);
  });

}
