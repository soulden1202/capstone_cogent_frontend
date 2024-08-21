import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { UsersCrudComponent } from '../users-crud/users-crud.component';
import { ProductCrudComponent } from '../product-crud/product-crud.component';
import { CouponCrudComponent } from '../coupon-crud/coupon-crud.component';
import { SaleReportComponent } from '../sale-report/sale-report.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatTabsModule,
    UsersCrudComponent,
    ProductCrudComponent,
    CouponCrudComponent,
    SaleReportComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {}
