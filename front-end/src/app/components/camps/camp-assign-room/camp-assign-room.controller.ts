import { RoomsService } from "./../../rooms/rooms.service";
import { CampsService } from "./../camps.service";
import { ModalService } from "./../../../vendors/ew-angularjs-utils/components/modal/modal.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import ngRedux from "ng-redux";
import * as moment from "moment";

export class CampAssignRoomComponentController {
  camp: any;
  checks = {};
  countedChecks = 0;
  daterange: any;
  getFormData: Function;
  unsubscribe: Function;
  router: any;
  rooms: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private ReservationsService: ReservationsService,
    private CampsService: CampsService,
    private ModalService: ModalService,
    private RoomsService: RoomsService
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

  $onInit() {
    this.daterange =
      moment(this.camp.data_inizio).format("YYYY-MM-DD") +
      " | " +
      moment(this.camp.data_fine).format("YYYY-MM-DD");
  }

  assegna(room) {
    if (!Object.keys(this.checks).length) {
      return this.ReservationsService.toaster.info(
        "Seleziona almeno un ospite"
      );
    }

    this.ModalService.close("assignRoomForm");
    
    const [dataDa, dataA] = this.daterange.split(" | ");

    return this.$ngRedux
      .dispatch(
        this.ReservationsService.multiActions(
          "assignRoom",
          Object.keys(this.checks).map(key => Number(key)),
          {
            room_id: room.id,
            data_previsto_in: dataDa,
            data_previsto_out: dataA,
          }
        )
      )
      .then(response =>
        this.ReservationsService.toaster.success("Camera assegnata")
      )
      .then(() => this.getFormData(this.router.currentParams.id));
  }

  countCheck(id, value) {
    this.checks[id] = value;
    // console.log('checks', this.checks);
    this.countedChecks = Object.keys(this.checks).filter(
      key => this.checks[key]
    ).length;
  }

  onDaterangeFilter(event) {
    console.log(event);

    this.daterange = event.value;

    const [dataDa, dataA] = event.value.split(" | ");

    return this.RoomsService.getDisponibilitaCampo({
      camp_id: this.camp.id,
      data_da: dataDa,
      data_a: dataA
    }).then(response => {
      console.log(response);
      this.rooms = response.data;
    });
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
