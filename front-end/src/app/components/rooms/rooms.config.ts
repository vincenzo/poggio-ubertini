import { defaultConfig } from '../../vendors/ew-angularjs-utils/common/default-config';

function rooms() {
  return {
    actions: [
      // {
      //   action: 'rooms.edit',
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
        //   state="rooms.edit"
        //   text="${model.username}"
        //   uib-tooltip="Modifica utente">
        // </ew-intra-link>`,
        filter: {
          field: 'Rooms.username',
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
          field: 'Rooms.email',
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
          field: 'Rooms.role',
          type: 'like',
        },
        sort: {
          field: 'role',
        },
      },
      {
        label: 'Attivo',
        filter: {
          field: 'Rooms.active',
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

export const roomsConfig = defaultConfig(rooms());
