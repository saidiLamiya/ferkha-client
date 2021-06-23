import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Virement } from '../model/virement/virement';


@Injectable({
  providedIn: 'root'
})
export class VirementService {

  private url: string;
 
 
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8081/virement';
  }
  public addVirement(virement: Virement[]):Observable<Virement[]> {
    return this.http.post<Virement[]>(this.url + 's', virement);
  }
}
