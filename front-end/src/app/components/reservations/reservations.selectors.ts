import { generateCommonSelectors } from '../../vendors/ew-angularjs-utils/utils/generic-selectors';

/**
 * Selectors are like queries for your central state. The Thread selectors pull
 * out views of the threads structure
 */

export const {
  getLookup,
  getModelErrors,
  getModelFilterPanel,
  getModelFilters,
  getModelForm,
  getModelList,
  getModelPagination,
  getModelSort,
  getModelState,
  getRouterState,
  getVirtuals,
} = generateCommonSelectors('reservations');
