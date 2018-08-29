import { LOADING_ON, LOADING_OFF } from './actions';

export const loadingOn = () => ({
  type: LOADING_ON,
});

export const loadingOff = () => ({
  type: LOADING_OFF,
});
