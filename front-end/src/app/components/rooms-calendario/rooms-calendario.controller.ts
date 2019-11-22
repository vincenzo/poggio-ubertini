import ngRedux from "ng-redux";
import { RoomsCalendarioService } from "./rooms-calendario.service";

export class RoomsCalendarioComponentController {
  /**
   * Properties
   */
  unsubscribe: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private RoomsCalendarioService: RoomsCalendarioService
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
    return this.RoomsCalendarioService.mapStateToThisIndex({
      calendario: state.roomsCalendario.toJS(),
    })(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.RoomsCalendarioService.mapDispatchToThisIndex()(dispatch);
  };
}
