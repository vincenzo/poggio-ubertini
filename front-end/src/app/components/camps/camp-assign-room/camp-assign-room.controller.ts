import { ModalService } from "./../../../vendors/ew-angularjs-utils/components/modal/modal.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import ngRedux from 'ng-redux';

export class CampAssignRoomComponentController {
  checks = {};
  countedChecks = 0;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private ReservationsService: ReservationsService,
    private ModalService: ModalService
  ) {
    "ngInject";
    // this.unsubscribe = this.$ngRedux.connect(
    //   this._mapStateToThis.bind(this),
    //   this._mapDispatchToThis
    // )(this);
  }

  assegna(room) {
    return this.$ngRedux
      .dispatch(
        this.ReservationsService.multiActions(
          "assignRoom",
          Object.keys(this.checks).map(key => Number(key)),
          {
            room_id: room.id
          }
        )
      )
      .then(response => {
        this.ReservationsService.toaster.success("Camera assegnata");
        this.ModalService.close("assignRoomForm");
      });
  }

  countCheck(id, value) {
    this.checks[id] = value;
    // console.log('checks', this.checks);
    this.countedChecks = Object.keys(this.checks).filter(
      key => this.checks[key]
    ).length;
  }
}
