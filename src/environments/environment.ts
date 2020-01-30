// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  back_end_url: 'http://192.168.1.235:8989/workplayer-portal/services',
  URL_SSO: 'https://sso-dev.kyros.com.br/kyros-sso',
  URL_SSO_SERVICES: 'https://sso-dev.kyros.com.br/kyros-sso',
  SYSTEM_NAME: 'WORKPLAYER',
  WORKPLAYER_HOME: 'http://192.168.1.235/webplayer',
  COMPANY: '1',
  production: false
};

export var company:string = 'bradesco';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  
// Included with Angular CLI.
