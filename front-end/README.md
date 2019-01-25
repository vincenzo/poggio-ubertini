# Entheos Web Application

## Basic setup (always do that!)

- Set local configurations:

  - Duplicate [local-config.default.js](./config/local-config.default.js)
  - Rename it in `local-config.js`
  - Change machineIp with your docker machine ip (often the same as default)
  - Change the proxy port (see `Porte e configurazioni progetti attivi` at `GDrive/EntheosWeb/Progetti attivi`)

- Change app title in [index.html](./src/index.html)

## External libraries (npm && yarn)

- Add all the external libraries to [vendor.ts](./src/app/vendor.ts)
- If the library need to import some styles, put it in [root.module.ts](./src/app/root.module.ts), then add it to [vendor.ts](./src/app/vendor.ts)
- Check the webpack bundels size by activating `BundleAnalyzerPlugin` in [webpack.common.js](./config/webpack.common.js)

## Global CSS

- Edit [app.scss](./src/app/app.scss) adding all the "app wide" styles here

## App state (reducer)

The app reducer is located at [app.reducer.ts](./src/app/app.reducer.ts).

Everytime you need to change the app state edit this file importing new reducers like:

```js
import { UsersReducer } from './components/chat/shared/users/users.reducer';
```

and adding it to appReducer const:

```js
export const appReducer = combineReducers({
  users: UsersReducer,
  threads: ThreadsReducer,
  router,
  // add here the imported reducer
});
```

## App features

We can have two different types of features:

1. App specific features
2. Generic features (they remains the same in others apps)

### App specific features

Are examples of app specific features something like navbar, footer, and so on.

You need to add it in the [common folder](./src/app/common) creating a new folder for the feature and then add it to [common.module.ts](./src/app/common/common.module.ts)

### Generic features

The doesn't change in other apps. For example a chat feature remain the same, with the same UI and functions.

You need to add it in the [components folder](./src/app/components) creating a new folder for the feature and then add it to [components.module.ts](./src/app/components/components.module.ts)

## Confirm dialog on form exit

Per far sì che venga mostrata la confirm quando si esce da un form che è stato modificato è necessario procedere in questo modo.

1. Aggiungere nei data della route del form il parametro form:true.

```js
.state('agents.add', {
  url: '/add',
  views: {
    '': {
      component: 'agents',
    },
    'modal1@app': {
      component: 'agentsForm',
    },
  },
  data: {
    form: true,
  },
})
```

se le route per l'add e l'edit sono differenti andrà aggiunto il parametro in entrambe.

2. Affinché tutto quanto funzioni è **FONDAMENTALE** che il nome della route padre, nell'esempio sopra `agents` corrisponda al nome usato nello stato redux, altrimenti il codice non sarà in grado di leggere automaticamente l'hash del form e non potrà funzionare correttamente.

3. Possono esserci 2 casi distinti di form:
  1. a pagina intera
  2. in modal

In entrambi i casi è necessario eseguire il redirect ad uno stato differente una volta eseguito il save, l'unica accortezza è che nel caso dei form in modal, andrà specificata la `beforeCloseCallback` quando si richiama il metodo `ModalService.open`.

La `beforeCloseCallback` dovrà essere valorizzata con una funzione che effettua il cambio di stato. In questo modo, ogni volta che verrà chiusa la modal, a prescindere dall'evento che scaturisce la chiusura (esc, click outside, click X, ecc.), verrà eseguita la transizione di uscita dallo stato con `data{ form: true }` che verificherà se è variato l'hash e si comporeterà di conseguenza.

```js
beforeCloseCallback: () => this.$state.go('agents'),
```

### Aggiornamento lib comuni da package.json
Genera una chiave pubblica (ssh-keygen -t rsa) (o prendi quella esistente cat ~/.ssh/id_rsa.pub)
e aggiungila nella sezione deploy keys del repo di bitbucket Controlla che tutto funzioni con
ssh -Tv git@bitbucket.org