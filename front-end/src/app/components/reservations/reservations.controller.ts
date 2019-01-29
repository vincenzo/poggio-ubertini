import ngRedux from 'ng-redux';
import { ReservationsService } from './reservations.service';

export class ReservationsComponentController {

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
    private ReservationsService: ReservationsService
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit(): void {
    this.config = this.ReservationsService.getConfig();

    this.extra = {
      toggleActive: this.toggleActive,
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  onAction(action: string, value?: any, $event?: ng.IAngularEvent) {
    switch (action) {
      case 'reservations.add':
        return this.stateGo('reservations.add');
      case 'reservations.delete':
        return this.deleteItem(value.id).then(() => this.get());
      case 'row.click':
      case 'reservations.edit':
        $event.stopPropagation();
        return this.stateGo('reservations.edit', { id: value.id });
    }
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.ReservationsService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.ReservationsService.mapDispatchToThisIndex({
      filterActive: model => dispatch(this.ReservationsService.filterActive(model)),
    })(dispatch);
  };
}
