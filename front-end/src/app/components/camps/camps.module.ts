import { GuestsService } from "./../guests/guests.service";
import * as angular from "angular";
import ngRedux from "ng-redux";

import { CampsComponent } from "./camps.component";
import { CampFormComponent } from "./camp-form/camp-form.component";
import { CampViewComponent } from "./camp-view/camp-view.component";
import { CampGuestsComponent } from "./camp-guests/camp-guests.component";
import { CampAssignRoomComponent } from "./camp-assign-room/camp-assign-room.component";
import { CampDocumentsComponent } from "./camp-documents/camp-documents.component";
import { CampCheckinoutComponent } from "./camp-checkinout/camp-checkinout.component";

import { AppService } from "../../common/app/app.service";
import { CampsService } from "./camps.service";
import { StateProvider, StateParams } from "@uirouter/angularjs";

import { CampsFiltersModule } from "./camps-filters/camps-filters.module";

export const CampsModule = angular
  .module("components.camps", ["ui.router", CampsFiltersModule])
  .config(($stateProvider: StateProvider) => {
    "ngInject";

    $stateProvider
      .state("camps", {
        parent: "app",
        url: "/camps",
        component: "camps",
        resolve: {
          camps: ($ngRedux, CampsService: CampsService) => {
            "ngInject";
            return $ngRedux.dispatch(CampsService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      })
      .state("camps.add", {
        url: "/add",
        views: {
          "@app": {
            component: "campForm"
          }
        },
        resolve: {
          action: () => "add",
          data: (
            $ngRedux,
            AppService: AppService,
            CampsService: CampsService,
            $stateParams
          ) => {
            "ngInject";
            $ngRedux.dispatch(AppService.setActiveForm("camps"));
            return $ngRedux.dispatch(
              CampsService.getFormData(null, {
                fattura_nazione: "ITA"
              })
            );
          }
        },
        data: {
          form: true,
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      })
      .state("camps.edit", {
        url: "/edit/:id",
        views: {
          "@app": {
            component: "campForm"
          }
        },
        resolve: {
          action: () => "edit",
          data: (
            $ngRedux,
            AppService: AppService,
            CampsService: CampsService,
            $stateParams
          ) => {
            "ngInject";
            $ngRedux.dispatch(AppService.setActiveForm("camps"));
            return $ngRedux.dispatch(CampsService.getFormData($stateParams.id));
          }
        },
        data: {
          form: true,
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      })
      .state("camps.view", {
        url: "/view/:id",
        views: {
          "@app": {
            component: "campView"
          }
        },
        resolve: {
          data: (
            $ngRedux,
            AppService: AppService,
            CampsService: CampsService,
            $stateParams
          ) => {
            "ngInject";
            $ngRedux.dispatch(AppService.setActiveForm("camps"));
            return $ngRedux.dispatch(CampsService.getFormData($stateParams.id));
          }
        },
        data: {
          form: true,
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      })

      /**
       * OSPITI
       */
      .state("camps.view.guests", {
        url: "/guests",
        redirectTo: "camps.view.guests.add"
      })
      .state("camps.view.guests.add", {
        url: "/add",
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: "guestsForm",
            className: "ngdialog-extra-large ngdialog-tall",
            preCloseCallback: value =>
              ModalService.preCloseCallbackDefault(value, "camps.view"),
            template: '<guests-form action="add"></guests-form>'
          });
        },
        resolve: {
          data: (
            $ngRedux: ngRedux.INgRedux,
            AppService: AppService,
            GuestsService: GuestsService,
            $stateParams: StateParams
          ) => {
            "ngInject";
            $ngRedux.dispatch(AppService.setActiveForm("guests"));
            return $ngRedux.dispatch(GuestsService.getFormData(null));
          }
        },
        data: {
          form: true,
          scrollToTop: false,
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      })
      .state("camps.view.guests.edit", {
        url: "/edit/:guestId",
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: "guestsForm",
            className: "ngdialog-extra-large ngdialog-tall",
            preCloseCallback: value =>
              ModalService.preCloseCallbackDefault(value, "camps.view"),
            template: '<guests-form action="edit"></guests-form>'
          });
        },
        resolve: {
          data: (
            $ngRedux: ngRedux.INgRedux,
            AppService: AppService,
            GuestsService: GuestsService,
            $stateParams: StateParams
          ) => {
            "ngInject";
            $ngRedux.dispatch(AppService.setActiveForm("guests"));
            return $ngRedux.dispatch(
              GuestsService.getFormData($stateParams.guestId)
            );
          }
        },
        data: {
          form: true,
          scrollToTop: false,
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      });
  })
  .component("camps", CampsComponent)
  .component("campForm", CampFormComponent)
  .component("campView", CampViewComponent)
  .component("campGuests", CampGuestsComponent)
  .component("campAssignRoom", CampAssignRoomComponent)
  .component("campDocuments", CampDocumentsComponent)
  .component("campCheckinout", CampCheckinoutComponent)
  .service("CampsService", CampsService).name;
