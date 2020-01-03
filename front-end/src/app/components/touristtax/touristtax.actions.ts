import { generateCommonAction } from '../../vendors/ew-angularjs-utils/utils/generic-actions';
import { TOURISTTAX } from './touristtax.constants';

export const {
  applyFiltersAction,
  applyPaginationAction,
  applySortAction,
  changePaginationLimitAction,
  changePageAction,
  closeFiltersPanelAction,
  deleteItemAction,
  getAction,
  getFormDataAction,
  openFiltersPanelAction,
  promiseAction,
  resetFiltersAction,
  resetModelAction,
  resetSortAction,
  saveAction,
  toggleActiveAction,
  updateModelAction
} = generateCommonAction(TOURISTTAX);
