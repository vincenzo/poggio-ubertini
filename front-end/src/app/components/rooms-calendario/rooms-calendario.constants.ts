import { generateConstants } from "../../vendors/ew-angularjs-utils/utils/generate-constants";

const domain = "ROOMS_CALENDARIO";
const custom = {
  GET_CALENDARIO: `${domain}/GET_CALENDARIO`,
  GET_CALENDARIO_FULFILLED: `${domain}/GET_CALENDARIO_FULFILLED`,
  GET_CALENDARIO_PENDING: `${domain}/GET_CALENDARIO_PENDING`,
  GET_CALENDARIO_REJECTED: `${domain}/GET_CALENDARIO_REJECTED`
};
const constants = generateConstants(domain, custom);

export const ROOMS_CALENDARIO = constants;
