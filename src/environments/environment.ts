// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4000',
  firebase: {
    apiKey: "AIzaSyBcJw_m4E8SyL96Aolitk0WSWkm92O97mI",
    authDomain: "qr-code-tracking-system.appspot.com",
    storageBucket: "qr-code-tracking-system.appspot.com",
    projectId: "qr-code-tracking-system",
    messagingSenderId:"276470924940",
    databaseURL:'https://jsa-angular6.firebaseio.com'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
