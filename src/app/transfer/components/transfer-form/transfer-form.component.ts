import { Component, OnInit, ViewChild } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from 'src/app/account/service/account.service';
import { CurrencyConversionService } from 'src/app/shared/services/currency-conversion.service';
import { Account } from 'src/app/account/model/account';
import { TransferState } from '@angular/platform-browser';
import { Quotes } from 'src/app/shared/models/quotes';
import { RateResponse } from 'src/app/shared/models/rate-response';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TransferService } from '../../service/transfer.service';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BeneficiaireFormComponent } from '../beneficiaire-form/beneficiaire-form.component';
import { Virement } from '../../model/virement/virement';
import {VirementService} from '../../service/virement.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.css'],
})

export class TransferFormComponent implements OnInit {
  total : number;
  nombreInvalid = false;
  montantInvalid = false;
  infoInvalid=false;
  
  transferForm = new FormGroup({
    numero2 : new FormControl(''),
    
    montant2 : new FormControl(''),
    nombre : new FormControl('')
  })
  beneficiaireForm = new FormGroup({
    
    montant1 : new FormControl(''),
    numero1 : new FormControl(''),
    codeId : new FormControl('')
  })
  beneForm = new FormGroup({
    
    debiteur : new FormControl(''),
    som : new FormControl('')
  })
  BENEFICIAIRE: Transfer[];
  virements: Virement[] = new Array();
  virement:Virement;
  account1: Account;
  account2: Account;
  
  clickedRows = new Set<Transfer>();
  
  
  displayedColums : string[] = [
    'id',
    'nom',
    'prenom',
    'numeroCompte',
  ];
  get nombre() {
    return this.transferForm.get('nombre');
  }
  get numero2() {
    return this.transferForm.get('numero2');
  }
  get montant2() {
    return this.transferForm.get('montant2');
  }
  
 
  get numero1() {
    return this.beneficiaireForm.get('numero1');
  }
  get montant1() {
    return this.beneficiaireForm.get('montant1');
  }
  get codeId() {
    return this.beneficiaireForm.get('codeId');
  }
  get numero3(){
    return this.beneForm.get('debiteur');

  }
  get somme(){
    return this.beneForm.get('som');

  }
  
  constructor(private transferService: TransferService,private virementService: VirementService, private accountService: AccountService, public dialog: MatDialog){ 
    this.account1 = new Account();
    this.virement = new Virement();
    this.account2 = new Account();
    
  }
  ngOnInit(): void{
    console.log(this.numero1);
    console.log(this.montant1);
    
    this.transferService.findAll().subscribe(
      (data) => {
        console.log(data);
        this.BENEFICIAIRE = data;
      },
      (error) => {
        console.log(error);
      }
    );

  }
  
addBene(){
  const iterator1 =this.clickedRows.values();
  console.log(iterator1.next().value.numeroCompte);
  this.accountService.findAccountNum(this.clickedRows.values().next().value.numeroCompte).subscribe(
     (data) => {
      console.log(data);
    this.account2 = data;

    
    this.virement.debiteur = this.account2;
    this.virement.sommeEnv= parseInt(this.montant1.value);
    this.virement.sommeRecu = parseInt(this.montant1.value) ;

            console.log('virement', this.virement);

           let clone = {...this.virement};
           this.virements.push(clone);
           
   
   console.log(this.virements)
   this.total=0;
   this.virements.forEach(vir => this.total=this.total+vir.sommeEnv);
   console.log('total 1'+this.total);
   console.log('total 2'+parseInt(this.montant2.value));
   if(parseInt(this.montant2.value) != this.total){
     this.montantInvalid = true;


   }
   else{
    this.montantInvalid = false;
    console.log(this.montantInvalid)
   }
            
    console.log('virements', this.virements);
    this.clickedRows.clear();
    
  
    })
    console.log(this.virements.length)
    console.log(parseInt(this.nombre.value))
    if(parseInt(this.nombre.value) <= this.virements.length){
      this.nombreInvalid = true;
      console.log(this.nombreInvalid);
   }else{
    this.nombreInvalid = false;

   }
   
  
   
   
   

}

virementt(){
  
  this.accountService.findAccountNum(this.numero2.value).subscribe(
       (data) => {
         console.log(data);
         this.account1 = data;

        // this.virement.creancier = this.account1;
        console.log(data);
        this.virement.creancier = this.account1;
        console.log(this.virements);   

          
       }
     );
    //  for(let i=0;i<this.virements.length;i++){
    //   var total=0;
    //    total=total+ this.virements[i].sommeEnv;
    //    console.log(total);
    // }
    
    
    
    

}
ajouterVirement(){
  this.virementService.addVirement(this.virements).subscribe(
    (response) => {
      console.log("salam");

    },
    (error) => {
      console.log("error");

    }

  );
}
openDialog(): void {
  if(!this.virements.length){
    this.infoInvalid=true;

  }else{
    this.infoInvalid = false;
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px'
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result  ) {
        
        this.ajouterVirement();
      }
    });
  }
 
    
  
  
  
}

delete(id){
  this.transferService.removeBeneficiaire(id).subscribe(
    (data) => {
      console.log('khdama joj');
      window.location.reload();
      
})
}
remove(id){
  //array.splice(0, array.length);
  this.virements=this.virements.filter(item => item !== id);

  //window.location.reload();
      

}

}