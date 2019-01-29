import { defaultConfig } from '../../vendors/ew-angularjs-utils/common/default-config';

function guests() {
  return {
    actions: [
    ],
    columns: [
      {
        label: '',
        class: 'w_xs',
        field: model => {
          let ret = [];
          const gender = model.genere === 'M' ? 'male' : 'female';
          const genderLabel = model.genere === 'M' ? 'Maschio' : 'Femmina';
          const privacy = model.privacy ? 'check-square' : 'square';
          const privacyLabel = model.privacy ? 'Privacy firmata' : 'Privacy non firmata';
          ret.push(`<i class="far fa-${gender}" uib-tooltip="${genderLabel}"></i>`);
          ret.push(`<i class="far fa-${privacy}" uib-tooltip="${privacyLabel}"></i>`);
          return ret.join(' ');
        }
      },
      {
        label: 'Cognome',
        field: 'cognome',
        filter: {
          field: 'Guests.cognome',
          type: 'like',
        },
        sort: {
          field: 'cognome',
        },
      },
      {
        label: 'Nome',
        field: 'nome',
        filter: {
          field: 'Guests.nome',
          type: 'like',
        },
        sort: {
          field: 'nome',
        },
      },
      {
        label: 'Cod. Fisc.',
        class: 'w_md',
        field: 'codice_fiscale',
      },
      {
        label: 'Data nascita',
        class: 'w_md',
        thClass: 'darker',
        field: `data_nascita | date: 'dd/MM/yyyy'`,
      },
      {
        label: 'Città',
        class: 'w_lg',
        thClass: 'darker',
        field: `citta_nascita`,
      },
      {
        label: 'Prov.',
        class: 'w_xs',
        thClass: 'darker',
        field: `provincia_nascita`,
      },
      {
        label: 'Nazione',
        class: 'w_xs',
        thClass: 'darker',
        field: `nazione_nascita`,
      },
    ],
    rapidFilters: {
      // activeButtons: [
      //   { label: 'Attivi', value: '1' },
      //   { label: 'Inattivi', value: '0' },
      //   { label: 'Tutti', value: '' },
      // ],
    },
  };
}

export const guestsConfig = defaultConfig(guests());
