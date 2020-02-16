import * as jQuery from "jquery";
import ngRedux from "ng-redux";
import { scrollToElement } from "../../../vendors/ew-angularjs-utils/utils/scroll-to-top";
import { UploadsService } from "../../../vendors/ew-angularjs-utils/components/uploads/uploads.service";
import { stateGo } from "redux-ui-router";

import { CampsService } from "../camps.service";

export class CampFormComponentController {
  auth: any;
  action: string;
  activeTab: number;
  form: ng.IFormController;
  get: Function;
  getFormData: Function;
  // FIXME: mock per mostrare qualcosa in test
  mockGuests: any[];
  hasError: any;
  model: any;
  resetModel: Function;
  router: any;
  save: Function;
  stateGo: Function;
  tabs: Array<any>;
  title: string;
  unsubscribe: Function;
  updateModel: Function;
  uploadFile: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private $timeout: ng.ITimeoutService,
    private hotkeys,
    private CampsService: CampsService,
    private UploadsService: UploadsService
  ) {
    "ngInject";
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit() {
    this.title = (this.isEdit() ? "Modifica " : "Aggiungi ") + "campo";

    // Seleziona di default il primo tab
    this.activeTab = 0;
    this.tabs = ["doc_offerta", "emails", "doc_renter"];
    this.tabs.forEach((tab, index) => this._addTabsHotkeys(tab, index));

    // FIXME: rimuovere dopo test
    this.mockGuests = [
      {
        id: 1,
        nome: "Elia",
        cognome: "Gentili",
        arrivo: new Date(),
        partenza: new Date()
      },
      {
        id: 2,
        nome: "Massimo",
        cognome: "Frascati",
        arrivo: new Date(),
        partenza: new Date()
      },
      {
        id: 3,
        nome: "Michele",
        cognome: "Spina",
        arrivo: new Date(),
        partenza: new Date()
      },
      {
        id: 4,
        nome: "Luca",
        cognome: "Bottero",
        arrivo: new Date(),
        partenza: new Date()
      }
    ];
  }

  $onDestroy() {
    this.tabs.forEach((tab, index) => this._deleteTabsHotkeys(tab, index));
    this.unsubscribe();
  }

  isAdd() {
    return this.action === "add";
  }

  isAuthorized(element: string) {
    switch (element) {
      case "ipotesiSpesa":
        return ["admin"].indexOf(this.auth.user.role) > -1;
      default:
        return false;
    }
  }

  isEdit() {
    return this.action === "edit";
  }

  onUploadFile(event) {
    return this._uploadFile(event.value);
  }

  reloadFormData() {
    return this.updateModel({
      name: "upload",
      value: null,
      skipHash: true
    }).then(() => this.getFormData(this.model.id));
  }

  selectTab(tabName: string) {
    this.$timeout(() => {
      jQuery("#focused_input_" + tabName).focus();
      // this.$scope.$broadcast('SetFocus');
    }, 50);
  }

  saveAndStay() {
    this.submit(this.model, true);
  }

  submit(model, stay) {
    if (this.form.$valid) {
      let response = null;
      return (
        this.save(model)
          .then(res => (response = res.value.data))
          .then(() => this.get())
          // se clicco salva, rimando sempre alla index
          .then(() =>
            !stay ? this.stateGo("camps.view", { id: response.id }) : null
          )
          // se clicco salva e resta ho 2 casi: 1- sono in add e quindi rimando alla edit, 2- sono in edit e quindi resto dove sono
          .then(() =>
            stay && this.isAdd()
              ? this.stateGo("camps.edit", { id: response.id })
              : null
          )
          .then(() => this.CampsService.toaster.success("Campo salvato"))
      );
    }

    this.CampsService.toaster.error(
      "Sono presenti degli errori. Controlla e riprova."
    );
    const el: any = jQuery(
      "#campform-dialog input.ng-invalid:first, select.ng-invalid:first"
    );
    el.focus();
    scrollToElement(el, 80);
  }

  updateCapogruppo(event) {
    return this.updateModel({
      name: event.name,
      value: event.value.value
    });
  }

  /**
   * PRIVATES
   */

  private _addTabsHotkeys(tab, index) {
    this.hotkeys.add({
      combo: [`ctrl+${index + 1}`, `mod+${index + 1}`],
      description: `Seleziona tab "${tab}"`,
      allowIn: ["INPUT", "SELECT", "TEXTAREA"],
      callback: e => {
        e.preventDefault();
        this.activeTab = index;
      }
    });
  }

  private _deleteTabsHotkeys(tab, index) {
    this.hotkeys.del([`ctrl+${index + 1}`, `mod+${index + 1}`]);
  }

  private _mapStateToThis(state) {
    return this.CampsService.mapStateToThisForm()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.CampsService.mapDispatchToThisForm({
      uploadFile: model => dispatch(this.UploadsService.upload(model))
    })(dispatch);
  };

  private _uploadFile(file) {
    // console.log('modelName', modelName);
    // console.log('file', file);
    // console.log('entity', entity);

    if (!file) {
      return Promise.resolve(this.model);
    }

    this.uploadFile({
      categoria: "ipotesi_spesa",
      file: file,
      model_id: this.model.id,
      model_name: "Camps"
    })
      .then(
        ({ sameRoute, upload }) =>
          sameRoute &&
          this.updateModel({ name: "upload", value: upload, skipHash: true })
      )
      .then(() => this.getFormData(this.model.id));

    return Promise.resolve(this.model);
  }
}
