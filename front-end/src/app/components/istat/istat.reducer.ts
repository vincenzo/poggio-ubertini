import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { ISTAT } from './istat.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = ISTAT;

const INITIAL_STATE = fromJS({
});

const customActions = {
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const IstatReducer = createReducer(INITIAL_STATE, reducer);
