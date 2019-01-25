import ngRedux from 'ng-redux';
import { DashboardService } from './dashboard.service'

export class DashboardController {

  /**
   * Bindings
   */

  /**
   * Properties
   */
  unsubscribe: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private DashboardService: DashboardService,
  ) {
    'ngInject';

    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis = (state) => {
    return this.DashboardService.mapStateToThisForm()(state);
  };

  private _mapDispatchToThis = dispatch => {
    return this.DashboardService.mapDispatchToThisForm()(dispatch);
  };
}
