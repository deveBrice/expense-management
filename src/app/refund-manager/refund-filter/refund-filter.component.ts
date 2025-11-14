import { Component, inject, output, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RefundManagerService } from '../../../shared/services/refund-manager.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
  public rms = inject(RefundManagerService)
  public monthsList = signal<string[]>(this.rms.monthsList)
  public filtersListActive = signal<any>({})
  public refundFiltersList = output<any>({})

  public refundFilterForm: FormGroup = this.fb.group({
    month: [''],
    year: [''],
    wording: [''],
    amount: [''],
    date: ['']
  })

  constructor() {
    this.refundFilterChange();
  }

  public refundFilterChange() {
    this.refundFilterForm.valueChanges.subscribe((rdf: any) => {
      this.addRefundFiltersList(rdf)
    })
  }

  public addRefundFiltersList(refundFiltersList: any) {
    for (let rfl in refundFiltersList) {
      if (refundFiltersList[rfl] !== "" && refundFiltersList[rfl] !== null) {
        this.filtersListActive.update((up) => {
          up[rfl] = refundFiltersList[rfl];
          return up;
        })
      } else {
        this.filtersListActive.update((up) => {
          delete up[rfl];
          return up;
        })
      }
    }
    this.dateFormat(this.filtersListActive().date);
    this.refundFiltersList.emit(this.filtersListActive())
  }


  public dateFormat(date: Date) {
    if (date) {
      const newDate = this.rms.dateFormat(date);
      this.filtersListActive.update((up) => {
        up.date = newDate;
        return up;
      })
    }
  }




}
