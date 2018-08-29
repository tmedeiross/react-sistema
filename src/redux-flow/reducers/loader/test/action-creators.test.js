import * as actions from '../actions';
import * as actionCreators from '../action-creators';

describe('reducers/loader/action-creators', () => {
  it('loadingOn should dispatch a LOADING_ON action', () => {
    expect(actionCreators.loadingOn()).toEqual({
      type: actions.LOADING_ON,
    });
  });
  it('loadingOff should dispatch a LOADING_OFF action', () => {
    expect(actionCreators.loadingOff()).toEqual({
      type: actions.LOADING_OFF,
    });
  });
});
