import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { refundList } from '../../../shared/interfaces/refund-manager.interface';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-refund',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './add-refund.component.html',
  styleUrl: './add-refund.component.scss',
})

export class AddRefundComponent {

  public newRefund = output<refundList>();
  public fb = inject(FormBuilder);

  public newRefundForm = this.fb.group({
    wording: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    date: ['', [Validators.required]]
  })

  public addNewRefund() {
    this.newRefundForm.value.date = this.dateFormat(this.newRefundForm.value.date)
    const newRefund: any = {
      ...this.newRefundForm.value
    }
    this.newRefund.emit(newRefund)
  }



  public dateFormat(newDate: any) {
    const date = new Date(newDate);
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return day + '/' + month + '/' + year;
  }

  public dateSelected($event: any) {
    this.dateFormat($event.value)
  }

}
