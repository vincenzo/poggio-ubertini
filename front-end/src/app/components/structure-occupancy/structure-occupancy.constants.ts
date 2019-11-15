import { generateConstants } from "../../vendors/ew-angularjs-utils/utils/generate-constants";

const domain = "STRUCTURE_OCCUPANCY";
const custom = {
  GET_DISPONIBILITA: `${domain}/GET_DISPONIBILITA`,
  GET_DISPONIBILITA_FULFILLED: `${domain}/GET_DISPONIBILITA_FULFILLED`,
  GET_DISPONIBILITA_PENDING: `${domain}/GET_DISPONIBILITA_PENDING`,
  GET_DISPONIBILITA_REJECTED: `${domain}/GET_DISPONIBILITA_REJECTED`
};
const constants = generateConstants(domain, custom);

export const STRUCTURE_OCCUPANCY = constants;
