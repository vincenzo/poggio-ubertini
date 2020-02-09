import ngRedux from "ng-redux";
import { QuesturaService } from "./questura.service";

export class QuesturaComponentController {
  /**
   * Properties
   */
  form: ng.IFormController;
  model: any;
  unsubscribe: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private QuesturaService: QuesturaService
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
      tri: this._quarterOfTheYear(now)
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  submit(model) {
    if (this.form.$valid) {
      return this.QuesturaService.report(model).then(res => {
        let FileSaver = require("file-saver");
        let blob = new Blob([res], { type: "application/txt" });
        FileSaver.saveAs(blob, `report_questura.txt`);
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
    return this.QuesturaService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.QuesturaService.mapDispatchToThisIndex()(dispatch);
  };
}
