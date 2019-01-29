import { generateConstants } from '../../vendors/ew-angularjs-utils/utils/generate-constants';

const domain = 'STRUCTURES';
const custom = {
  TOGGLE_ACTIVE: `${domain}/TOGGLE_ACTIVE`,
  TOGGLE_ACTIVE_FULFILLED: `${domain}/TOGGLE_ACTIVE_FULFILLED`,
  TOGGLE_ACTIVE_PENDING: `${domain}/TOGGLE_ACTIVE_PENDING`,
  TOGGLE_ACTIVE_REJECTED: `${domain}/TOGGLE_ACTIVE_REJECTED`,
};
const constants = generateConstants(domain, custom);

export const STRUCTURES = constants;
