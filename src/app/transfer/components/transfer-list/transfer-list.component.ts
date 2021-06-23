import { Component, OnInit, ViewChild } from '@angular/core';
import { Transfer } from '../../model/transfer';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TransferService } from '../../service/transfer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Recharge } from 'src/app/recharge/model/recharge';
import { RechargeService } from 'src/app/recharge/service/recharge.service';
import { ActivitiesService } from '../../service/activities.service';
import { Activities } from '../../model/activities/activities';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css'],
})
export class TransferListComponent implements OnInit {
  codeId: string;
  //transfers
  TRANSFERS: Activities[];
  dataSource = new MatTableDataSource<Activities>(this.TRANSFERS);
  displayedColumns: string[] = [
    'debiteur',
    'creancier',
    'somme',
    'date',
    
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private activitiesService: ActivitiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.codeId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    //transfer
     this.activitiesService.findAll(this.codeId).subscribe(
      (data) => {
        console.log('fshkel');
         this.TRANSFERS = data;

         this.dataSource = new MatTableDataSource<Activities>(this.TRANSFERS);
         this.dataSource.paginator = this.paginator;
       },
      (error) => {
        this.dataSource = new MatTableDataSource<Activities>(null);
       }
      
    );
      }
     
   checkSender(name: string) {
     if (sessionStorage.getItem('name') === name) {
       return true;
     }
     {
       return false;
     }
   }

   
   }

