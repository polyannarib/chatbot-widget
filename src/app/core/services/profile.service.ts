import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private mainColor;
  private secondaryColor;
  private logo;
  private logoFull;

  constructor(
    private http: HttpClient
  ) { }

  prefixService = "profile";

  getWhiteLabel(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/getWhiteLabeData`);
  }

  setWhiteLabel(color) {

    this.setColors(color.styles);
    this.setImages(color.images);

    if(!localStorage.getItem('appMainColor') || localStorage.getItem('appMainColor') != this.mainColor)
      localStorage.setItem('appMainColor', this.mainColor);

    if(!localStorage.getItem('appSecondaryColor') || localStorage.getItem('appSecondaryColor') != this.secondaryColor)
      localStorage.setItem('appSecondaryColor', this.secondaryColor);

    if(!localStorage.getItem('appLogo') || localStorage.getItem('appLogo') != this.logo)
      localStorage.setItem('appLogo', this.logo);

    if(!localStorage.getItem('appIcon') || localStorage.getItem('appIcon') != this.logoFull)
      localStorage.setItem('appIcon', this.logoFull);
  }

  setColors(colors) {
    colors.forEach(element => {
      if(element.name == "main-color-web") {
        this.mainColor = element.value
      }
      if(element.name == "secondary-color-web") {
        this.secondaryColor = element.value
      }
    });
  }

  setImages(images) {
    images.forEach(element => {
      if(element.name == 'logo') {
        this.logo = element.value
      }
      if(element.name == 'logo-full') {
        this.logoFull = element.value
      }
    });
  }

  getAppMainColor() {
    return localStorage.getItem('appMainColor');
  }

  getAppSecondaryColor() {
    return localStorage.getItem('appSecondaryColor');
  }

  getAppLogo() {
    return localStorage.getItem('appLogo');
  }

  getAppIcon() {
    return localStorage.getItem('appIcon');
  }

  removeAppColors() {
    localStorage.removeItem('appMainColor');
    localStorage.removeItem('appSecondaryColor');
    localStorage.removeItem('appLogo');
    localStorage.removeItem('appIcon');
  }

}
