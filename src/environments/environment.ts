// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  back_end_url: 'http://192.168.1.235:8989/workplayer-portal/services',
  back_end_kysmart: 'http://192.168.0.240:8081/ApiKysmart',
  URL_SSO: 'https://sso-dev.kyros.com.br/kyros-sso',
  URL_SSO_SERVICES: 'https://sso.kyros.com.br/kyros-sso',
  SYSTEM_NAME: 'WORKPLAYER',
  WORKPLAYER_HOME: 'http://192.168.1.235/webplayer',
  COMPANY: '1',
  URL_STATUS_REPORT: 'http://192.168.0.216:8080/pentaho/api/repos/%3Ahome%3Aworkplayer%3AStatus_Report.prpt/viewer?userid=workplayer&password=admin123&id_project=',
  production: false
};

export var company:string = 'bradesco';

/*
 * Enviroment Homologação
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';
// Included with Angular CLI.
