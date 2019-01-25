import * as angular from 'angular';
import * as moment from 'moment';

import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import { EwCommonService } from '../../vendors/ew-angularjs-utils/common/common-service';

import {
  getCarsDataAction,
  getContractsDataAction,
  getPaymentsDataAction,
  promiseAction,
} from './dashboard.actions';

export class DashboardService extends EwCommonService {

  apiPath: string;
  dbFields: Array<any>;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    super('dashboard', null, EwServerService);

    this.dbFields = [
    ];

    this.ignoreFieldsOnSave = [];
  }

  getCarsData = () => dispatch => {
    return dispatch(getCarsDataAction(this._getCarsData()));
  };

  getContractsData = () => dispatch => {
    const contractsFilters = {
      Contracts: {
        stato: 'APE',
      },
    };

    return dispatch(getContractsDataAction(this._getContractsData(contractsFilters)));
  };

  getNotesData = () => dispatch => {
    return dispatch(promiseAction('GET_NOTES_DATA', this._getNotesData()));
  };

  getPaymentsData = () => dispatch => {
    const fromDate = moment().subtract(36, 'months').format('YYYY-MM-DD');
    const today = moment().format('YYYY-MM-DD');
    const paymentsFilters = {
      ScheduledPayments: {
        registrato: false,
        data_scadenza: `${fromDate} | ${today}`,
      },

    };

    return dispatch(getPaymentsDataAction(this._getPaymentsData(paymentsFilters)));
  };

  saveNotes = (notes) => dispatch => {
    return dispatch(promiseAction('SAVE_NOTES', this._saveNotes(notes)));
  };

  /**
   * PRIVATES
   */

  private _getCarsData() {
    return this.serverService
      .get('/cars/venduteNonConsegnate')
      .then(response => response.data);
  }

  private _getContractsData(filters) {
    return this.serverService
      .post('/contracts', filters)
      .then(response => response.data);
  }

  private _getNotesData() {
    return this.serverService
      // FIXME: id 1 hardocded
      .get('/options/view/1')
      .then(response => response.data);
  }

  private _getPaymentsData(filters) {
    return this.serverService
      .post('/scheduledPayments?page=1&limit=250', filters)
      .then(response => response.data);
  }

  private _saveNotes(notes) {
    return this.serverService
      // FIXME: id 1 hardocded
      .post('/options/edit/1', {
        id: 1,
        value: notes,
      })
      .then(response => response.data);
  }
}
