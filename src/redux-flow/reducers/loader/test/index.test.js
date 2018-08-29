import deepFreeze from 'deep-freeze';
import loader from '../index';
import { LOADING_ON, LOADING_OFF } from '../actions';

describe('reducers/loader', () => {
  it('should isLoading equal true when isLoading is false', () => {
    const before = deepFreeze({ isLoading: false });
    const action = deepFreeze({
      type: LOADING_ON,
    });
    const after = { isLoading: true };
    expect(loader(before, action)).toEqual(after);
  });

  it('should keep isLoading equal true when isLoading is true', () => {
    const before = deepFreeze({ isLoading: true });
    const action = deepFreeze({
      type: LOADING_ON,
    });
    const after = { isLoading: true };
    expect(loader(before, action)).toEqual(after);
  });

  it('should switch isLoading to false when isLoading is true', () => {
    const before = deepFreeze({ isLoading: true });
    const action = deepFreeze({
      type: LOADING_OFF,
    });
    const after = { isLoading: false };
    expect(loader(before, action)).toEqual(after);
  });

  it('should keep isLoading to false when isLoading is false', () => {
    const before = deepFreeze({ isLoading: false });
    const action = deepFreeze({
      type: LOADING_OFF,
    });
    const after = { isLoading: false };
    expect(loader(before, action)).toEqual(after);
  });
});
