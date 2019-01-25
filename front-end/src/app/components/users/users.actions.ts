import { generateCommonAction } from '../../vendors/ew-angularjs-utils/utils/generic-actions';
import { USERS } from './users.constants';

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
  resetFiltersAction,
  resetModelAction,
  resetSortAction,
  saveAction,
  toggleActiveAction,
  updateModelAction
} = generateCommonAction(USERS);
