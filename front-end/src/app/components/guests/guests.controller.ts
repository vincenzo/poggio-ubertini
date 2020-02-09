import ngRedux from 'ng-redux';
import { GuestsService } from './guests.service';

export class GuestsComponentController {

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
    private GuestsService: GuestsService
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit(): void {
    this.config = this.GuestsService.getConfig();

    this.extra = {
      toggleActive: this.toggleActive,
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  onAction(action: string, value?: any, $event?: ng.IAngularEvent) {
    switch (action) {
      case 'guests.add':
        return this.stateGo('guests.add');
      case 'guests.delete':
        return this.deleteItem(value.id).then(() => this.get());
      case 'row.click':
      case 'guests.edit':
        $event.stopPropagation();
        return this.stateGo('guests.edit', { guestId: value.id });
    }
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.GuestsService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.GuestsService.mapDispatchToThisIndex({
      filterActive: model => dispatch(this.GuestsService.filterActive(model)),
    })(dispatch);
  };
}
