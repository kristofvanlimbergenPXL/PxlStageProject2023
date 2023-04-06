// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // oauth signin variables
  clientId:
    '708462727462-1hqa5qu1stqfuqb9g3qv2pq6mu6qtd7m.apps.googleusercontent.com',
  oauth2Endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
  redirectUri: 'http://localhost:4200/login',
  responseType: 'token',
  scope: 'https://www.googleapis.com/auth/drive.readonly',
  includeGrantedScopes: 'true',
  state: 'pass-through value',

  // google api
  googleApiBaseUrl: 'https://www.googleapis.com/',

  baseUrls: {
    employees:'http://localhost:8080/api/employee',
    proposals: 'https://localhost:7076/api/Proposals',
    reviewers: 'https://localhost:7076/api/reviewers',
    students: 'https://localhost:7076/api/Student/',
    companies: 'https://localhost:7076/api/Company/',
    googleSheetSync: 'https://localhost:7076/api/google-sheets',
    actions: 'https://localhost:7076/api/Action/',
    studentCsvPropertyOrder:
      'https://localhost:7076/api/StudentCsvPropertyOrder/',
    emails: 'https://localhost:7076/api/emails',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
