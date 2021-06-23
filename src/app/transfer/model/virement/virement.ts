import { Account } from 'src/app/account/model/account';

export class Virement {
  id: number;
  creancier: Account;
  debiteur: Account;
  sommeEnv: number;
  sommeRecu: number;
  
 
}
