import { defaultConfig } from '../../vendors/ew-angularjs-utils/common/default-config';

function structures() {
  return {
    actions: [
      // {
      //   action: 'structures.edit',
      //   class: 'fa-pencil-square-o',
      //   label: 'Modifica utente',
      // },
    ],
    columns: [
      {
        label: 'Nome',
        field: 'nome',
      },
    ]
  };
}

export const structuresConfig = defaultConfig(structures());
