import { generateConstants } from '../../vendors/ew-angularjs-utils/utils/generate-constants';

const domain = 'GUESTS';
const custom = {
  ADD_GUESTS_FROM_FILE: `${domain}/ADD_GUESTS_FROM_FILE`,
  ADD_GUESTS_FROM_FILE_FULFILLED: `${domain}/ADD_GUESTS_FROM_FILE_FULFILLED`,
  ADD_GUESTS_FROM_FILE_PENDING: `${domain}/ADD_GUESTS_FROM_FILE_PENDING`,
  ADD_GUESTS_FROM_FILE_REJECTED: `${domain}/ADD_GUESTS_FROM_FILE_REJECTED`,

  TOGGLE_ACTIVE: `${domain}/TOGGLE_ACTIVE`,
  TOGGLE_ACTIVE_FULFILLED: `${domain}/TOGGLE_ACTIVE_FULFILLED`,
  TOGGLE_ACTIVE_PENDING: `${domain}/TOGGLE_ACTIVE_PENDING`,
  TOGGLE_ACTIVE_REJECTED: `${domain}/TOGGLE_ACTIVE_REJECTED`,
};
const constants = generateConstants(domain, custom);

export const GUESTS = constants;
