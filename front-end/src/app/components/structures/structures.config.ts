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
        label: 'Nome utente',
        field: 'username',
        // field: model => `
        // <ew-intra-link
        //   icon="${false}"
        //   params="{ userId: ${model.id} }"
        //   state="structures.edit"
        //   text="${model.username}"
        //   uib-tooltip="Modifica utente">
        // </ew-intra-link>`,
        filter: {
          field: 'Structures.username',
          type: 'like',
        },
        sort: {
          field: 'username',
        },
      },
      {
        label: 'Email',
        field: 'email',
        filter: {
          field: 'Structures.email',
          type: 'like',
        },
        sort: {
          field: 'email',
        },
      },
      {
        label: 'Ruolo',
        field: 'role',
        filter: {
          field: 'Structures.role',
          type: 'like',
        },
        sort: {
          field: 'role',
        },
      },
      {
        label: 'Attivo',
        filter: {
          field: 'Structures.active',
          type: 'boolean',
        },
        field: model => {
          return model.active ?
            '<b class="text-success"><i class="far fa-check"></i> SI</b>' :
            '<b class="text-danger"><i class="far fa-times"></i> NO</b>';
        },
        sort: {
          field: 'active',
        },
      },
    ],
    rapidFilters: {
      activeButtons: [
        { label: 'Attivi', value: '1' },
        { label: 'Inattivi', value: '0' },
        { label: 'Tutti', value: '' },
      ],
    },
  };
}

export const structuresConfig = defaultConfig(structures());
