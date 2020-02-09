import * as angular from "angular";
import ngRedux from "ng-redux";

import { GuestsComponent } from "./guests.component";
import { GuestsFormComponent } from "./guests-form/guests-form.component";
import { GuestsMultipleAddComponent } from "./guests-multiple-add/guests-multiple-add.component";

import { AppService } from "../../common/app/app.service";
import { GuestsService } from "./guests.service";
import { StateProvider, StateParams } from "@uirouter/angularjs";

import { GuestsFiltersModule } from "./guests-filters/guests-filters.module";

export const GuestsModule = angular
  .module("components.guests", ["ui.router", GuestsFiltersModule])
  .config(($stateProvider: StateProvider) => {
    "ngInject";

    $stateProvider
      .state("guests", {
        parent: "app",
        url: "/guests",
        component: "guests",
        resolve: {
          guests: ($ngRedux, GuestsService: GuestsService) => {
            "ngInject";
            return $ngRedux.dispatch(GuestsService.get());
          }
        },
        data: {
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      })
      .state("guests.add", {
        url: "/add",
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: "guestsForm",
            className: "ngdialog-large ngdialog-tall",
            preCloseCallback: value =>
              ModalService.preCloseCallbackDefault(value, "guests"),
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
      .state("guests.edit", {
        url: "/edit/:guestId",
        onEnter: ($state, ModalService) => {
          return ModalService.open({
            name: "guestsForm",
            className: "ngdialog-large ngdialog-tall",
            preCloseCallback: value =>
              ModalService.preCloseCallbackDefault(value, "guests"),
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
      })
      .state("guests.multipleAdd", {
        url: "/multiple",
        views: {
          "@app": {
            component: "guestsMultipleAdd"
          }
        },
        resolve: {
          action: () => "edit",
          data: (
            $ngRedux,
            AppService: AppService,
            GuestsService: GuestsService,
            $stateParams
          ) => {
            "ngInject";
            $ngRedux.dispatch(AppService.setActiveForm("guests"));
            return $ngRedux.dispatch(GuestsService.getFormData(null));
          }
        },
        data: {
          form: true,
          requiredAuth: true,
          roles: {
            admin: true
          }
        }
      });
  })
  .component("guests", GuestsComponent)
  .component("guestsForm", GuestsFormComponent)
  .component("guestsMultipleAdd", GuestsMultipleAddComponent)
  .service("GuestsService", GuestsService).name;
