import ngRedux from 'ng-redux';
import { RoomsService } from './rooms.service';

export class RoomsComponentController {

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
    private RoomsService: RoomsService
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit(): void {
    this.config = this.RoomsService.getConfig();

    this.extra = {
      toggleActive: this.toggleActive,
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  onAction(action: string, value?: any, $event?: ng.IAngularEvent) {
    switch (action) {
      case 'rooms.add':
        return this.stateGo('rooms.add');
      case 'rooms.delete':
        return this.deleteItem(value.id).then(() => this.get());
      case 'row.click':
      case 'rooms.edit':
        $event.stopPropagation();
        return this.stateGo('rooms.edit', { id: value.id });
    }
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.RoomsService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.RoomsService.mapDispatchToThisIndex({
      filterActive: model => dispatch(this.RoomsService.filterActive(model)),
    })(dispatch);
  };
}
