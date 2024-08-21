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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpservice: HttpService
  ) {}

  password: string = '';

  ngOnInit() {
    console.log(this.data);
  }

  onConfirm() {
    console.log(this.data, this.password);
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice
      .upDateUser(
        token,
        this.data.dataKey.email,
        this.data.dataKey.fullName,
        this.data.dataKey.role[0].authority.replace('ROLE_', ''),
        this.password,
        this.data.dataKey.id
      )
      .subscribe(() => {
        console.log(this.data.dataKey);
        console.log('ok');
      });
  }
}

@Component({
  selector: 'app-users-crud',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './users-crud.component.html',
  styleUrl: './users-crud.component.css',
})
export class UsersCrudComponent {
  constructor(private router: Router, private httpservice: HttpService) {}
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'email',
    'fullName',
    'role',
    'createdAt',
    'updatedAt',
    'action',
  ];
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.getAllUser(token).subscribe((users) => {
      this.dataSource = users;
      console.log(this.dataSource);
    });
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        dataKey: user,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadUsers();
    });
  }

  onActiveStatus(active: boolean, id: number) {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.changeUserActiveStatus(token, id, active).subscribe(() => {
      console.log('ok');
      this.loadUsers();
    });
  }
}
