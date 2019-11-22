import {
  createReducer,
  getReducer
} from "../../vendors/ew-angularjs-utils/common/redux-reducers-utilities";
import { ROOMS_CALENDARIO } from "./rooms-calendario.constants";
import { fromJS } from "immutable";

/**
 * CUSTOMIZE HERE
 */
const constants = ROOMS_CALENDARIO;

const INITIAL_STATE = fromJS({
  calendario: null,
  hasError: false,
  isLoading: false
});

function getCalendarioFulfilled(state, action) {
  return state.set("calendario", action.payload);
}

const customActions = {
  [ROOMS_CALENDARIO.GET_CALENDARIO_FULFILLED]: getCalendarioFulfilled
};
const enables = ["all"];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const RoomsCalendarioReducer = createReducer(INITIAL_STATE, reducer);
