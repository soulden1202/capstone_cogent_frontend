import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCrudComponent } from './coupon-crud.component';

describe('CouponCrudComponent', () => {
  let component: CouponCrudComponent;
  let fixture: ComponentFixture<CouponCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
