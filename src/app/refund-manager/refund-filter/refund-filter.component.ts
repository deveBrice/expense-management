import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RefundManagerDemoService } from '../../../shared/services/refund-manager.demo.service';

@Component({
  selector: 'app-refund-filter',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
  ],
  providers: [],
  templateUrl: './refund-filter.component.html',
  styleUrl: './refund-filter.component.scss',
})

export class RefundFilterComponent {

  public fb = inject(FormBuilder);
  public rms = inject(RefundManagerDemoService)
  public monthsList = signal<string[]>(this.rms.monthsList)
  public filtersListActive = signal<any>({})

  public refundMoments = output<any>({})
  public yearsList = signal<number[]>(
    [
      2025,
      2026,
      2027
    ]
  );



  public refundMomentForm: FormGroup = this.fb.group({
    month: [this.rms.currentMonth()],
    year: [new Date().getFullYear()]
  })

  public refundFiltersList = output<any>({})

  public refundFilterForm: FormGroup = this.fb.group({
    wording: [''],
    amount: [''],
    date: ['']
  })

  constructor() {
    this.refundMoments.emit(this.refundMomentForm.value)
    this.refundFilterChange();
    this.refundMomentChange()
  }

  public refundMomentChange() {
    this.refundMomentForm.valueChanges.subscribe((rmf: any) => {
      this.refundMoments.emit(this.refundMomentForm.value)
    })
  }

  public refundFilterChange() {
    this.refundFilterForm.valueChanges.subscribe((rfl: any) => {
      const date = this.rms.dateFormat(rfl.date);
      rfl.date = date
      const activeFilter = this.activeFilter(rfl);
      this.refundFiltersList.emit(activeFilter)
    })
  }

  public activeFilter(obj: any) {
    const filteredObj = Object.keys(obj).reduce((p: any, c) => {
      if (obj[c]) p[c] = obj[c];
      return p;
    }, {});
    console.log(filteredObj)
    return filteredObj;
  }







}
