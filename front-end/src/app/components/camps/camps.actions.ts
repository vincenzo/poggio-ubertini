import { generateCommonAction } from "../../vendors/ew-angularjs-utils/utils/generic-actions";
import { CAMPS } from "./camps.constants";

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
} = generateCommonAction(CAMPS);

export const filterGuestsByRoom = roomId => ({
  type: CAMPS.FILTER_GUESTS_BY_ROOM,
  payload: { roomId }
});
