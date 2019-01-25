import { APP } from './app.constants';

export const resetError = () => ({
  type: APP.APP_RESET_ERROR,
});

export const setActiveForm = (formName: string) => ({
  type: APP.APP_SET_ACTIVE_FORM,
  payload: formName,
});