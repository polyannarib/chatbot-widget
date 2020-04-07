import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isEmpty } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient
  ) { }

  private prefixService = "card";
  // private setHeaders: HttpHeaders

  // createAuthorizationHeader(headers: Headers) {
  //   headers.append('Authorization', 'Basic ' + 'YWRtaW46YWRtaW4=');
  // }

  findAllTasks(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/skill`);
  }

  createCard(data: any): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}`, data);
  }

  listCardByPlayer(id: number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/listCardByPlayer/${id}`);
  }

  findAllCards(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}`);
  }
  
  giveToPlayer(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}/giveToPlayer`, data);
  }

  findCardById(id: number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/${id}/classification`);
  }
  
  // findCardById(id: number): Observable<any> {
  //   return this.http.get(`${environment.back_end_url}/${this.prefixService}/byKnowledgeId/${id}`);
  // }

  listCardsByUser(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/listCardsByUser`);
  }

  myDeck(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/myDeck`);
  }

  addCard(data): Observable<any> {
    // return this.http.put(`${environment.back_end_url}/${this.prefixService}/active/knowledge/${data.knowledgeId}/attribute/${data.attributeId}`, data);
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/card/attribute/${data.attributeId}/giveToMe`);
  }

  removeCard(data): Observable<any> {
    // return this.http.put(`${environment.back_end_url}/${this.prefixService}/inactive/knowledge/${data.knowledgeId}/attribute/${data.attributeId}`, data);
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/card/attribute/${data.attributeId}/removeFromMe`);
  }

  searchComboCompetence(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn`);
  }

  getCategory(data): Observable<any> { 
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn?knowledgeParentId=` + data);
  }

  // http://192.168.1.229:8989/workplayer-portal/services/card/knowledge?knowledgeParentId=1
  findPerson(parentIdsLevels: any, idsWorkGroups: any) {
    if(parentIdsLevels && idsWorkGroups == undefined) {
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/person?knowledgeIds=${parentIdsLevels}&page=1&pageSize=30`);
    }
    if(parentIdsLevels == undefined && idsWorkGroups) {
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/person?workgroupIds${idsWorkGroups}&page=1&pageSize=30`);
    }
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/person?page=1&pageSize=30&knowledgeIds=${parentIdsLevels}&workgroupIds=${idsWorkGroups}`);
  }
  
  KnowledgeIn(data?: any): Observable<any> {
    if(!data) {
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn`);
    }
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/knowledgeIn?knowledgeParentId=${data}`);
  }

  searchWorkgroup(id?: number): Observable<any> {
    if(!id || id == undefined) {
      return this.http.get(`${environment.back_end_url}/${this.prefixService}/workgroup`);
    }
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/workgroup?workgroupParentIds=${id}`);
  }

  getPhotoImg(url: string): Observable<Blob> {
    // const src = 'https://api.mywebsite.com/profiles/123/avatar';
    // const options = {
    //   headers: {
    //     'Some-Header': '...'
    //   }
    // };
    // fetch(src, options).then(res => res.blob()).then(blob => {
    //   imgElement.src = URL.createObjectURL(blob);
    // });
    // let setHeaders: HttpHeaders
    // setHeaders = new HttpHeaders();
    // return this.http.get(url, { headers: setHeaders.set('Authorization', 'Basic ' + 'YWRtaW46YWRtaW4=') });
    return this.http.get(url, { responseType: 'blob' });
  }

}
