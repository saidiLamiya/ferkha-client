import { Injectable } from '@angular/core';
import { Activities } from '../model/activities/activities';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  private activitiesUrl: string;
  constructor(private http: HttpClient) {
    this.activitiesUrl = 'http://localhost:8081/virement';
  }
  public findAll(code: string): Observable<Activities[]> {
    return this.http.get<Activities[]>(
      'http://localhost:8081/compte/' + code + '/virements'
    );
  }

  public save(activities: Activities) {
    return this.http.post<Activities>(this.activitiesUrl + 's', activities);
  }
  getPDF(invoiceId: number): Observable<Blob> {
    return this.http.get<Blob>(this.activitiesUrl + 'PDF/' + invoiceId, {
      responseType: 'blob' as 'json',
    });
  }
}