import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public color;

  constructor(
    private http: HttpClient
  ) { }

  prefixService = "profile";

  getWhiteLabel(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/getWhiteLabeData`);
  }

  setWhiteLabel(color) {
    if(!localStorage.getItem('appMainColor') || localStorage.getItem('appMainColor') != color.styles[0].value)
      localStorage.setItem('appMainColor', color.styles[0].value);
    if(!localStorage.getItem('appPrimaryColor') || localStorage.getItem('appMainColor') != color.styles[1].value)
      localStorage.setItem('appPrimaryColor', color.styles[1].value);
    if(!localStorage.getItem('appSecondaryColor') || localStorage.getItem('appMainColor') != color.styles[2].value)
      localStorage.setItem('appSecondaryColor', color.styles[2].value);
    if(!localStorage.getItem('appLogo') || localStorage.getItem('appMainColor') != color.images[0].value)
      localStorage.setItem('appLogo', color.images[0].value);
  }

  getAppMainColor() {
    return localStorage.getItem('appMainColor');
  }

  getAppPrimaryColor() {
    return localStorage.getItem('appPrimaryColor');
  }

  getAppSecondaryColor() {
    return localStorage.getItem('appSecondaryColor');
  }

  getAppLogo() {
    return localStorage.getItem('appLogo');
  }

  removeAppColors() {
    localStorage.removeItem('appMainColor');
    localStorage.removeItem('appPrimaryColor');
    localStorage.removeItem('appSecondaryColor');
    localStorage.removeItem('appLogo');
  }

}
