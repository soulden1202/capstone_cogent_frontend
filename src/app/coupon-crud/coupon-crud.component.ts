import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { HttpService } from '../http.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { User } from '../entities';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'app-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  constructor(private httpservice: HttpService) {}

  password: string = '';
  percent: number | any;
  code: string | any;

  onConfirm() {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;

    console.log(this.code);
    this.httpservice
      .createCoupon(token, {
        id: 0,
        percent: this.percent,
        code: this.code,
      })
      .subscribe(() => {
        console.log('ok');
      });
  }
}

@Component({
  selector: 'app-coupon-crud',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './coupon-crud.component.html',
  styleUrl: './coupon-crud.component.css',
})
export class CouponCrudComponent {
  constructor(private router: Router, private httpservice: HttpService) {}
  dataSource: any;
  displayedColumns: string[] = ['id', 'code', 'percent', 'createdAt', 'action'];
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadCoupon();
  }

  loadCoupon(): void {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.getAllCoupon(token).subscribe((coupon: any) => {
      this.dataSource = coupon;
      console.log(this.dataSource);
    });
  }

  createCoupon() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadCoupon();
    });
  }

  onDelete(id: number) {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.deleteCouponById(token, id).subscribe(() => {
      console.log('ok');
      this.loadCoupon();
    });
  }
}
