import { Account } from 'src/app/account/model/account';

export class Activities {
 
  id: number;
  creancier: Account;
  debiteur: Account;
  sommeEnv: number;
  sommeRecu: number;
  creationDate: Date;

 
 
}
