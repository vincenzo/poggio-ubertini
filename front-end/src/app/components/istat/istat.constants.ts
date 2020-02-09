import { generateConstants } from '../../vendors/ew-angularjs-utils/utils/generate-constants';

const domain = 'ISTAT';
const custom = {
};
const constants = generateConstants(domain, custom);

export const ISTAT = constants;
