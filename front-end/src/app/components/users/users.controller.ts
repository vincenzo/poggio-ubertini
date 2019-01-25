import ngRedux from 'ng-redux';
import { UsersService } from './users.service';
import {
  getModelErrors,
  getModelFilterPanel,
  getModelFilters,
  getModelList,
  getModelPagination,
  getModelSort,
  getModelState,
  getRouterState,
} from './users.selectors';

export class UsersComponentController {

  /**
   * Properties
   */
  config: any;
  delete: Function;
  // sidebarFields: AngularFormly.IFieldArray;
  extra;
  get: Function;
  stateGo: Function;
  toggleActive: Function;
  unsubscribe: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private UsersService: UsersService
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit(): void {
    this.config = this.UsersService.getConfig();

    // this.sidebarFields = this.UsersService.getFilterSidebarFields();

    this.extra = {
      toggleActive: this.toggleActive,
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  onAction(action: string, value?: any, $event?: ng.IAngularEvent) {
    switch (action) {
      case 'users.add':
        return this.stateGo('users.add');
      case 'users.delete':
        return this.delete(value.id).then(() => this.get());
      case 'row.click':
      case 'users.edit':
        $event.stopPropagation();
        return this.stateGo('users.edit', { id: value.id });
    }
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.UsersService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.UsersService.mapDispatchToThisIndex({
      filterActive: model => dispatch(this.UsersService.filterActive(model)),
    })(dispatch);
  };
}
