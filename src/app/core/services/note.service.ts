import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private url: string = environment.back_end_url;

  constructor(private http: HttpClient) { }

  findNotes(params: any): Observable< any > {
    return this.http.get( this.url + '/note/note', {params : params} );
  }
  saveNotes(params: any): Observable< any > {
    return this.http.post( this.url + '/note/note', params );
  }

}
