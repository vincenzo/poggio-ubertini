import ngRedux from 'ng-redux';
import { StructuresService } from './structures.service';

export class StructuresComponentController {

  /**
   * Properties
   */
  config: any;
  deleteItem: Function;
  extra;
  get: Function;
  stateGo: Function;
  toggleActive: Function;
  unsubscribe: any;

  constructor(
    private $ngRedux: ngRedux.INgRedux,
    private StructuresService: StructuresService
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit(): void {
    this.config = this.StructuresService.getConfig();

    this.extra = {
      toggleActive: this.toggleActive,
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  onAction(action: string, value?: any, $event?: ng.IAngularEvent) {
    switch (action) {
      case 'structures.add':
        return this.stateGo('structures.add');
      case 'structures.delete':
        return this.deleteItem(value.id).then(() => this.get());
      case 'row.click':
      case 'structures.edit':
        $event.stopPropagation();
        return this.stateGo('structures.edit', { id: value.id });
    }
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.StructuresService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.StructuresService.mapDispatchToThisIndex({
      filterActive: model => dispatch(this.StructuresService.filterActive(model)),
    })(dispatch);
  };
}
