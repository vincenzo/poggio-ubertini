import * as jQuery from 'jquery';
import * as md5 from 'md5';

import { stateGo } from 'redux-ui-router';
import ngRedux from 'ng-redux';
import { AuthService } from '../../components/auth/auth.service';
import { ModalService } from '../../vendors/ew-angularjs-utils/components/modal/modal.service';

export class NavController {

  /**
   * Bindings
   */

  /**
   * Properties
   */
  auth: any;
  clientFilter: any;
  logout: Function;
  menu;
  navCollapsed;
  stateGo: Function;
  unsubscribe: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private AuthService: AuthService,
    private ModalService: ModalService,
    private hotkeys,
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this), this._mapDispatchToThis.bind(this))(this);
  }

  $onInit(): void {
    this.menu = this.getMenuConfig(this.auth.user.role);
    this.navCollapsed = true;

    this.hotkeys.add({
      combo: [`ctrl+\\`],
      description: `Filtro rapido`,
      allowIn: ['INPUT', 'SELECT', 'TEXTAREA'],
      callback: (e) => {
        this.ModalService.closeAll();
        jQuery('#omnisearch input').focus();
        e.preventDefault();
      }
    });
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  getGravatar(email) {
    return `https://www.gravatar.com/avatar/${md5(email || '')}?s=60`;
  }

  getMenuConfig(role) {
    let menuConfigs = {
      admin: [
        // {
        //   title: '',
        //   icon: 'tachometer-alt',
        //   state: 'dashboard',
        // },
        {
          title: 'Campi',
          icon: 'suitcase',
          state: 'camps',
        },
        {
          title: 'Ospiti',
          icon: 'users',
          state: 'guests',
        },
        // {
        //   title: 'Prenotazioni',
        //   icon: 'book',
        //   state: 'reservations'
        // },
        // {
        //   title: 'Camere',
        //   icon: 'bed',
        //   state: 'rooms'
        // },
        // {
        //   title: 'Strutture',
        //   icon: 'hotel',
        //   state: 'structures'
        // },
        // {
        //   title: 'Occupazione',
        //   icon: 'hotel',
        //   state: 'structureOccupancy'
        // },
        {
          title: 'Calendario occupazione',
          icon: 'calendar',
          state: 'roomsCalendario'
        },
      ],
      capogruppo: [
        {
          title: 'Campi',
          icon: 'euro-sign',
          state: 'camps'
        },
      ],
    };
    return menuConfigs[role];
  }

  onLogout() {
    this.logout().then(() => this.stateGo('auth.login'));
  }

  toggleNav() {
    this.navCollapsed = !this.navCollapsed;
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state): Object {
    const auth = state.auth.toJS();
    return {
      auth,
      menu: auth.user ? this.getMenuConfig(auth.user.role) : [],
    };
  }

  private _mapDispatchToThis(dispatch): Object {
    return {
      logout: () => dispatch(this.AuthService.logout()),
      stateGo: (state, params) => dispatch(stateGo(state, params)),
    };
  }
}
