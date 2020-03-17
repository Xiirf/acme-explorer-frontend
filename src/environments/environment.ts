// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB0EgBnaWpzta6H9njH88am1Xi6ppdiliA',
    authDomain: 'acme-explorer-6415d.firebaseapp.com',
    databaseURL: 'https://acme-explorer-6415d.firebaseio.com',
    projectId: 'acme-explorer-6415d',
    storageBucket: 'acme-explorer-6415d.appspot.com',
    messagingSenderId: '835813245079',
    appId: '1:835813245079:web:99a4ed6bb7c2f7e5c7e9d2'
  },
  backendApiBaseUrl: 'http://localhost:8080/v1'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
