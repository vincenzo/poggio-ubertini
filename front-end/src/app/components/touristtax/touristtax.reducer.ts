import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { TOURISTTAX } from './touristtax.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = TOURISTTAX;

const INITIAL_STATE = fromJS({
});

const customActions = {
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const TouristtaxReducer = createReducer(INITIAL_STATE, reducer);
