
import { fromJS } from 'immutable';
import productionPageReducer from '../reducer';

describe('productionPageReducer', () => {
  it('returns the initial state', () => {
    expect(productionPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
