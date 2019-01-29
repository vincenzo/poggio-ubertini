import {
  createReducer,
  getReducer,
} from '../../vendors/ew-angularjs-utils/common/redux-reducers-utilities';
import { STRUCTURES } from './structures.constants';
import { fromJS } from 'immutable';

/**
 * CUSTOMIZE HERE
 */
const constants = STRUCTURES;

const INITIAL_STATE = fromJS({
  filters: {
    'Structures.id': {
      active: false,
      value: null,
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
    default: 'id',
    direction: 'DESC',
    field: 'id',
  },
});

const customActions = {
};
const enables = ['all'];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const StructuresReducer = createReducer(INITIAL_STATE, reducer);
