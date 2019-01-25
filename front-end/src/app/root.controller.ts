import * as toastr from 'angular-toastr';
import * as angular from 'angular';
import ngRedux from 'ng-redux';
import { brandName } from './root.config';
import { AppService } from './common/app/app.service';
declare const VERSION;

export class RootController {

  brand: string;
  currentYear: number;
  unsubscribe: Function;
  appVersion: string;
  usingChrome: boolean;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private $window: ng.IWindowService,
    private AppService: AppService,
    private toastr: toastr.IToastrService) {
    'ngInject';

    const userAgent = this.$window.navigator.userAgent;
    this.usingChrome = /chrome/i.test(userAgent);

    this.unsubscribe = this.$ngRedux.subscribe(() => {
      let state = this.$ngRedux.getState();
      let app = state.app.toJS();
      let error = app.error ? app.error.data || app.error : null;

      if (error) {
        this.toastr.error(error.error || 'Si è verificato un errore.', `Errore ${error.code || 'indefinito'}`, {
          closeButton: true,
          extendedTimeOut: 0,
          tapToDismiss: true,
          timeOut: 0,
        });
        this.$ngRedux.dispatch(this.AppService.resetError());
      }
    });
  }

  $onInit() {
    this.brand = brandName;
    this.appVersion = VERSION;
    this.currentYear = (new Date()).getFullYear();
  }

  $onDestroy() {
    this.unsubscribe();
  }
}
