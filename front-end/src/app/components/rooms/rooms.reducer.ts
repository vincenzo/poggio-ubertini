import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { ROOMS } from './rooms.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = ROOMS;

const INITIAL_STATE = fromJS({
  filters: {
    'Rooms.id': {
      active: false,
      value: null,
    },
    'Rooms.data': {
      active: true,
      value: new Date(),
    },
  },
  filterPanel: {
    focusedField: '',
    isOpen: false,
  },
  form: {},
  hasError: false,
  isLoading: false,
  list: [],
  pagination: {
    count: 0,
    current_page: 1,
    has_next_page: false,
    has_prev_page: false,
    limit: 100,
    page_count: 0,
  },
  sort: {
    default: 'numero',
    direction: 'ASC',
    field: 'numero',
  },
});

const customActions = {
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const RoomsReducer = createReducer(INITIAL_STATE, reducer);
