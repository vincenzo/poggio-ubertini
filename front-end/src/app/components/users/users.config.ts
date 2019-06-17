import { defaultConfig } from '../../vendors/ew-angularjs-utils/common/default-config';

function users() {
  return {
    actions: [
      // {
      //   action: 'users.edit',
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
        //   state="users.edit"
        //   text="${model.username}"
        //   uib-tooltip="Modifica utente">
        // </ew-intra-link>`,
        filter: {
          field: 'Users.username',
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
          field: 'Users.email',
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
          field: 'Users.role',
          type: 'like',
        },
        sort: {
          field: 'role',
        },
      },
      {
        label: 'Attivo',
        filter: {
          field: 'Users.attivo',
          type: 'boolean',
        },
        field: model => {
          return model.attivo ?
            '<b class="text-success"><i class="far fa-check"></i> SI</b>' :
            '<b class="text-danger"><i class="far fa-times"></i> NO</b>';
        },
        sort: {
          field: 'attivo',
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

export const usersConfig = defaultConfig(users());
