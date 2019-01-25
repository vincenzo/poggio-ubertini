import ngRedux from 'ng-redux';
import {
  resetError,
  setActiveForm,
} from './app.actions';

export class AppService {

  constructor(
  ) {
    'ngInject';
  }

  resetError = () => {
    return resetError();
  };

  setActiveForm = (formName: string) => dispatch => {
    dispatch(setActiveForm(formName));
    return Promise.resolve(formName);
  };

}
