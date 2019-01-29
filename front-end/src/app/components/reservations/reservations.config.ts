import { defaultConfig } from '../../vendors/ew-angularjs-utils/common/default-config';

function reservations() {
  return {
    actions: [
    ],
    columns: [
      {
        label: 'Campo',
        field: 'camp.nome',
      },
      {
        label: 'Ospite',
        field: model => model.guest.nome + ' ' + model.guest.cognome,
      },
      {
        label: 'Camera',
        field: 'room.numero',
      },
      {
        label: 'Arrivo',
        field: `data_in | date:'dd/MM/yyyy'`,
      },
      {
        label: 'Partenza',
        field: `data_out | date:'dd/MM/yyyy'`,
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

export const reservationsConfig = defaultConfig(reservations());
