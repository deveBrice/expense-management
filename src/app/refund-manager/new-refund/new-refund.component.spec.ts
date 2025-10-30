import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRefund } from './new-refund';

describe('NewRefund', () => {
  let component: NewRefund;
  let fixture: ComponentFixture<NewRefund>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRefund]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewRefund);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
