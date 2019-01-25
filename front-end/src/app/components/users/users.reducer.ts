import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { USERS } from './users.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = USERS;

const INITIAL_STATE = fromJS({
  filters: {
    'Users.id': {
      active: false,
      value: null,
    },
    'Users.username': {
      active: false,
      value: null,
    },
    'Users.email': {
      active: false,
      value: null,
    },
    'Users.role': {
      active: false,
      value: null,
    },
    'Users.active': {
      active: true,
      value: '1',
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
    limit: 50,
    page_count: 0,
  },
  sort: {
    default: 'ragione_sociale',
    direction: 'ASC',
    field: 'ragione_sociale',
  },
});

const customActions = {
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const UsersReducer = createReducer(INITIAL_STATE, reducer);
