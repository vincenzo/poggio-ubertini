import {
  createReducer,
  getReducer
} from "../../vendors/ew-angularjs-utils/common/redux-reducers-utilities";
import { CONSUNTIVO } from "./consuntivo.constants";
import { fromJS } from "immutable";

/**
 * CUSTOMIZE HERE
 */
const constants = CONSUNTIVO;

const INITIAL_STATE = fromJS({
  form: {},
  hasError: false,
  isLoading: false
});

const customActions = {};
const enables = ["all"];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const ConsuntivoReducer = createReducer(INITIAL_STATE, reducer);
