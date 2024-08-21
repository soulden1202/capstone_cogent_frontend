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
import { Product } from '../entities';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dialog-content-bulk-upload',
  templateUrl: 'app-dialog-bulk.html',
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
export class DialogContentUploadBulk {
  constructor(private httpservice: HttpService) {}

  file: File | any = null;

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.file = file;
  }
  csvToArray(csv: any) {
    let rows = csv.split('\n');

    return rows.map(function (row: any) {
      return row.split(',');
    });
  }

  onConfirm() {
    let reader: FileReader = new FileReader();
    reader.readAsText(this.file);
    //@ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;

    let data: any[] = [];
    reader.onload = (e) => {
      let csv: string = reader.result as string;

      var lines = csv.split('\n');
      while (typeof lines[0] !== 'undefined') {
        var line = lines.shift();
        var split = line!.split(',');
        data.push(split);
      }

      for (let i = 1; i < data.length - 1; i++) {
        var d = {
          id: data[i][0].replace(/["']/g, ''),
          name: data[i][1].replace(/["']/g, ''),
          price: data[i][2].replace(/["']/g, ''),
          description: data[i][3].replace(/["']/g, ''),
          stocks: data[i][4].replace(/["']/g, ''),
          imgUrl: data[i][5].replace(/["']/g, ''),
        };

        console.log(d);

        this.httpservice.createProductBulk(token, d).subscribe(() => {
          console.log('ok');
        });
      }
    };
  }
}

@Component({
  selector: 'dialog-content-upload',
  templateUrl: 'app-dialog-upload.html',
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
export class DialogContentUpload {
  constructor(private httpservice: HttpService) {}

  file: File | any = null;
  id: number | any = null;
  name: string | any = null;
  description: string | any = null;
  price: number | any = null;
  stocks: number | any = null;

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.file = file;
  }

  onConfirm() {
    //@ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;

    const formData = new FormData();

    var d = {
      name: this.name,
      description: this.description,
      price: this.price,

      stocks: this.stocks,
      id: this.id,
    };

    formData.append(
      'json',
      new Blob([JSON.stringify(d)], {
        type: 'application/json',
      })
    );

    formData.append('file', this.file);

    console.log(formData.get('file'), formData.get('json'));
    this.httpservice.createProduct(token, formData).subscribe(() => {
      console.log('ok');
    });
  }
}

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

  file: File | any = null;

  ngOnInit() {
    console.log(this.data);
  }

  onFileChange(event: Event) {
    console.log(event);
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.file = file;
  }

  onConfirm() {
    console.log(this.data, this.file);
    //@ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;

    const formData = new FormData();

    var d = {
      name: this.data.dataKey.name,
      description: this.data.dataKey.description,
      price: this.data.dataKey.price,

      stocks: this.data.dataKey.stocks,
      id: this.data.dataKey.id,
    };

    formData.append(
      'json',
      new Blob([JSON.stringify(d)], {
        type: 'application/json',
      })
    );

    formData.append('file', this.file);

    console.log(formData.get('file'), formData.get('json'));
    this.httpservice.upDateProduct(token, formData).subscribe(() => {
      console.log(this.data.dataKey);
      console.log('ok');
    });
  }
}
@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatTableModule, CommonModule],
  templateUrl: './product-crud.component.html',
  styleUrl: './product-crud.component.css',
})
export class ProductCrudComponent {
  constructor(private router: Router, private httpservice: HttpService) {}
  dataSource: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'price',
    'stocks',
    'imgUrl',
    'action',
  ];
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.getProducts().subscribe((products) => {
      this.dataSource = products;
      console.log(this.dataSource);
    });
  }

  openDialog(product: Product) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        dataKey: product,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadProducts();
      window.location.reload();
    });
  }

  onUpload() {
    const dialogRef = this.dialog.open(DialogContentUpload);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadProducts();
      window.location.reload();
    });
  }

  onDelete(id: number) {
    // @ts-ignore
    var token = JSON.parse(localStorage.getItem('login')).token;
    this.httpservice.deleteProduct(id, token).subscribe(() => {
      console.log('ok');
      this.loadProducts();
    });
  }

  onBulk() {
    const dialogRef = this.dialog.open(DialogContentUploadBulk);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
