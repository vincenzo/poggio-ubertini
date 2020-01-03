import ngRedux from "ng-redux";
import { TouristtaxService } from "./touristtax.service";

export class TouristtaxComponentController {
  /**
   * Properties
   */
  unsubscribe: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private TouristtaxService: TouristtaxService
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
    return this.TouristtaxService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.TouristtaxService.mapDispatchToThisIndex()(dispatch);
  };
}
