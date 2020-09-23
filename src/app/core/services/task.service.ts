import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter, catchError, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url: string = environment.back_end_url;
  private prefixService: string = 'task';

  constructor(private http: HttpClient) { }

  getTasksByProject(projectId: number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/byProject/${projectId}`);
  }

  createTask(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}`, data);
  }

  editTask(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}`, data);
  }

  editTaskDate(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/${this.prefixService}/editTaskDates`, data);
  }

  removeTask(id: Number, reason: String): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/${id}/remove?reason=${reason}`);
  }

  setAttachment(id, data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/link/${this.prefixService}/${id}`, data);
  }

  getTypesTask(): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/type/all`);
  }

  findTasks(playerId: Number, date: String): Observable<any> {
    return this.http.get(this.url + '/dashboard/player/' + playerId + '/task/date/' + date);
  }

  findProjectTasks(id: Number, date: String): Observable<any> {
    return this.http.get(this.url + '/dashboard/project/' + id + '/task/date/' + date);
  }

  finalize(id: Number): Observable<any> {
    return this.http.get(this.url + '/task/' + id + '/finalize');
  }

  initialize(id: Number): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/${id}/initialize`);
  }

  suspend(id: Number, reason: String): Observable<any> {
    return this.http.get(this.url + '/task/' + id + '/suspend?reason=' + reason);
  }

  giveBack(id: Number, reason: String): Observable<any> {
    return this.http.get(`${this.url}/task/${id}/giveBack?reason=${reason}`);
  }

  removePlayer(id: Number, reason: String): Observable<any> {
    return this.http.get(this.url + '/task/' + id + '/giveBack?reason=' + reason);
  }

  assignTask(taskId: Number, playerId: Number): Observable<any> {
    return this.http.get(this.url + '/task/' + taskId + '/assign/player/' + playerId);
  }

  rescheduleTask(taskId: Number, dateTo: String): Observable<any> {
    return this.http.get(this.url + '/task/' + taskId + '/reschedule?previewedAt=' + dateTo);
  }

  callRegisterItemKySmart(): Observable<any> {
    return this.http.post(`${environment.back_end_kysmart}/ApiKysmart/kyrograma/kyrogramaRegister?registerId=${environment.register_id_kysmart}`, null);
  }

  callRegisterItemIdKySmart(id): Observable<any> {
    return this.http.get(`${environment.back_end_kysmart}/ApiKysmart/registerItem/${id}`);
  }

  cardRemoved(taskId, cardId): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/${taskId}/removeCard/${cardId}`);
  }

  getRules(rule: any): Observable<any> {
    return this.http.get(`${environment.back_end_url}/${this.prefixService}/listRule`, { params: rule });
  }

  checkPlayerToDesignateAvailability(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/task/recurrentTask/playerAvailability`, data);
  }

  createRecurrenceTask(data): Observable<any> {
    return this.http.post(`${environment.back_end_url}/task/recurrentTask/createAndAssignAPlayer`, data);
  }

  getPlayersToDesignate(parseName: string): Observable<any> {
    return this.http.get(`${environment.back_end_url}/person/byName/${parseName}`);
  }

}
