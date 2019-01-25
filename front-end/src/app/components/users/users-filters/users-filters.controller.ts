import { UsersService } from './../users.service';
import ngRedux from 'ng-redux';
import * as angular from 'angular';
import { getModelFilters } from '../users.selectors';

export class UsersFiltersComponentController {

  /**
   * BINDINGS
   */

  /**
   * PROPERTIES
   */
  filter: Function;
  filters: any;
  model: any = {};
  unsubscribe: Function;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private UsersService: UsersService,
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  submit(model) {
    Object.keys(model).map((key, index) => {
      model[key] = model[key].value;
    });
    return this.filter(model);
  }

  updateModel(event) {
    if (!this.model[event.name]) {
      this.model[event.name] = {
        active: '',
        value: '',
      }
    }

    this.model[event.name].value = event.value;
  }

  /**
   * PRIVATES
   */
  private _mapDispatchToThis = dispatch => {
    return this.UsersService.mapDispatchToThisIndex()(dispatch);
  };

  private _mapStateToThis = (state) => {
    const filters = getModelFilters(state);
    return this.UsersService.mapStateToThisIndex({
      lookup: state.lookup.toJS().lookup,
      model: filters,
    })(state);
  };
}
