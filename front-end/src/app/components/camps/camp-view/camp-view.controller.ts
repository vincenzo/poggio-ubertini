import * as moment from 'moment';
import { EwCommonFormController } from '../../../vendors/ew-angularjs-utils/common/common-form-controller';
import { CampsService } from '../camps.service';
import { ReservationsService } from './../../reservations/reservations.service';

export class CampViewComponentController extends EwCommonFormController {

  multiActions: (action: 'check' | 'assignRoom', ids: number[], params) => Promise<any>;

  constructor(
    $ngRedux,
    hotkeys,
    CampsService: CampsService,
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
    this.model.upload = {
      id: 1,
      public_filename: 'prova',
      presigned_url: 'http://eliagentili.it',
      created: new Date(),
    };
  }

  getMapDispatchToThisParams(dispatch) {
    return {
      multiActions: (a, i, p) => dispatch(this.ReservationsService.multiActions(a, i, p)),
    };
  }

  selectTab(tabName: string) {
    this.focusOnField('#focused_input_' + tabName);
  }

  checkIn(reservation: any, date?: string) {
    const params = {
      type: 'in',
      value: date || moment().format('YYYY-MM-DD'),
    };
    return this._check([reservation.id], params);
  }

  checkOut(reservation: any, date?: string) {
    const params = {
      type: 'out',
      value: date || moment().format('YYYY-MM-DD'),
    };
    return this._check([reservation.id], params);
  }

  /**
   * PRIVATES
   */

  private _check(ids: number[], params: { type: string, value: string }) {
    return this.multiActions('check', ids, params)
      .then(() => this.getFormData(this.model.id));
  }
}
