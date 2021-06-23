import { Injectable } from '@angular/core';
import { Transfer } from '../model/transfer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/account/model/account';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  private transferUrl: string;
  constructor(private http: HttpClient) {
    this.transferUrl = 'http://localhost:8081/beneficiaire';
  }
  public findAll(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(this.transferUrl + 's');
  }
 

  

  public addBeneficiaire(numero: String):Observable<String[]> {
    return this.http.post<String[]>(this.transferUrl , numero);
  }

  public removeBeneficiaire(id: number): Observable<any> {
    return this.http.delete(`${this.transferUrl}/${id}`);
  }
}
