import { generateConstants } from '../../vendors/ew-angularjs-utils/utils/generate-constants';

const domain = 'RESERVATIONS';
const custom = {
  MULTI_ACTIONS: `${domain}/MULTI_ACTIONS`,
  MULTI_ACTIONS_FULFILLED: `${domain}/MULTI_ACTIONS_FULFILLED`,
  MULTI_ACTIONS_PENDING: `${domain}/MULTI_ACTIONS_PENDING`,
  MULTI_ACTIONS_REJECTED: `${domain}/MULTI_ACTIONS_REJECTED`,
};
const constants = generateConstants(domain, custom);

export const RESERVATIONS = constants;
