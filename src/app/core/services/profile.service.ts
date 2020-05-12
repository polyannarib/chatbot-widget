import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private mainColor;
  private secondaryColor;
  private logo;
  private logoFull;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  prefixService = "profile";

  getProfile(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }

  getWhiteLabel(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/getWhiteLabeData`);
  }

  getScore(params): Observable<any> {
    return this.http.get(`${environment.back_end_url}/job/extract/${params.ano}/${params.mes}`);
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

  validateWhiteLabel() {
    console.log('Entrou dentro do validateWhiteLabel() TIAGAO');
    if(!localStorage.getItem('appMainColor') || !localStorage.getItem('appSecondaryColor') || !localStorage.getItem('appLogo') || !localStorage.getItem('appIcon')) {
      this.getWhiteLabel().subscribe(
        (response) => {
          this.setWhiteLabel(response.object);
        },
        (err) => {
          console.log(err);
          // return false;
        }
      )
    } else {
      console.log(' ----- Entrou dentro do ELSE ----- ');
      console.log(localStorage.getItem('appMainColor'));
      console.log(localStorage.getItem('appSecondaryColor'));
      console.log(localStorage.getItem('appLogo'));
      console.log(localStorage.getItem('appIcon'));
      this.router.navigate(['/auth/login']);
    }
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
