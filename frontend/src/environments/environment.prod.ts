export const environment = {
  production: true,

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
    proposals: 'https://localhost:7076/api/Proposals',
    reviewers: 'https://localhost:7076/api/reviewers',
    reviewer: 'https://localhost:7076/api/reviewer',
    students: 'https://localhost:7076/api/Student/',
    companies: 'https://localhost:7076/api/Company/',
    googleSheetSync: 'https://localhost:7076/api/google-sheets/',
    actions: 'https://localhost:7076/api/Action/',
    studentCsvPropertyOrder:
      'https://localhost:7076/api/StudentCsvPropertyOrder/',
    emails: 'https://localhost:7076/api/emails',
  },
};
