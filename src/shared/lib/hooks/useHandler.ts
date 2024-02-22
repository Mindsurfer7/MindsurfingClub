import { SyntheticEvent } from 'react';

// https://github.com/Ayub-Begimkulov/youtube-tutorials/blob/master/virtualization-from-scratch/src/examples/Simple.tsx

export const useHandler = <T extends SyntheticEvent>(
  callback: Function,
): ((event: T) => void) => {
  if (event?.type === 'click') {
    const handler = (event: T) => {
      callback();
    };
    return handler;
  }

  const handler = (event: T) => {
    if (event.target) {
      //@ts-ignore
      callback(event.target.value);
    }
  };
  return handler;
};
