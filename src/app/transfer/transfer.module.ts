import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { SharedModule } from '../shared/shared.module';
import { TransferListComponent } from './components/transfer-list/transfer-list.component';
import { TransferDoneComponent } from './components/transfer-done/transfer-done.component';
import { BeneficiaireFormComponent } from './components/beneficiaire-form/beneficiaire-form.component';


@NgModule({
  declarations: [TransferFormComponent, TransferListComponent, TransferDoneComponent, BeneficiaireFormComponent],
  imports: [CommonModule, TransferRoutingModule, SharedModule],
})
export class TransferModule {}
