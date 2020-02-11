// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyD-XLAe8eAQSmyMMcSkbFtYJKEM81XSzgA",
    authDomain: "cinextreme-p.firebaseapp.com",
    databaseURL: "https://cinextreme-p.firebaseio.com",
    projectId: "cinextreme-p",
    storageBucket: "cinextreme-p.appspot.com",
    messagingSenderId: "10253746863",
    appId: "1:10253746863:web:46cc892d70172f3a250a5a"
  },

  ipServicio : 'http://cinextreme.co/public/',
  
  ipImagenTMDB : 'https://image.tmdb.org/t/p/original/',
  ipBaseTMDB: 'https://api.themoviedb.org/3/movie/',
  keyTMDB : 'e38bdcb99eda95bae467ac8f3dd8684f'


};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
