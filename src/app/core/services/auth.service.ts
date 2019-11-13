import { Router } from '@angular/router';
import { User } from '../../shared/models/UserModels';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
    private http: HttpClient
  ) { }

  login(user: User): Observable<any> {
    return this.http.post<User>(`${environment.back_end_url}/login`, user)
      .pipe(map(response => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        return response;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getUSer() {
    return localStorage.getItem('currentUser');
  }

}
