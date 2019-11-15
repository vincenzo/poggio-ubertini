import {
  createReducer,
  getReducer
} from "../../vendors/ew-angularjs-utils/common/redux-reducers-utilities";
import { STRUCTURE_OCCUPANCY } from "./structure-occupancy.constants";
import { fromJS } from "immutable";

/**
 * CUSTOMIZE HERE
 */
const constants = STRUCTURE_OCCUPANCY;

const INITIAL_STATE = fromJS({
  form: {},
  hasError: false,
  isLoading: false
});

export function getDisponibilitaFulfilled(state, action) {
  return state.set("year", fromJS(action.payload));
}

const customActions = {
  [constants.GET_DISPONIBILITA]: getDisponibilitaFulfilled
};
const enables = ["all"];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const StructureOccupancyReducer = createReducer(INITIAL_STATE, reducer);
