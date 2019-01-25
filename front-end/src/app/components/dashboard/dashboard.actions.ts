import { generateCommonAction } from '../../vendors/ew-angularjs-utils/utils/generic-actions';
import { DASHBOARD } from './dashboard.constants';

export const {
  applyFiltersAction,
  applyPaginationAction,
  applySortAction,
  changePaginationLimitAction,
  changePageAction,
  closeFiltersPanelAction,
  deleteItemAction,
  getAction,
  getByIdAction,
  getFormDataAction,
  openFiltersPanelAction,
  promiseAction,
  resetFiltersAction,
  resetModelAction,
  resetSortAction,
  saveAction,
  toggleActiveAction,
  updateModelAction
} = generateCommonAction(DASHBOARD);

export const getCarsDataAction = (getCarsDataPromise) => ({
  type: DASHBOARD.GET_CARS_DATA,
  payload: getCarsDataPromise
});

export const getContractsDataAction = (getContractsDataPromise) => ({
  type: DASHBOARD.GET_CONTRACTS_DATA,
  payload: getContractsDataPromise
});

export const getPaymentsDataAction = (getPaymentsDataPromise) => ({
  type: DASHBOARD.GET_PAYMENTS_DATA,
  payload: getPaymentsDataPromise
});