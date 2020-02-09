import { generateConstants } from '../../vendors/ew-angularjs-utils/utils/generate-constants';

const domain = 'QUESTURA';
const custom = {
};
const constants = generateConstants(domain, custom);

export const QUESTURA = constants;
