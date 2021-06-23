import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/authentification/services/authentification.service';
import { ClientService } from 'src/app/client/service/client.service';
import { Account } from '../../../account/model/account';


@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
})
export class ConfirmationDialogComponent implements OnInit {
  codeId: string;
  currentClientName: string;
  accounts: Account[];
  loginInvalid = false;
  beneForm = new FormGroup({
    som : new FormControl('')
  })
  passs:any
  get pass(){
    
    return this.beneForm.get('som');

  }
  local_data: any;
  currentClientId: string;
  constructor(private loginservice: AuthentificationService,private router: Router,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,private route: ActivatedRoute,private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.local_data = { ...data };
  }
  
 

  ngOnInit(): void {
    this.currentClientId = sessionStorage.getItem('currentClientId');
    this.currentClientName = sessionStorage.getItem('name');
    this.clientService.findClientAccounts(this.currentClientId).subscribe(
      (data) => {
        this.accounts = data;
      },
      (error) => console.log(error)
    );
  }
  openDialog(){
    this.passs=this.beneForm.get('som')
    console.log(sessionStorage.getItem('password'))
    console.log(this.passs.value);
    if(sessionStorage.getItem('password') === this.passs.value){
      this.loginInvalid = false;
      
      this.dialogRef.close({data: this.local_data });
    }
    else{
      this.loginInvalid = true;
    }
    
  }
}
