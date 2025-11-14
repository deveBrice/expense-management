import { Component, inject, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RefundData, RefundManager, refundManagerData } from '../../../shared/interfaces/refund-manager.interface';

@Component({
  selector: 'app-new-refund',
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
  ],
  templateUrl: './new-refund.component.html',
  styleUrl: './new-refund.component.scss',
})

export class NewRefundComponent {
  
  public newRefund = output<refundManagerData>();
  public fb = inject(FormBuilder);

  public newRefundForm = this.fb.group({
    wording: ['', [Validators.required]],
    amount: ['', [Validators.required]],
    date: [this.dateFormat()]
  })

  public addNewRefund() {
     const newRefund: any = {
      refundData: this.newRefundForm.value
     }
     this.newRefund.emit(newRefund)
  }

  public dateFormat() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return  day + '/' + month + '/' + year;
  }
  
}
