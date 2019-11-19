import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(email: string, password: string, type: string) {
    return this.http.post<any>(`${environment.back_end_url}/login`, {email, password, type}, { observe: 'response' })
      .subscribe(resp => {
        const token = resp.headers.get('X-Token');
        localStorage.setItem('currentUser', token);
      })
  }
  
  logout() {
    localStorage.removeItem('currentUser');
  }

  getUser() {
    return localStorage.getItem('currentUser');
  }

}
