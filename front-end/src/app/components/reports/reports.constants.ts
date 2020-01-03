import { generateConstants } from '../../vendors/ew-angularjs-utils/utils/generate-constants';

const domain = 'REPORTS';
const custom = {
};
const constants = generateConstants(domain, custom);

export const REPORTS = constants;
