import { StructuresFormComponentController } from './structures-form.controller';

export const StructuresFormComponent = {
  bindings: {
    action: '@',
  },
  controller: StructuresFormComponentController,
  templateUrl: require('./structures-form.html'),
}
