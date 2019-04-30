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
    'Camps.chiuso': {
      active: true,
      value: '0',
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
export const CampsReducer = createReducer(INITIAL_STATE, reducer);
