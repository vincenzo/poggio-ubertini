import ngRedux from "ng-redux";
import { TouristtaxService } from "./touristtax.service";

export class TouristtaxComponentController {
  /**
   * Properties
   */
  form: ng.IFormController;
  model: any;
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

  $onInit(): void {
    const now = new Date();
    this.model = {
      y: now.getFullYear(),
      tri: "tri" + this._quarterOfTheYear(now)
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  submit(model) {
    if (this.form.$valid) {
      return this.TouristtaxService.report(model).then(res => {
        let FileSaver = require("file-saver");
        let blob = new Blob([res], { type: "application/txt" });
        FileSaver.saveAs(blob, `report_imposta_di_soggiorno.txt`);
      });
    }
  }

  updateModel(event) {
    this.model[event.name] = event.value;
  }

  /**
   * PRIVATES
   */

  private _quarterOfTheYear(date) {
    const month = date.getMonth() + 1;
    return Math.ceil(month / 3);
  }

  private _mapStateToThis(state) {
    return this.TouristtaxService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.TouristtaxService.mapDispatchToThisIndex()(dispatch);
  };
}
