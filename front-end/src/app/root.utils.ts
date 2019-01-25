// ///<reference path="./dev-types.d.ts"/>

// import { createLogger } from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import logger from './vendors/ew-angularjs-utils/common/configure-logger';
import { fromJS } from 'immutable';
import * as persistState from 'redux-localstorage';
import promiseMiddleware from 'redux-promise-middleware';
import { localStoragePrefix, localStorageKey } from './root.config';
import { INITIAL_STATE } from './components/auth/auth.reducer';
// import * as Raven from 'raven-js';
import { APP } from './common/app/app.constants';

// TODO: sostituire con la chiave del progetto
// Raven.config('https://6f5cdb50ad5a430ea273a269a75d0010@sentry.io/199165').install();

/**
 * Sends crash reports as state is updated and listeners are notified.
 */
// const crashReporter = store => next => action => {
//   try {
//     return next(action);
//   } catch (err) {
//     console.error('Caught an exception!', err);
//     Raven.captureException(err, {
//       extra: {
//         action,
//         state: store.getState()
//       }
//     });
//     throw err;
//   }
// };

const emitGlobarErrors = store => next => action => {
  if (action.type !== APP.APP_ERROR && action.type.toLowerCase().indexOf('rejected') > -1) {
    next(action);
    return store.dispatch({
      error: true,
      type: APP.APP_ERROR,
      payload: action.payload ? (action.payload.data || action.payload) : null,
    });
  }
  return next(action);
};

const _getStorageConfig = () => {
  return {
    key: localStoragePrefix + '.' + localStorageKey,
    serialize: (store) => {
      return store && store.auth ?
        JSON.stringify(store.auth.toJS()) : store;
    },
    deserialize: (state) => ({
      auth: state ? fromJS(JSON.parse(state)) : INITIAL_STATE,
    }),
  };
}

export const isDev = () => {
  return process.env.NODE_ENV === 'development';
};

export const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

const getMiddlewares = () => {
  let middlewares = ['ngUiRouterMiddleware', ReduxThunk, emitGlobarErrors, promiseMiddleware()];

  if (isDev()) {
    middlewares = [...middlewares, logger];
  }

  if (isProd()) {
    // middlewares = [...middlewares, crashReporter];
  }

  return middlewares;
};

const getEnhancers = () => {
  let enhancers = [
    persistState('auth', _getStorageConfig())
  ];

  if (isDev()) {
    if (window.devToolsExtension) {
      enhancers = [...enhancers, window.devToolsExtension()];
    }
  }

  return enhancers;
};

export const middlewares = getMiddlewares();
export const enhancers = getEnhancers();
