// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendApiBaseUrl: 'https://s4-acme-explorer-backend.herokuapp.com/v2',
  firebaseConfig: {
    apiKey: 'AIzaSyC2Qa9uZIjnTJBFYES4BPA5WRj2DMETdHs',
    authDomain: 'acme-explorer-e1ea6.firebaseapp.com',
    databaseURL: 'https://acme-explorer-e1ea6.firebaseio.com',
    projectId: 'acme-explorer-e1ea6',
    storageBucket: 'acme-explorer-e1ea6.appspot.com',
    messagingSenderId: '653865132618',
    appId: '1:653865132618:web:8c9edb6c13ef531f5f3cb3'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
