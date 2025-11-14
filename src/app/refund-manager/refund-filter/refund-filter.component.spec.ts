import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundFilter } from './refund-filter.component';

describe('RefundFilter', () => {
  let component: RefundFilter;
  let fixture: ComponentFixture<RefundFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefundFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefundFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
