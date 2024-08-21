import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import { Chart } from 'chart.js';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-sale-report',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './sale-report.component.html',
  styleUrl: './sale-report.component.css',
})
export class SaleReportComponent {
  constructor(private httpservice: HttpService) {}

  dataSource: any;
  displayedColumns: string[] = ['timeStamp', 'amount'];

  ngOnInit() {
    //@ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;

    this.httpservice.getSaleReport(token).subscribe((data) => {
      this.dataSource = data;
    });
  }
}
