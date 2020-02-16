import { CampsService } from "./../camps.service";
import { ModalService } from "./../../../vendors/ew-angularjs-utils/components/modal/modal.service";
import { ReservationsService } from "./../../reservations/reservations.service";
import ngRedux from "ng-redux";
import * as moment from "moment";

export class CampCheckinoutComponentController {
  ids: any;
  type: "in" | "out";
  model: any;
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

  $onInit() {
    this.model = {
      date: moment().toDate(),
      time: moment().format("HHmm")
    };
  }

  submit() {
    this.ModalService.close("checkInOutForm");
    console.log(this.model.data);
    const dateTime =
      moment(this.model.date).format("YYYY-MM-DD") +
      " " +
      moment(this.model.time, "HHmm").format("HH:mm");
    return this.$ngRedux
      .dispatch(
        this.ReservationsService.multiActions(
          "check",
          this.ids.map(value => Number(value)),
          {
            type: this.type,
            value: dateTime
          }
        )
      )
      .then(response =>
        this.ReservationsService.toaster.success("Camera assegnata")
      )
      .then(() => this.getFormData(this.router.currentParams.id));
  }

  /**
   * PRIVATES
   */
  private _mapStateToThis(state) {
    return this.CampsService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.CampsService.mapDispatchToThisForm({
      getFormData: id => dispatch(this.CampsService.getFormData(id)),
      updateModel: event => this._updateModel(event)
    })(dispatch);
  };

  _updateModel(event) {
    console.log(event);
    this.model[event.name] = event.value;
    console.log(this.model);
  }
}
