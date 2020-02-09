import { CampsService } from "./../camps.service";
import { ModalService } from "./../../../vendors/ew-angularjs-utils/components/modal/modal.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import ngRedux from "ng-redux";

export class CampCheckinoutComponentController {
  getFormData: Function;
  unsubscribe: Function;
  router: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private ReservationsService: ReservationsService,
    private CampsService: CampsService,
    private ModalService: ModalService
  ) {
    "ngInject";
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onDestroy() {
    this.unsubscribe();
  }

  submit() {
    // this.ModalService.close("assignRoomForm");
    // return this.$ngRedux
    //   .dispatch(
    //     this.ReservationsService.multiActions(
    //       "assignRoom",
    //       Object.keys(this.checks).map(key => Number(key)),
    //       {
    //         room_id: room.id
    //       }
    //     )
    //   )
    //   .then(response =>
    //     this.ReservationsService.toaster.success("Camera assegnata")
    //   )
    //   .then(() => this.getFormData(this.router.currentParams.id));
  }

  /**
   * PRIVATES
   */
  private _mapStateToThis(state) {
    return this.CampsService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.CampsService.mapDispatchToThisForm({
      getFormData: id => dispatch(this.CampsService.getFormData(id))
    })(dispatch);
  };
}
