import { RoomsService } from './../../rooms/rooms.service';
import * as moment from 'moment';
import { EwCommonFormController } from '../../../vendors/ew-angularjs-utils/common/common-form-controller';
import { CampsService } from '../camps.service';
import { ReservationsService } from './../../reservations/reservations.service';

export class CampViewComponentController extends EwCommonFormController {

  getDisponibilita: (dataDa: string, dataA?: string) => Promise<any>;

  constructor(
    $ngRedux,
    hotkeys,
    CampsService: CampsService,
    private RoomsService: RoomsService,
    private ReservationsService: ReservationsService,
  ) {
    'ngInject';
    super($ngRedux, CampsService);
    this.config = {
      deleteSuccess: 'Campo cancellato correttamente',
      formId: '#camps-form',
      isModal: false,
      parentIdParam: 'id',
      parentRoute: 'camps',
      saveError: 'Sono presenti degli errori. Controlla e riprova.',
      saveSuccess: 'Campo salvato.',
      title: 'Dati campo',
      titleEntity: 'campo',
    };

    // FIXME: rimuovere il mock quando funziona il resto
    this.model.ipotesi_spesa = 12343;
    this.model.upload = {
      id: 1,
      public_filename: 'prova',
      presigned_url: 'http://eliagentili.it',
      created: new Date(),
    };
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      getDisponibilita: (dataDa, dataA?) => dispatch(this.RoomsService.getDisponibilita(dataDa, dataA)),
    };
  }

  selectTab(tabName: string) {
    this.focusOnField('#focused_input_' + tabName);
  }

  getAvailability() {
    if (!this.model.data_disponibilita) {
      return;
    }

    return this.getDisponibilita(this.model.data_disponibilita);
  }

  /**
   * PRIVATES
   */

  
}
