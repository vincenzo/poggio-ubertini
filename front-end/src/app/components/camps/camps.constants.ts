import { generateConstants } from "../../vendors/ew-angularjs-utils/utils/generate-constants";

const domain = "CAMPS";
const custom = {
  ADD_MANY_GUESTS: `${domain}/ADD_MANY_GUESTS`,
  ADD_MANY_GUESTS_FULFILLED: `${domain}/ADD_MANY_GUESTS_FULFILLED`,
  ADD_MANY_GUESTS_PENDING: `${domain}/ADD_MANY_GUESTS_PENDING`,
  ADD_MANY_GUESTS_REJECTED: `${domain}/ADD_MANY_GUESTS_REJECTED`,

  FILTER_GUESTS_BY_ROOM: `${domain}/FILTER_GUESTS_BY_ROOM`,

  TOGGLE_ACTIVE: `${domain}/TOGGLE_ACTIVE`,
  TOGGLE_ACTIVE_FULFILLED: `${domain}/TOGGLE_ACTIVE_FULFILLED`,
  TOGGLE_ACTIVE_PENDING: `${domain}/TOGGLE_ACTIVE_PENDING`,
  TOGGLE_ACTIVE_REJECTED: `${domain}/TOGGLE_ACTIVE_REJECTED`
};
const constants = generateConstants(domain, custom);

export const CAMPS = constants;
