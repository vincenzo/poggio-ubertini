import ngRedux from "ng-redux";
import { ConsuntivoService } from "./consuntivo.service";
import { EwCommonFormController } from "../../vendors/ew-angularjs-utils/common/common-form-controller";

export class ConsuntivoComponentController extends EwCommonFormController {
  constructor($ngRedux, hotkeys, ConsuntivoService: ConsuntivoService) {
    "ngInject";
    super($ngRedux, ConsuntivoService);
    this.config = {
      deleteSuccess: "Consuntivo cancellato correttamente",
      formId: "#consuntivo-form",
      isModal: false,
      parentIdParam: "id",
      parentRoute: "camps",
      saveError: "Sono presenti degli errori. Controlla e riprova.",
      saveSuccess: "Consuntivo salvato.",
      title: "Consuntivo",
      titleEntity: "consuntivo"
    };
  }
}
