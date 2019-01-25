import * as jQuery from 'jquery';
import { EventEmitter, IEventEmitter } from './../../../vendors/ew-angularjs-utils/common/event-emitter';
import _filter = require('lodash/filter');

export class DashboardWidgetsController {

  /**
   * Bindings
   */

  /**
   * Properties
   */

  constructor(
    private EventEmitter: IEventEmitter,
  ) {
    'ngInject';
  }

  $onInit(): void {
  }
}
