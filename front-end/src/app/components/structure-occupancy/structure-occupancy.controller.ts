import ngRedux from "ng-redux";
import { StructureOccupancyService } from "./structure-occupancy.service";

export class StructureOccupancyComponentController {
  /**
   * Properties
   */
  unsubscribe: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private StructureOccupancyService: StructureOccupancyService
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
    return this.StructureOccupancyService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.StructureOccupancyService.mapDispatchToThisIndex()(dispatch);
  };
}
