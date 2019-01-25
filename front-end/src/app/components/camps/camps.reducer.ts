import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { CAMPS } from './camps.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = CAMPS;

const INITIAL_STATE = fromJS({
  filters: {
    'Camps.id': {
      active: false,
      value: null,
    },
    'Camps.username': {
      active: false,
      value: null,
    },
    'Camps.email': {
      active: false,
      value: null,
    },
    'Camps.role': {
      active: false,
      value: null,
    },
    'Camps.active': {
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
export const CampsReducer = createReducer(INITIAL_STATE, reducer);