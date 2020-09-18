import { environment } from '../environments/environment.local';

export class AppConstants {

    public static URL_ROOT = environment.back_end_url;
    public static URL_SSO = environment.URL_SSO;
    public static URL_SSO_SERVICES = environment.URL_SSO_SERVICES;
    public static SYSTEM_NAME = environment.SYSTEM_NAME;
    public static WORKPLAYER_HOME = environment.WORKPLAYER_HOME;
    public static COMPANY = environment.COMPANY;
}
