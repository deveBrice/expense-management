import { Component, computed, inject, model } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RefundManagerService } from '../../shared/services/refund-manager.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-refund-manager',
  imports: [MatTableModule, MatCheckboxModule, FormsModule],
  templateUrl: './refund-manager.component.html',
  styleUrl: './refund-manager.component.scss',
})

export class RefundManagerComponent {
  public displayedColumns: string[] = ['num', 'wording', 'amount', 'date'];
  public checked = model();

  public rms = inject(RefundManagerService)

  public refundManagerList = computed(() => {

    return this.rms.refundManagerList().refundManagerData;
  })



  public refundCalculate = computed(() => {
    const initialValue = 0;
    let refundManagerList = this.rms.refundManagerList()
    refundManagerList.totalAmount = refundManagerList.refundManagerData.reduce(
      (accumulator: number, currentValue: any) => {

        return accumulator + +currentValue.refundData.amount;
      },
      initialValue
    );

    return refundManagerList.totalAmount;
  })
}
