import { CampDocumentsComponentController } from './camp-documents.controller';

import './camp-documents.scss';

export const CampDocumentsComponent = {
  bindings: {
    model: '<',
  },
  controller: CampDocumentsComponentController,
  templateUrl: require('./camp-documents.html'),
}
