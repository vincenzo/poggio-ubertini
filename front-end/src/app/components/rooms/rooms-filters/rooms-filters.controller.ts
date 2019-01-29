import { RoomsService } from './../rooms.service';
import ngRedux from 'ng-redux';
import * as angular from 'angular';
import { getModelFilters } from '../rooms.selectors';

export class RoomsFiltersComponentController {

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
    private RoomsService: RoomsService,
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
    return this.RoomsService.mapDispatchToThisIndex()(dispatch);
  };

  private _mapStateToThis = (state) => {
    const filters = getModelFilters(state);
    return this.RoomsService.mapStateToThisIndex({
      lookup: state.lookup.toJS().lookup,
      model: filters,
    })(state);
  };
}
