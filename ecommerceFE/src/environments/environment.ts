// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiUrl = 'http://localhost:5001';

const firebaseConfig = {
  apiKey: "AIzaSyCul8HtsoWd8PW6Ct2aoZTyAhLljjYFdGk",
  authDomain: "e-commerce-3f9f0.firebaseapp.com",
  projectId: "e-commerce-3f9f0",
  storageBucket: "e-commerce-3f9f0.appspot.com",
  messagingSenderId: "234286353358",
  appId: "1:234286353358:web:32dcebe4451fc079d9f99f",
  measurementId: "G-YP04MD9DGQ"
};

export const environment = {
  production: false,
  apiUrl,
  firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
