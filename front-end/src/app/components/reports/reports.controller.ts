import ngRedux from "ng-redux";
import { ReportsService } from "./reports.service";

export class ReportsComponentController {
  /**
   * Properties
   */
  deleteItem: Function;
  extra;
  get: Function;
  stateGo: Function;
  toggleActive: Function;
  unsubscribe: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private ReportsService: ReportsService
  ) {
    "ngInject";
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit(): void {}

  $onDestroy(): void {
    this.unsubscribe();
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.ReportsService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.ReportsService.mapDispatchToThisIndex()(dispatch);
  };
}
