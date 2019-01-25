import ngRedux from 'ng-redux';
import { CampsService } from './camps.service';

export class CampsComponentController {

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
    private CampsService: CampsService
  ) {
    'ngInject';
    this.unsubscribe = this.$ngRedux.connect(
      this._mapStateToThis.bind(this),
      this._mapDispatchToThis
    )(this);
  }

  $onInit(): void {
    this.config = this.CampsService.getConfig();

    this.extra = {
      toggleActive: this.toggleActive,
    };
  }

  $onDestroy(): void {
    this.unsubscribe();
  }

  onAction(action: string, value?: any, $event?: ng.IAngularEvent) {
    switch (action) {
      case 'camps.add':
        return this.stateGo('camps.add');
      case 'camps.delete':
        return this.deleteItem(value.id).then(() => this.get());
      case 'row.click':
      case 'camps.edit':
        $event.stopPropagation();
        return this.stateGo('camps.edit', { id: value.id });
    }
  }

  /**
   * PRIVATES
   */

  private _mapStateToThis(state) {
    return this.CampsService.mapStateToThisIndex()(state);
  }

  private _mapDispatchToThis = dispatch => {
    return this.CampsService.mapDispatchToThisIndex({
      filterActive: model => dispatch(this.CampsService.filterActive(model)),
    })(dispatch);
  };
}
