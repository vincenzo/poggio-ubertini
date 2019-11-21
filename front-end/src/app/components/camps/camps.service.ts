import { campsConfig } from "./camps.config";
import { EwServerService } from "../../vendors/ew-angularjs-utils/components/server/server.service";
import { EwCommonService } from "../../vendors/ew-angularjs-utils/common/common-service";

import { promiseAction } from "./camps.actions";

export class CampsService extends EwCommonService {
  apiPath: string;
  dbFields: Array<any>;

  constructor(private EwServerService: EwServerService, private Upload) {
    "ngInject";

    super("camps", campsConfig, EwServerService);

    this.dbFields = [
      { name: "id", type: "number" },
      { name: "capogruppo_id", type: "number" },
      { name: "n_scheda", type: "number" },
      { name: "data_scheda", type: "date" },
      { name: "nome", type: "string" },
      { name: "data_inizio", type: "date" },
      { name: "data_fine", type: "date" },
      { name: "tipo", type: "string" },
      { name: "fattura_ragione_sociale", type: "string" },
      { name: "fattura_codice_fiscale", type: "string" },
      { name: "fattura_partita_iva", type: "string" },
      { name: "fattura_indirizzo", type: "string" },
      { name: "fattura_citta", type: "string" },
      { name: "fattura_nazione", type: "string" },
      { name: "fattura_provincia", type: "string" },
      { name: "fattura_cap", type: "number" },
      { name: "tipo_documento_fiscale", type: "string" },
      { name: "note", type: "string" },
      { name: "chiuso", type: "boolean" },
      { name: "created", type: "date" },
      { name: "modified", type: "date" },
      {
        name: "upload_ipotesi_spesa",
        type: "object",
        fields: [
          { name: "id", type: "number" },
          { name: "model_id", type: "number" },
          { name: "model_name", type: "string" },
          { name: "categoria", type: "string" },
          { name: "descrizione", type: "string" },
          { name: "extra_data", type: "string" },
          { name: "file_name", type: "string" },
          { name: "base_name", type: "string" },
          { name: "estensione", type: "string" },
          { name: "suffisso_auto", type: "string" },
          { name: "file_type", type: "string" },
          { name: "file_dir", type: "string" },
          { name: "archiviato", type: "string" },
          { name: "data_archiviato", type: "date" },
          { name: "created", type: "date" },
          { name: "public_filename", type: "string" },
          { name: "presigned_url", type: "string" },
          { name: "preview_url", type: "string" }
        ]
      },
      {
        name: "reservations",
        type: "array",
        fields: [
          { name: "id", type: "number" },
          { name: "camp_id", type: "number" },
          { name: "guest_id", type: "number" },
          { name: "room_id", type: "number" },
          { name: "data_in", type: "date" },
          { name: "data_out", type: "date" },
          { name: "flag_in", type: "boolean" },
          { name: "flag_out", type: "boolean" },
          { name: "tipo_tariffa", type: "string" },
          { name: "lenzuola", type: "number" },
          { name: "asciugamani", type: "number" },
          { name: "responsabile", type: "boolean" },
          { name: "created", type: "date" },
          { name: "modified", type: "date" },
          {
            name: "guest",
            type: "object",
            fields: [
              { name: "id", type: "number" },
              { name: "user_id", type: "number" },
              { name: "nome", type: "string" },
              { name: "cognome", type: "string" },
              { name: "capogruppo", type: "string" },
              { name: "documento_italiano", type: "string" },
              { name: "documento_tipo", type: "string" },
              { name: "documento_numero", type: "string" },
              { name: "documento_data_rilascio", type: "string" },
              { name: "documento_data_scadenza", type: "date" },
              { name: "documento_rilasciato_ente", type: "string" },
              { name: "documento_rilasciato_comune", type: "string" },
              { name: "data_nascita", type: "date" },
              { name: "citta_nascita", type: "string" },
              { name: "nazione_nascita", type: "string" },
              { name: "provincia_nascita", type: "string" },
              { name: "cittadinanza_italiana", type: "string" },
              { name: "indirizzo", type: "string" },
              { name: "citta", type: "string" },
              { name: "nazione", type: "string" },
              { name: "cap", type: "string" },
              { name: "provincia", type: "string" },
              { name: "residente_montespertoli", type: "boolean" },
              { name: "codice_fiscale", type: "string" },
              { name: "genere", type: "string" },
              { name: "privacy", type: "boolean" },
              { name: "socio", type: "boolean" },
              { name: "disabile", type: "boolean" },
              { name: "note", type: "string" },
              { name: "created", type: "date" },
              { name: "modified", type: "date" }
            ]
          },
          {
            name: "room",
            type: "object",
            fields: [
              { name: "id", type: "number" },
              { name: "structure_id", type: "number" },
              { name: "numero", type: "number" },
              { name: "ala_vecchia", type: "boolean" },
              { name: "servizi", type: "boolean" },
              { name: "posti_letto", type: "number" },
              { name: "display_name", type: "string" }
            ]
          }
        ]
      }
    ];

    this.ignoreFieldsOnSave = ["created", "modified", "reservations"];
  }

  chiudi(id) {
    return this.serverService
      .post(this.apiPath + "/chiudi", { id })
      .then((response: any) => response.data);
  }

  filterActive = value => {
    // return this.addFilterOnField('Camps.active', value);
  };

  addManyGuests = data => dispatch => {
    return dispatch(
      promiseAction("ADD_MANY_GUESTS", this._addManyGuests(data))
    );
  };

  /**
   * PRIVATES
   */

  private _addManyGuests(data) {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => resolve(console.log(data)), 3000);
    // });

    return this.Upload.upload({
      ignoreLoadingBar: true,
      url: "/api/camps/addManyGuests",
      data: data,
      headers: {
        Accept: "application/json"
      },
      timeout: 10000
    }).then(resp => resp.data);
  }
}
