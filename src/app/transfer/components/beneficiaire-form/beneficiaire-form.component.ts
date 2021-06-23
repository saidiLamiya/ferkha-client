import { Component, OnInit } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { TransferService } from '../../service/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'src/app/account/service/account.service';
import { CurrencyConversionService } from 'src/app/shared/services/currency-conversion.service';
import { Account } from 'src/app/account/model/account';
import { TransferState } from '@angular/platform-browser';
import { Quotes } from 'src/app/shared/models/quotes';
import { RateResponse } from 'src/app/shared/models/rate-response';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-beneficiaire-form',
  templateUrl: './beneficiaire-form.component.html',
  styleUrls: ['./beneficiaire-form.component.css']
})
export class BeneficiaireFormComponent implements OnInit {
  loginInvalid = false;
  devise1: string;
  devise2: string;
  midpoint: number;
  accountNotFound = false;
  codeId: string;
  transferForm = new FormGroup({
    numero : new FormControl(''),
    nom : new FormControl('')
  })
  transfer: Transfer;
  account: Account;
  account2: Account;
  rates: RateResponse;

  get nom() {
    return this.transferForm.get('nom');
  }
  get numero() {
    return this.transferForm.get('numero');
  }
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transferService: TransferService,
    private accountService: AccountService,
    private currencyService: CurrencyConversionService,
    public dialog: MatDialog
  ) {
    this.account = new Account();
    this.transfer = new Transfer();
    this.account2 = new Account();
  }

  onSubmit() {
    
     this.transferService.addBeneficiaire(this.numero.value).subscribe(
       (data) => {
        this.loginInvalid= false;
        console.log('khdama');
      
        window.history.back();
      },
      (error) => {
        console.log('error');
        this.loginInvalid= true;
         
          
       }
     );
  }


  ngOnInit(): void {
    

    // this.transferForm = new FormGroup({
    //   numero: new FormControl('', Validators.required),
    //    somme: new FormControl('', [
    //      Validators.required,
    //      Validators.pattern(regexPattern),
    //    ]),
    //  });
    //  this.codeId = this.route.snapshot.params['id'];
    //  this.accountService.findAccountId(this.codeId).subscribe(
    //    (data) => {
    //      console.log(data[0]);
    //      this.account1 = data[0];
    //      this.devise1 = this.account1.devise.code;

    //      this.transferForm = new FormGroup({
    //        numero: new FormControl('', Validators.required),
    //        somme: new FormControl('', [
    //          Validators.required,
    //          Validators.pattern(regexPattern),
    //          Validators.max(this.account1.solde),
    //        ]),
    //      });
    //    },
    //    (error) => console.log(error)
    //  );
  }
  
}
