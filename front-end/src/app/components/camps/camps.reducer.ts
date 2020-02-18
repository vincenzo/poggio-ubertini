import {
  createReducer,
  getReducer
} from "../../vendors/ew-angularjs-utils/common/redux-reducers-utilities";
import { CAMPS } from "./camps.constants";
import { RESERVATIONS } from "../reservations/reservations.constants";
import { ROOMS } from "../rooms/rooms.constants";
import { fromJS } from "immutable";

/**
 * CUSTOMIZE HERE
 */
const constants = CAMPS;

const INITIAL_STATE = fromJS({
  filterGuestsByRoom: 9,
  filters: {
    "Camps.id": {
      active: false,
      value: null
    },
    "Camps.effettivo": {
      active: true,
      value: "1"
    },
    "Camps.chiuso": {
      active: true,
      value: "0"
    }
  },
  filterPanel: {
    focusedField: "",
    isOpen: false
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
    page_count: 0
  },
  rooms: {
    hasError: false,
    isLoading: false,
    list: []
  },
  sort: {
    default: "id",
    direction: "DESC",
    field: "id"
  }
});

function filterGuestsByRoom(state, action) {
  return state.set("filterGuestsByRoom", action.payload.roomId);
}

function multiActionsFulfilled(state, action) {
  return state.set("isLoading", false);
}

function multiActionsPending(state, action) {
  return state.set("isLoading", true);
}

function multiActionsRejected(state, action) {
  return state.set("isLoading", false);
}

function getDisponibilitaFulfilled(state, action) {
  return state
    .setIn(["rooms", "hasError"], false)
    .setIn(["rooms", "isLoading"], false)
    .setIn(["rooms", "list"], action.payload.data);
}

function getDisponibilitaPending(state, action) {
  return state
    .setIn(["rooms", "hasError"], false)
    .setIn(["rooms", "isLoading"], true)
    .setIn(["rooms", "list"], []);
}

function getDisponibilitaRejected(state, action) {
  return state
    .setIn(["rooms", "hasError"], true)
    .setIn(["rooms", "isLoading"], false)
    .setIn(["rooms", "list"], []);
}

const customActions = {
  [CAMPS.FILTER_GUESTS_BY_ROOM]: filterGuestsByRoom,

  [RESERVATIONS.MULTI_ACTIONS_FULFILLED]: multiActionsFulfilled,
  [RESERVATIONS.MULTI_ACTIONS_PENDING]: multiActionsPending,
  [RESERVATIONS.MULTI_ACTIONS_REJECTED]: multiActionsRejected,

  [ROOMS.GET_DISPONIBILITA_FULFILLED]: getDisponibilitaFulfilled,
  [ROOMS.GET_DISPONIBILITA_PENDING]: getDisponibilitaPending,
  [ROOMS.GET_DISPONIBILITA_REJECTED]: getDisponibilitaRejected
};
const enables = ["all"];
const reducer = getReducer(constants, INITIAL_STATE, enables, customActions);
export const CampsReducer = createReducer(INITIAL_STATE, reducer);
