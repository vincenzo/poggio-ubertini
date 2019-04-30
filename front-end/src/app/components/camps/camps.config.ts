import { defaultConfig } from '../../vendors/ew-angularjs-utils/common/default-config';

function camps() {
  return {
    actions: [
    ],
    columns: [
      {
        label: 'N',
        field: 'n_scheda',
        filter: {
          field: 'Camps.n_scheda',
          type: 'like',
        },
        sort: {
          field: 'n_scheda',
        },
      },
      {
        label: 'Data scheda',
        field: `data_scheda | date:'dd/MM/yyyy'`,
      },
      {
        label: 'Capogruppo',
        field: 'capogruppo_id',
      },
      {
        label: 'Nome',
        field: 'nome',
      },
      {
        label: 'Inizio',
        field: `data_inizio | date:'dd/MM/yyyy'`,
      },
      {
        label: 'Fine',
        field: `data_fine | date:'dd/MM/yyyy'`,
      },
      {
        label: 'Tipo',
        field: `tipo`,
      },
      {
        label: 'Chiuso',
        field: model => {
          const label = model.chiuso ? 'success' : 'danger';
          const text = model.chiuso ? 'SI' : 'NO';
          return `<p class="label label-${label}">${text}</p>`;
        },
      },
      {
        label: '',
        class: 'actions',
        disableRowClick: true,
        field: model => {
          return `<a ui-sref="camps.view({ id: row.id })" uib-tooltip="Dettaglio"><i class="far fa-info"></i></a>`;
        },
      },
    ],
    // rapidFilters: {
    //   activeButtons: [
    //     { label: 'Attivi', value: '1' },
    //     { label: 'Inattivi', value: '0' },
    //     { label: 'Tutti', value: '' },
    //   ],
    // },
  };
}

export const campsConfig = defaultConfig(camps());
