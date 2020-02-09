import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { QUESTURA } from './questura.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = QUESTURA;

const INITIAL_STATE = fromJS({
});

const customActions = {
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const QuesturaReducer = createReducer(INITIAL_STATE, reducer);
