import { GlobalStateTypes } from '.';

const key = 'fantasypick';

export const getLocalState = () => {
  try {
    const data = localStorage.getItem(key);
    if (data === null) return undefined;
    return JSON.parse(data);
  } catch {
    return undefined;
  }
};

export const saveLocalState = (state: GlobalStateTypes) => {
  try {
    const serailizedState = JSON.stringify(state);
    localStorage.setItem(key, serailizedState);
  } catch {
    console.log('error in save state');
  }
};
