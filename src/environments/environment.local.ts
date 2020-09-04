// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  back_end_url: 'http://192.168.1.235:8989/workplayer-portal/services',
  back_end_kysmart: 'http://192.168.0.240:8081',
  back_forgotten_password: 'https://portal.kyros.com.br/kyros-sso/exposed/password',
  register_id_kysmart: 307,
  URL_SSO: 'http://192.168.1.235/kyros-sso',
  URL_SSO_SERVICES: 'http://192.168.1.229:8593/kyros-sso',
  SYSTEM_NAME: 'WORKPLAYER',
  WORKPLAYER_HOME: 'http://localhost:4200',
  COMPANY: '1',
  URL_STATUS_REPORT: 'http://192.168.0.116/ReportServer/Pages/ReportViewer.aspx?%2fSTATUS_REPORT%2fStatusReport&ID_PROJETO=',
  production: false
};

export var company: string = 'bradesco';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
