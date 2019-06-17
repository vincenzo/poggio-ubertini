import { usersConfig } from './users.config';
import { EwServerService } from '../../vendors/ew-angularjs-utils/components/server/server.service';
import { EwCommonService } from '../../vendors/ew-angularjs-utils/common/common-service';

export class UsersService extends EwCommonService {

  apiPath: string;
  dbFields: Array<any>;

  constructor(
    private EwServerService: EwServerService,
  ) {
    'ngInject';

    super('users', usersConfig, EwServerService);

    this.dbFields = [
      { name: 'id', type: 'number' },
      { name: 'username', type: 'string' },
      { name: 'password', type: 'password' },
      { name: 'email', type: 'string' },
      { name: 'role', type: 'string' },
      { name: 'attivo', type: 'boolean' },
    ];
  }

  filterActive = value => {
    // return this.addFilterOnField('Users.attivo', value);
  };

  // getFilterSidebarFields() {
  //   return [
  //     inputText('Users.username', 'Nome utente'),
  //     inputText('Users.email', 'Email'),
  //     inputSelect('Users.role', 'Ruolo', '', [
  //       { name: '-- TUTTI --', value: '' },
  //       { name: 'admin', value: 'admin' },
  //     ]),
  //     inputSelect('Users.attivo', 'Attivo', '', [
  //       { name: '-- TUTTE --', value: '' },
  //       { name: 'SI', value: '1' },
  //       { name: 'NO', value: '0' },
  //     ]),
  //   ];
  // }

  /**
   * PRIVATES
   */
}
